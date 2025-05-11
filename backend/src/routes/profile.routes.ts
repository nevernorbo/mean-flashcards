import * as express from "express";
import { isAuthenticated } from "./auth.routes";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { createPublicUser, User } from "../models/user";

export const profileRouter = express.Router();
profileRouter.use(express.json());

// Returns a users profile
profileRouter.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.id);
        const user = await collections?.users?.findOne({ _id: id });

        if (user) {
            const publicUser = createPublicUser(user);
            res.status(200).send(publicUser);
        } else {
            res.status(500).send("Failed to fetch user profile");
        }
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Deletes the logged in user's profile
profileRouter.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.id);
        const user = req.user as User;

        if (!checkPermission(user, id)) {
            res.status(403).send("You don't have permission to do this");
            return;
        }

        const collectionIds = await collections?.cardCollections
            ?.find({ ownerId: id })
            .project<{ _id: ObjectId }>({ _id: 1 })
            .map((c) => c._id)
            .toArray();
        await collections?.users?.deleteOne({ _id: id });
        await collections?.cardCollections?.deleteMany({ ownerId: id });
        await collections?.cards?.deleteMany({
            collectionId: { $in: collectionIds },
        });

        res.status(200).send("Successfully deleted everything tied to this");
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Update profile
profileRouter.patch("/:id", isAuthenticated, async (req, res) => {
    try {
        const userId = new ObjectId(req?.params?.id);
        const user = req.user as User;

        if (!checkPermission(user, userId)) {
            res.status(403).send("You don't have permission to do this");
            return;
        }

        const { username, email, bio, avatarUrl } = req.body.editProfileForm;

        // check if email or username is already taken
        const existingUser = await collections.users?.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (existingUser && !existingUser._id.equals(userId)) {
            if (existingUser.profile.username === username) {
                res.status(409).send("Username already taken");
            } else {
                res.status(409).send("An account already exists with this email address");
            }
            return;
        }

        const response = await collections?.users?.updateOne(
            { _id: userId },
            {
                $set: {
                    email: email,
                    "profile.username": username,
                    "profile.avatarUrl": avatarUrl,
                    "profile.bio": bio,
                },
            }
        );

        res.status(200).send("Successful update");
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

export const checkPermission = async (user: User, id: ObjectId): Promise<boolean> => {
    if (user._id !== id) {
        return false;
    }

    return true;
};

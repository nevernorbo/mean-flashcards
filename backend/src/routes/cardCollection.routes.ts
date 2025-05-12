import * as express from "express";
import { collections } from "../database";
import { isAuthenticated } from "./auth.routes";
import { User } from "../models/user";
import { CardCollection } from "../models/card";
import { ObjectId } from "mongodb";

// Responsible for the endpoints regarding a single card collection
export const cardCollectionRouter = express.Router();
cardCollectionRouter.use(express.json());

// Create new collection
cardCollectionRouter.post("/", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id!;
        const { title, visibility } = req.body;

        const cardCollection: CardCollection = {
            creationDate: new Date().toISOString().substring(0, 10),
            title: title,
            summary: "",
            ownerId: userId,
            visibility: visibility,
        };

        const result = await collections?.cardCollections?.insertOne(cardCollection);

        if (result?.acknowledged) {
            const cardsResult = await collections?.cards?.insertOne({ _id: result.insertedId, cards: [] });

            if (!cardsResult?.acknowledged) {
                res.status(500).send("Failed to create new card collection");
            } else {
                res.status(200).send(result.insertedId);
            }
        } else {
            res.status(500).send("Failed to create new card collection");
        }
    } catch (error) {
        res.status(404).send("Failed to create new card collection");
    }
});

// Get collection by id
cardCollectionRouter.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const cardCollection = await collections?.cardCollections?.findOne(query);

        if (cardCollection) {
            res.status(200).send(cardCollection);
        } else {
            res.status(404).send(`Failed to find the card collection with ID: ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find the card collection with ID: ${req?.params?.id}`);
    }
});

// Delete collection
cardCollectionRouter.delete("/:collectionId", isAuthenticated, async (req, res) => {
    try {
        const user = req.user as User;
        const id = new ObjectId(req?.params?.collectionId);

        const hasPermission = await checkPermission(user, id);

        if (!hasPermission) {
            res.status(403).send("You do not have permission to delete this collection");
            return;
        }

        const response = await collections?.cardCollections?.deleteOne({ _id: id });
        await collections?.cards?.deleteOne({ _id: id });

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Update existing collection
cardCollectionRouter.patch("/:collectionId", isAuthenticated, async (req, res) => {
    try {
        const user = req.user as User;
        const id = new ObjectId(req?.params?.collectionId);

        const hasPermission = await checkPermission(user, id);

        if (!hasPermission) {
            res.status(403).send("You do not have permission to update this collection");
            return;
        }

        const { title, summary, visibility } = req.body;

        const response = await collections?.cardCollections?.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    title: title,
                    summary: summary,
                    visibility: visibility,
                },
            }
        );

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Like/unlike collection
cardCollectionRouter.post("/like", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id!.toString();
        const { id, isLiked } = req.body;

        if (isLiked) {
            const response = await collections?.likedCollections?.updateOne(
                { _id: new ObjectId(id) },
                { $pull: { likedBy: userId } }
            );
            res.status(200).send(response);
        } else {
            const response = await collections?.likedCollections?.updateOne(
                { _id: new ObjectId(id) },
                { $addToSet: { likedBy: userId } },
                { upsert: true }
            );
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Get owner avatar
cardCollectionRouter.get("/ownerAvatar/:ownerId", isAuthenticated, async (req, res) => {
    try {
        const ownerId = new ObjectId(req?.params?.ownerId);

        const user = await collections?.users?.findOne(
            { _id: ownerId },
            { projection: { "profile.avatarUrl": 1, _id: 0 } }
        );
        
        const avatarUrl: string | undefined = user?.profile?.avatarUrl;

        res.status(200).send(avatarUrl);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

export const checkPermission = async (user: User, id: ObjectId): Promise<boolean> => {
    // Fetch the collection to check ownership
    const collection = await collections?.cardCollections?.findOne({ _id: id });

    if (!collection) {
        return false;
    }

    // Check permissions
    const isOwner = collection.ownerId?.toString() === user._id?.toString();
    const isModeratorOrAdmin = user.role === "moderator" || user.role === "admin";

    if (!isOwner && !isModeratorOrAdmin) {
        return false;
    }

    return true;
};

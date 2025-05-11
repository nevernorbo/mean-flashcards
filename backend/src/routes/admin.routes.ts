import * as express from "express";
import { collections } from "../database";
import { User } from "../models/user";
import { ObjectId } from "mongodb";

// Responsible for the endpoints regarding admin methods
export const adminRouter = express.Router();
adminRouter.use(express.json());

// Get all users
adminRouter.get("/users", isAuthenticatedAdmin, async (_req, res) => {
    try {
        const users = await collections?.users
            ?.aggregate([
                {
                    $addFields: {
                        roleOrder: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$role", "admin"] }, then: 0 },
                                    { case: { $eq: ["$role", "moderator"] }, then: 1 },
                                    { case: { $eq: ["$role", "user"] }, then: 2 },
                                ],
                                default: 3,
                            },
                        },
                    },
                },
                { $sort: { roleOrder: 1 } },
            ])
            .toArray();

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

adminRouter.post("/changeRole", isAuthenticatedAdmin, async (req, res) => {
    try {
        const { userId, role } = req.body;

        const response = await collections?.users?.updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    role: role,
                },
            }
        );

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

adminRouter.delete("/deleteUser/:id", isAuthenticatedAdmin, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.id);

        const response = await collections?.users?.deleteOne({ _id: id });

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Used for authenticating an admin endpoint on the server
export function isAuthenticatedAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = req.user as User;

    if (req.isAuthenticated() || user.role === "admin") return next();
    res.status(401).json({ message: "Unauthorized" });
}

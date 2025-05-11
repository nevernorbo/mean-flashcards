import * as express from "express";
import { collections } from "../database";
import { isAuthenticated } from "./auth.routes";
import { User } from "../models/user";

// Responsible for the endpoints regarding multiple card collections
export const cardCollectionsRouter = express.Router();
cardCollectionsRouter.use(express.json());

// Get all owned collections
cardCollectionsRouter.get("/owned", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id;
        const cardCollections = await collections?.cardCollections
            ?.find({ ownerId: userId })
            .toArray();
        res.status(200).send(cardCollections);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Get all foreign (not owned, public) collections
cardCollectionsRouter.get("/foreign", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id;
        const cardCollections = await collections?.cardCollections
            ?.find({ ownerId: { $ne: userId }, visibility: "public" })
            .toArray();
        res.status(200).send(cardCollections);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Get all liked collection
cardCollectionsRouter.get("/liked", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id?.toString();

        const likedCollections = await collections?.likedCollections
            ?.find({ likedBy: userId }, { projection: { _id: 1 } })
            .toArray();

        if (likedCollections) {
            const likedCollectionIds = likedCollections.map((c) => c._id);
            res.status(200).send(likedCollectionIds);
        } else {
            res.status(500).send("Failed to query liked collections");
        }
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

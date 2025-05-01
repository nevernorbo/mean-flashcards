import * as express from "express";
import { collections } from "../database";
import { isAuthenticated } from "./auth.routes";
import { User } from "../models/user";
import { CardCollectionVisibility } from "../models/card";

// Responsible for the endpoints regarding multiple card collections
export const cardCollectionsRouter = express.Router();
cardCollectionsRouter.use(express.json());

// Get all owned collections
cardCollectionsRouter.get("/owned", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id;
        const cardCollections = await collections?.cardCollections
            ?.find({ ownerId: userId }, { projection: { cards: 0 } })
            .toArray();
        res.status(200).send(cardCollections);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Get all foreign (not owned, public collections)
cardCollectionsRouter.get("/foreign", isAuthenticated, async (req, res) => {
    try {
        const userId = (req.user as User)._id;
        const cardCollections = await collections?.cardCollections
            ?.find({ ownerId: { $ne: userId }, visibility: CardCollectionVisibility.Public })
            .toArray();
        res.status(200).send(cardCollections);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

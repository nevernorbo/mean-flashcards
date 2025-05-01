import * as express from "express";
import { collections } from "../database";
import { ObjectId } from "mongodb";
import { isAuthenticated } from "./auth.routes";
import { User } from "../models/user";
import { CardCollection } from "../models/card";

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
            cards: [],
            title: title,
            summary: "",
            likedBy: [],
            ownerId: userId,
            visibility: visibility,
        };

        const result = await collections?.cardCollections?.insertOne(cardCollection);

        if (result?.acknowledged) {
            res.status(200).send(result.insertedId);
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

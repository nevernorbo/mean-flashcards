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

// Delete card from collection
cardCollectionRouter.delete("/:collectionId", isAuthenticated, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.collectionId);
        const response = await collections?.cardCollections?.deleteOne({ _id: id });

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Update existing card
cardCollectionRouter.patch("/:collectionId/:order", isAuthenticated, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.collectionId);
        const { title, summary } = req.body;

        const response = await collections?.cardCollections?.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    title: title,
                    summary: summary,
                },
            }
        );

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Like/unlike collection
// cardCollectionRouter.post("/like", isAuthenticated, async (req, res) => {
//     try {

//         if (result?.acknowledged) {
//             res.status(200).send("Success");
//         } else {
//             res.status(500).send("Failed to toggle like collection");
//         }
//     } catch (error) {
//         res.status(404).send("Failed to toggle like collection");
//     }
// });

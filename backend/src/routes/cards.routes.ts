import * as express from "express";
import { collections } from "../database";
import { isAuthenticated } from "./auth.routes";
import { ObjectId } from "mongodb";

// Responsible for the endpoints regarding cards contained in a collection
export const cardsRouter = express.Router();
cardsRouter.use(express.json());

// Get all cards belonging to a collection
cardsRouter.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const id = req?.params?.id;

        const cards = await collections?.cards?.findOne({ _id: new ObjectId(id) });
        res.status(200).send(cards?.cards);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Add a card to a collection
cardsRouter.post("/:id", isAuthenticated, async (req, res) => {
    try {
        const id = req?.params?.id;
        const response = await collections?.cards?.updateOne({ _id: new ObjectId(id) }, { $push: { cards: req.body } });

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Delete card from collection
cardsRouter.delete("/:collectionId/:order", isAuthenticated, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.collectionId);
        const targetOrder = +req?.params?.order;

        // ...
        // find the collection id
        // removes the target card by order
        // decrement all orders > targetOrder
        // this is very convoluted, but needed if I want to do this in a single pipeline
        const response = await collections?.cards?.updateOne({ _id: id }, [
            {
                $set: {
                    cards: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$cards",
                                    cond: { $ne: ["$$this.order", targetOrder] },
                                },
                            },
                            in: {
                                $mergeObjects: [
                                    "$$this",
                                    {
                                        order: {
                                            $cond: [
                                                { $gt: ["$$this.order", targetOrder] },
                                                { $subtract: ["$$this.order", 1] },
                                                "$$this.order",
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        ]);

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Update existing card
cardsRouter.patch("/:collectionId/:order", isAuthenticated, async (req, res) => {
    try {
        const id = new ObjectId(req?.params?.collectionId);
        const targetOrder = +req?.params?.order;

        const { front, back } = req.body;

        const response = await collections?.cards?.updateOne(
            {
                _id: id,
                "cards.order": targetOrder,
            },
            {
                $set: {
                    "cards.$.front": front,
                    "cards.$.back": back,
                },
            }
        );

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

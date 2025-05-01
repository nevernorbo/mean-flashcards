import * as express from "express";
import { authRouter } from "./routes/auth.routes";
import { profileRouter } from "./routes/profile.routes";
import { cardCollectionsRouter } from "./routes/cardCollections.routes";
import { cardCollectionRouter } from "./routes/cardCollection.routes";

export const apiRouter = express.Router();
apiRouter.use(express.json());

apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/card-collections", cardCollectionsRouter);
apiRouter.use("/card-collection", cardCollectionRouter);

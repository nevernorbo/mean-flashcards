import * as express from "express";
import { authRouter } from "./routes/auth.routes";
import { profileRouter } from "./routes/profile.routes";

export const apiRouter = express.Router();
apiRouter.use(express.json());

apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", profileRouter);

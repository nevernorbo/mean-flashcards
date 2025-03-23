import * as express from "express";
import { isAuthenticated } from "./auth.routes";

export const profileRouter = express.Router();
profileRouter.use(express.json());

profileRouter.get("/", isAuthenticated, (req, res) => {
    res.json({ user: req.user });
});

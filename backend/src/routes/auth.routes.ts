import * as argon2 from "argon2";
import * as express from "express";
import passport from "passport";
import { collections } from "../database";
import { User } from "../models/user";

// Router for handling authentication throughout the app, using express sessions and passport (local, google, facebook)
export const authRouter = express.Router();
authRouter.use(express.json());

// Local signup
authRouter.post("/signup", async (req, res) => {
    try {
        const { email, username, password, passwordAgain } = req.body;

        // Validate input
        const existingUser = await collections.users?.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (existingUser) {
            if (existingUser.profile.username === username) {
                res.status(409).send({ errorMessage: "Username already taken" });
            } else {
                res.status(409).send({ errorMessage: "An account already exists with this email address" });
            }
            return;
        }

        if (password !== passwordAgain) {
            res.status(400).send({ errorMessage: "Provided passwords don't match" });
            return;
        }

        // But Norbo... why no salt?
        // https://github.com/ranisalt/node-argon2/wiki/Options#salt
        const hash = await argon2.hash(password);

        const user: User = {
            email: email,
            password: hash,
            role: "user",
            profile: {
                username: username,
                createdAt: new Date().toJSON(),
            },
        };

        const result = await collections?.users?.insertOne(user);

        if (result?.acknowledged) {
            res.status(200).send({ successMessage: "Succesfully signed up!" });
        } else {
            res.status(500).send({ errorMessage: "Sign up failed" });
        }
    } catch (error) {
        res.status(400).send({ errorMessage: "Something went wrong while trying to sign up" });
    }
});

authRouter.post("/login", (req, res, next) => {
    passport.authenticate("local", (error: string | null, user: User) => {
        if (error) {
            res.status(500).send(error);
        } else {
            req.login(user, (err: string | null) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send(user);
                }
            });
        }
    })(req, res, next);
});

// Google SSO
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:4200",
        failureRedirect: "http://localhost:4200/login/failure",
    })
);

// Facebook SSO
authRouter.get("/facebook", passport.authenticate("facebook"));

authRouter.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "http://localhost:4200",
        failureRedirect: "http://localhost:4200/login/failure",
    })
);

// Logout
authRouter.post("/logout", (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ errorMessage: "Not logged in" });
        return;
    }

    req.logout((err) => {
        if (err) return res.status(500).send({ errorMessage: "Error logging out" });
        res.status(200).send({});
    });
});

// Authentication check (mostly used by angulars route guard)
authRouter.get("/isAuthenticated", (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send(true);
    } else {
        res.status(401).send(false);
    }
});

// Return information about the user in session
authRouter.get("/checkAuthStatus", (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? req.user : null,
    });
});

// Used for authenticating endpoint on the server
export function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
}

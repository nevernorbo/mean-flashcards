import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { configureCors } from "./config/cors";
import { configurePassport } from "./config/passport";
import { connectToDatabase } from "./database";
import { apiRouter } from "./routes";

// Load environment variables
dotenv.config();
const { ATLAS_URI, SESSION_SECRET } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in .env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();

        // Middleware
        configureCors(app);
        app.use(cookieParser());
        app.use(
            session({
                secret: SESSION_SECRET!,
                resave: false,
                saveUninitialized: false,
            })
        );

        app.use(passport.initialize());
        app.use(passport.session());
        
        configurePassport(passport);

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });

        app.use("/api", apiRouter);
    })
    .catch((error) => console.error(error));

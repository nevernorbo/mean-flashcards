import { Express } from "express";
import cors from "cors";

export function configureCors(app: Express) {
    const whitelist = ["*", "http://localhost:4200"];

    const corsOptions = {
        origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
            if (whitelist.indexOf(origin!) !== -1 || whitelist.includes("*")) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS."));
            }
        },
        credentials: true,
    };

    app.use(cors(corsOptions));
}

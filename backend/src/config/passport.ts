import * as argon2 from "argon2";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { collections } from "../database";
import { PassportStatic } from "passport";
import { createPublicUser, User } from "../models/user";
import * as dotenv from "dotenv";

dotenv.config();

export function configurePassport(passport: PassportStatic) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await collections.users?.findOne({ email });

                    if (!user) {
                        return done(null, false, {
                            message: "Invalid credentials",
                        });
                    }

                    if (await argon2.verify(user.password!, password)) {
                        return done(null, createPublicUser(user));
                    } else {
                        return done(null, false, {
                            message: "Invalid credentials",
                        });
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: "http://localhost:5200/api/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if the user already exists
                    let user = await collections.users?.findOne({ googleId: profile.id });

                    if (!user) {
                        // Create a new user if not found
                        const newUser: User = {
                            googleId: profile.id,
                            email: profile.emails?.[0].value || "",
                            role: "user",
                            profile: {
                                username: profile.displayName,
                                avatarUrl: profile.photos?.[0].value,
                                bio: "",
                                createdAt: new Date().toISOString(),
                            },
                        };

                        const result = await collections.users?.insertOne(newUser);

                        if (result?.acknowledged) {
                            user = { ...newUser, _id: result.insertedId };
                            return done(null, createPublicUser(newUser));
                        } else {
                            return done(null, false, {
                                message: "Couldn't create user",
                            });
                        }
                    }

                    return done(null, createPublicUser(user));
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID!,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
                callbackURL: "http://localhost:5200/api/auth/facebook/callback",
                profileFields: ['id', 'email', 'name', 'picture.type(large)'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if the user already exists
                    let user = await collections.users?.findOne({ facebookId: profile.id });

                    if (!user) {
                        // Create a new user if not found
                        const newUser: User = {
                            facebookId: profile.id,
                            email: profile.emails?.[0].value || "",
                            role: "user",
                            profile: {
                                username: profile.displayName || `${profile.name?.givenName} ${profile.name?.familyName}`,
                                avatarUrl: profile.photos?.[0].value,
                                bio: "",
                                createdAt: new Date().toISOString(),
                            },
                        };

                        const result = await collections.users?.insertOne(newUser);

                        if (result?.acknowledged) {
                            return done(null, createPublicUser(newUser));
                        } else {
                            return done(null, false, {
                                message: "Couldn't create user",
                            });
                        }
                    }

                    return done(null, createPublicUser(user));
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    passport.serializeUser((user: Express.User, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        done(null, user);
    });
}

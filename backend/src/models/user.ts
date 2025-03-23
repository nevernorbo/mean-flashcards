import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    role: "user" | "admin";
    email: string;
    password?: string;

    googleId?: string;
    facebookId?: string;

    profile: {
        username: string;
        avatarUrl?: string;
        bio?: string;
        createdAt: string;
    };
}

export type PublicUser = Omit<User, "_id" | "password" | "googleId" | "facebookId">;

export function createPublicUser(user: User): PublicUser {
    const publicUser: PublicUser = {
        role: user.role,
        email: user.email,
        profile: {
            username: user.profile.username,
            avatarUrl: user.profile.avatarUrl,
            bio: user.profile.bio,
            createdAt: user.profile.createdAt,
        },
    };
    return publicUser;
}

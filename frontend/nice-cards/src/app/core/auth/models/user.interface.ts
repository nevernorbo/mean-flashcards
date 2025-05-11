export interface PublicUser {
  _id: string;
  // moderator is able to edit all public collections
  // admin is able to do the same and give the rank of moderator to a user
  role: UserRoles;
  email: string;

  profile: {
    username: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: string;
  };
}

export type UserRoles = 'user' | 'moderator' | 'admin';

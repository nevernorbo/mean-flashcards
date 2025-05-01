export interface PublicUser {
  _id: string;
  role: 'user' | 'admin';
  email: string;

  profile: {
    username: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: string;
  };
}

export interface PublicUser {
  role: 'user' | 'admin';
  email: string;

  profile: {
    username: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: string;
  };
}

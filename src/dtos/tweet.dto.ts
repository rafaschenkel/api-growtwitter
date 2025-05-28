export interface TweetDto {
  id: string;
  createdAt: Date;
  userId: string;
  content: string;
  parentTweetId: string | null;
  user: {
    id: string;
    username: string;
  };
}

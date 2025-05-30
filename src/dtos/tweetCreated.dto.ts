export interface TweetCreatedDto {
  id: string;
  createdAt: Date;
  userId: string;
  content: string;
  parentTweetId: string | null;
}

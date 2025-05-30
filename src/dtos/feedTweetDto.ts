export interface FeedTweetDto {
  id: string;
  createdAt: Date;
  userId: string;
  content: string;
  parentTweetId: string | null;
  user: {
    id: string;
    name: string;
    username: string;
    imgUrl: string | null;
  };
  _count: {
    likes: number;
    replies: number;
  };
}

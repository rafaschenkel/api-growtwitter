interface FollowDto {
  id: string;
  name: string;
  username: string;
  imgUrl: string | null;
}

export interface UserDto {
  id: string;
  name: string;
  username: string;
  imgUrl: string | null;
  _count: {
    tweets: number;
    following: number;
    followers: number;
  };
  tweets: {
    id: string;
    createdAt: Date;
    userId: string;
    content: string;
    parentTweetId: string | null;
    _count: {
      likes: number;
      replies: number;
    };
  }[];
  followers: {
    follower: FollowDto;
  }[];
  following: {
    following: FollowDto;
  }[];
}

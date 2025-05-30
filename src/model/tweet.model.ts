class Tweet {
  constructor(public userId: string, public content: string, public parentTweetId: string | null = null) {}
  public toJSON() {
    return {
      userId: this.userId,
      content: this.content,
      parentTweetId: this.parentTweetId,
    };
  }
}

export default Tweet;

class User {
  constructor(
    protected name: string,
    protected username: string,
    protected email: string,
    protected password: string,
    protected imgUrl: string | null
  ) {}

  public toJSON() {
    return {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      imgUrl: this.imgUrl,
    };
  }
}

export default User;

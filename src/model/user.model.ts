class User {
  constructor(protected username: string, protected email: string, protected password: string) {}

  public toJSON() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}

export default User;

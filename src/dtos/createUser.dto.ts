export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
  imgUrl: string | null;
}

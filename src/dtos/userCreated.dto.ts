export interface UserCreatedDto {
  id: string;
  name: string;
  username: string;
  email: string;
  imgUrl: string | null;
  createdAt: Date;
}

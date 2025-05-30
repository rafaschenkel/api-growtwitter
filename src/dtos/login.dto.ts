import { UserCreatedDto } from "./userCreated.dto";

export interface LoginDto {
  login: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserCreatedDto;
}

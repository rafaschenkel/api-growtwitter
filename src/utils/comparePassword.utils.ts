import { compare } from "bcrypt";

export async function comparePassword(password: string, hash: string) {
  const isValid = await compare(password, hash);
  return isValid;
}

export interface ResultDto<T = undefined> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}

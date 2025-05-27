export interface ResultDto<T> {
  code: number;
  message: string;
  data?: T;
}

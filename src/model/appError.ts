export class AppError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}

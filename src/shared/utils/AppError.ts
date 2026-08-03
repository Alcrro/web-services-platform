export class AppError extends Error {
  public userMessage: string;
  public status: number;

  constructor(message: string, userMessage?: string, status = 400) {
    super(message);
    this.userMessage = userMessage || "Something went wrong";
    this.status = status;
  }
}

export class ResumeNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResumeNotFoundError";
  }
}

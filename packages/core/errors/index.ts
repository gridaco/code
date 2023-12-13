export class TokenNotHandledError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenNotHandledError";
  }
}

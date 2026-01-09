export class HttpError extends Error {
  status: number;
  code: string;
  payload?: unknown;

  constructor(status: number, code: string, message: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

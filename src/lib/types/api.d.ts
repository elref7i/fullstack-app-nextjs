declare interface APIResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Custom API Error class for better error handling
 */

declare class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: APIResponse
  ) {
    super(message);
    this.name = "APIError";
  }
}

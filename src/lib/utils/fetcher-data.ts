/**
 * Configuration interface for the fetcher function
 * @template TBody - Type of the request body
 */

/**
 * Configuration interface for the fetcher function
 * @template TBody - Type of the request body
 */

interface FetcherType<TBody = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TBody;
  json?: boolean;
}

/**
 * Universal API fetcher function
 *
 * Handles all HTTP requests to the API with consistent error handling
 * and response processing.
 *
 * @param config - Configuration object for the request
 * @returns Promise with the response data
 * @throws APIError if the request fails
 */
export const fetcher = async <TBody = unknown, TResponse = unknown>({
  url,
  method,
  body,
  json = true,
}: FetcherType<TBody>): Promise<TResponse> => {
  try {
    // Make the HTTP request
    const res = await fetch(url, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Parse response
    let responseData: APIResponse<TResponse> = {};
    try {
      responseData = await res.json();
    } catch {
      // Handle non-JSON responses
      responseData = { message: "Invalid response format" };
    }

    // Handle HTTP errors with more specific messaging
    if (!res.ok) {
      const errorMessage =
        responseData.error ||
        responseData.message ||
        `HTTP ${res.status}: ${res.statusText}`;
      throw new APIError(errorMessage, res.status, responseData);
    }

    // Return appropriate data based on json flag
    if (json && responseData.data !== undefined) {
      return responseData.data;
    }

    return (json ? responseData : {}) as TResponse;
  } catch (error) {
    // Re-throw APIErrors as-is
    if (error instanceof APIError) {
      throw error;
    }

    // Handle network errors or other fetch failures
    throw new APIError(
      error instanceof Error ? error.message : "Network error occurred",
      0
    );
  }
};

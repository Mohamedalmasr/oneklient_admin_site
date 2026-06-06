/**
 * API Client Configuration
 * Central place for all API endpoints and configuration with TypeScript support
 */

// Type definitions for API responses
export type ApiResponse<T = unknown> = (T extends object
  ? T
  : Record<string, unknown>) & {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, unknown> | unknown[];
  ErrorAID?: string | number;
};

export interface LicenseValidationRequest {
  licenseKey: string;
  clientId: string;
  email?: string;
}

export interface LicenseValidationResponse {
  licenseKey: string;
  status: "valid" | "invalid" | "expired";
  expiryDate?: string;
  features?: string[];
  message: string;
}

// API configuration
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "")
  .trim()
  .replace(/\/+$/, "");
const API_TIMEOUT = process.env.NEXT_PUBLIC_API_TIMEOUT
  ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
  : 30000;
const API_WITH_CREDENTIALS =
  process.env.NEXT_PUBLIC_API_WITH_CREDENTIALS === "true";

export const API_ENDPOINTS = {
  HEALTH: "/api/health",
  LICENSE_VALIDATE: "/api/license/validate",
} as const;

/**
 * Get full API URL
 */
export function getApiUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return API_BASE_URL
    ? `${API_BASE_URL}${normalizedEndpoint}`
    : normalizedEndpoint;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const getErrorMessage = (data: unknown): string | undefined => {
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  return undefined;
};

const parseResponseBody = async <T>(
  response: Response,
): Promise<ApiResponse<T>> => {
  const text = await response.text();

  if (!text) {
    return { success: response.ok } as ApiResponse<T>;
  }

  return JSON.parse(text) as ApiResponse<T>;
};

const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const isCrossOriginUrl = (url: string) => {
  if (!isAbsoluteUrl(url)) {
    return false;
  }

  if (typeof window === "undefined") {
    return true;
  }

  return new URL(url).origin !== window.location.origin;
};

/**
 * Generic API request function with error handling and CORS support
 */
export async function apiCall<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = getApiUrl(endpoint);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  const isCrossOrigin = isCrossOriginUrl(url);
  const credentials: RequestCredentials = API_WITH_CREDENTIALS
    ? "include"
    : isCrossOrigin
      ? "omit"
      : "same-origin";
  const mode: RequestMode = isCrossOrigin ? "cors" : "same-origin";

  try {
    const response = await fetch(url, {
      method: "GET",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
      credentials,
      mode,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}` };
      }

      throw new ApiError(
        response.status,
        errorData,
        getErrorMessage(errorData) ||
          `API request failed with status ${response.status}`,
      );
    }

    return parseResponseBody<T>(response);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      // Network error or CORS issue
      console.error(
        `Network error calling ${endpoint}. Check CORS configuration and API availability.`,
      );
      throw new ApiError(
        0,
        { message: "Network error" },
        "Unable to reach the API server. Please check your connection and API configuration.",
      );
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      console.error(`API call to ${endpoint} timed out`);
      throw new ApiError(
        408,
        { message: "Request timeout" },
        "The API request took too long to complete",
      );
    }

    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
}

/**
 * Validate license by calling the backend API
 */
export async function validateLicense(
  request: LicenseValidationRequest,
): Promise<ApiResponse<LicenseValidationResponse>> {
  return apiCall<LicenseValidationResponse>(API_ENDPOINTS.LICENSE_VALIDATE, {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Check backend health
 */
export async function checkBackendHealth(): Promise<ApiResponse> {
  return apiCall(API_ENDPOINTS.HEALTH);
}

/**
 * GET request
 */
export async function apiGet<T = unknown>(
  endpoint: string,
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { method: "GET" });
}

/**
 * POST request
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  data?: Record<string, unknown>,
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function apiPut<T = unknown>(
  endpoint: string,
  data?: Record<string, unknown>,
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T = unknown>(
  endpoint: string,
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { method: "DELETE" });
}

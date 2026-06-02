/**
 * API Client Configuration
 * Central place for all API endpoints and configuration with TypeScript support
 */

// Type definitions for API responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, unknown>;
  ErrorAID?: string;
}

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
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const API_TIMEOUT = process.env.NEXT_PUBLIC_API_TIMEOUT
  ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
  : 30000;

export const API_ENDPOINTS = {
  HEALTH: "/health",
  LICENSE_VALIDATE: "/api/license/validate",
} as const;

/**
 * Get full API URL
 */
export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
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

  try {
    const response = await fetch(url, {
      method: "GET",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
      credentials: "include", // Enable CORS credentials if needed
      mode: "cors", // Explicitly set CORS mode
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
        (errorData as ApiResponse).message ||
          `API request failed with status ${response.status}`,
      );
    }

    const responseData = (await response.json()) as ApiResponse<T>;
    return responseData;
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
export async function apiGet<T = unknown>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: "GET" });
}

/**
 * POST request
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  data?: Record<string, unknown>,
): Promise<T> {
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
): Promise<T> {
  return apiCall<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T = unknown>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: "DELETE" });
}

import { apiPost, API_ENDPOINTS } from "../api-client"; // Adjusted path to pull from parent directory

// 1. Match your backend Zod payload requirements
export interface LicenseValidationRequest {
  ClientCard: string;
  Passkey: string;
  LicNum: string;
  KeyCd: string;
  AccountNum: string;
}

// 2. Match your backend response helpers precisely
export interface LicenseValidationResponse {
  success: boolean;
  ErrorAID?: number | string;
  message: string;
  // Add any additional table row data your backend service passes back on success here
  [key: string]: any;
}

/**
 * Validate a license key against the Node.js backend
 */
export async function validateLicense(
  request: LicenseValidationRequest,
): Promise<LicenseValidationResponse> {
  return apiPost<LicenseValidationResponse>(
    API_ENDPOINTS.LICENSE_VALIDATE,
    // TypeScript forces the component to pass the exact 5 keys the DB needs
    request as unknown as Record<string, unknown>,
  );
}

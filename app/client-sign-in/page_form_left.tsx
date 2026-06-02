"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Building2,
  CreditCard,
  HelpCircle,
  KeyRound,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { apiCall, ApiError } from "@/lib/api-client";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "error";
  errorCode?: string;
}

interface OrganizationResponse {
  success: boolean;
  website?: string;
  client?: {
    ClientCard: string;
    AccountNum: string;
  };
  ErrorAID?: number | string;
  message?: string;
}

// Error code mapping
const ERROR_MESSAGES: Record<
  string | number,
  { title: string; description: string }
> = {
  "100000": {
    title: "Invalid License Information",
    description:
      "The credentials you provided don't match any organization in our system. Please verify all fields and try again.",
  },
  "100001": {
    title: "Invalid Client Status",
    description:
      "This organization's account status is invalid (suspended or blocked). Please contact support to resolve this issue.",
  },
  "100002": {
    title: "License Expired",
    description:
      "This organization's license has expired. Please renew your license to continue.",
  },
  "000000": {
    title: "Client Inactive",
    description:
      "This organization account is currently inactive. Please contact support to activate it.",
  },
};

function ToastItem({
  message,
  type,
  errorCode,
  onDone,
}: {
  message: string;
  type: "success" | "error";
  errorCode?: string;
  onDone: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const hideTimer = setTimeout(() => setShow(false), 4000);
    const doneTimer = setTimeout(() => onDone(), 4400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  const errorInfo = errorCode ? ERROR_MESSAGES[errorCode] : null;

  return (
    <div
      className={`w-full max-w-md px-4 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all duration-300 ease-out ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          {errorInfo && <div className="font-bold">{errorInfo.title}</div>}
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default function ClientSignInFormLeft() {
  const [accountNumber, setAccountNumber] = useState("");
  const [clientCardNumber, setClientCardNumber] = useState("");
  const [passKey, setPassKey] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [keyCode, setKeyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [lastError, setLastError] = useState<{
    code?: string;
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (
      message: string,
      type: "success" | "error" = "success",
      errorCode?: string,
    ) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, errorCode }]);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setLastError(null);

    // Frontend validation
    if (
      !accountNumber.trim() ||
      !clientCardNumber.trim() ||
      !passKey.trim() ||
      !licenseNumber.trim() ||
      !keyCode.trim()
    ) {
      showToast("Please complete all fields.", "error");
      setIsLoading(false);
      return;
    }

    try {
      // Call backend API
      const response = await apiCall<OrganizationResponse>(
        "/api/license/validate",
        {
          method: "POST",
          body: JSON.stringify({
            AccountNum: accountNumber.trim(),
            ClientCard: clientCardNumber.trim(),
            Passkey: passKey.trim(),
            LicNum: licenseNumber.trim(),
            KeyCd: keyCode.trim(),
          }),
        },
      );

      if (response.success) {
        // Success
        const org = response.client;
        const website = response.website || "Organization portal";
        showToast(
          `✓ Organization verified! Welcome ${org?.AccountNum}. Visit: ${website}`,
          "success",
        );

        // Clear form on success
        setTimeout(() => {
          setAccountNumber("");
          setClientCardNumber("");
          setPassKey("");
          setLicenseNumber("");
          setKeyCode("");
        }, 500);
      } else {
        // API returned error
        const errorCode = String(response.ErrorAID || "unknown");
        const message =
          response.message || "An error occurred during validation";
        const errorInfo = ERROR_MESSAGES[errorCode];

        setLastError({ code: errorCode, message });
        showToast(errorInfo?.description || message, "error", errorCode);

        // Log error details for debugging
        console.warn("Organization onboarding error:", {
          errorCode,
          message,
          details: errorInfo,
        });
      }
    } catch (error) {
      let errorMessage = "Failed to validate organization";

      if (error instanceof ApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setLastError({ message: errorMessage });
      showToast(errorMessage, "error");

      console.error("Organization onboarding exception:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-[1.15rem] font-semibold text-slate-950 flex items-center gap-2">
          ON Boarding New Organization
          <HelpCircle
            className="h-4 w-4 text-blue-500 cursor-help"
            title="Verify your organization credentials to gain access"
          />
        </CardTitle>
        <CardDescription className="mt-2 text-sm text-slate-600">
          Fill in the organization fields to continue with the sign in flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="accountNumber">Account Number *</Label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="accountNumber"
                name="accountNumber"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                placeholder="e.g., ACC-7723"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="clientCardNumber">Client Card Number *</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="clientCardNumber"
                name="clientCardNumber"
                value={clientCardNumber}
                onChange={(event) => setClientCardNumber(event.target.value)}
                placeholder="e.g., CARD123456"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="passKey">Pass Key *</Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="passKey"
                name="passKey"
                type="password"
                value={passKey}
                onChange={(event) => setPassKey(event.target.value)}
                placeholder="Enter pass key"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="licenseNumber">Licence Number *</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="licenseNumber"
                name="licenseNumber"
                value={licenseNumber}
                onChange={(event) => setLicenseNumber(event.target.value)}
                placeholder="e.g., LIC-99823-X"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="keyCode">Key Code *</Label>
            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="keyCode"
                name="keyCode"
                value={keyCode}
                onChange={(event) => setKeyCode(event.target.value)}
                placeholder="e.g., KEY-CODE-001"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Error Details Section */}
          {lastError && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-red-800">{lastError.message}</p>
                  {lastError.code && (
                    <p className="text-red-700 text-xs mt-1">
                      Code: {lastError.code}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2563eb] text-white hover:bg-[#1d4ed8] disabled:bg-slate-400 disabled:cursor-not-allowed focus-visible:ring-[#2563eb]/50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            {isLoading ? "Verifying..." : "Verify Organization"}
          </Button>

          {/* Help Text */}
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800">
            <p className="font-semibold mb-1">Test Data Available</p>
            <p>
              See{" "}
              <code className="bg-blue-100 px-1 rounded">
                ONBOARDING_TEST_DATA.md
              </code>{" "}
              for test credentials and error scenarios.
            </p>
          </div>
        </form>

        {/* Toast Container */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 pointer-events-none">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem
                message={toast.message}
                type={toast.type}
                errorCode={toast.errorCode}
                onDone={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

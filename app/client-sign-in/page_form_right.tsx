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
import { CreditCard, Lock, User, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { apiCall, ApiError } from "@/lib/api-client";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "error";
}

interface SuperAdminResponse {
  success: boolean;
  message?: string;
  token?: string; // For session token storage later
}

function ToastItem({
  message,
  type,
  onDone,
}: {
  message: string;
  type: "success" | "error";
  onDone: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const hideTimer = setTimeout(() => setShow(false), 3000);
    const doneTimer = setTimeout(() => onDone(), 3400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`w-full max-w-md px-4 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all duration-300 ease-out ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}

export default function ClientSignInFormRight() {
  const [orgClientCard, setOrgClientCard] = useState("");
  const [userClientCard, setUserClientCard] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [errorFrame, setErrorFrame] = useState<string | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorFrame(null);

    if (!orgClientCard.trim() || !userClientCard.trim() || !password.trim()) {
      showToast("Please complete all fields.", "error");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Swap out placeholder endpoint string with your live backend auth route
      const response = await apiCall<SuperAdminResponse>("/api/auth/superadmin-login", {
        method: "POST",
        body: JSON.stringify({
          OrgClientCard: orgClientCard.trim(),
          UserClientCard: userClientCard.trim(),
          Password: password.trim(),
        }),
      });

      if (response.success) {
        showToast("SuperAdmin login authenticated successfully!", "success");
        // Handle redirect or session initialization here
      } else {
        const msg = response.message || "Invalid authentication credentials";
        setErrorFrame(msg);
        showToast(msg, "error");
      }
    } catch (err) {
      let msg = "Failed to communicate with the authentication server";
      if (err instanceof ApiError || err instanceof Error) {
        msg = err.message;
      }
      setErrorFrame(msg);
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-[1.15rem] font-semibold text-slate-950">
          SuperAdmin Login
        </CardTitle>
        <CardDescription className="mt-2 text-sm text-slate-600">
          Enter the client-specific card numbers and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="orgClientCard">
              Organization Client Card Number *
            </Label>
            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="orgClientCard"
                name="orgClientCard"
                value={orgClientCard}
                onChange={(event) => setOrgClientCard(event.target.value)}
                placeholder="Enter Organization Client Card Number"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="userClientCard">User Client Card Number *</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="userClientCard"
                name="userClientCard"
                value={userClientCard}
                onChange={(event) => setUserClientCard(event.target.value)}
                placeholder="Enter User Client Card Number"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {errorFrame && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-red-900">Login Failure</p>
                <p className="text-red-800">{errorFrame}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2563eb] text-white hover:bg-[#1d4ed8] disabled:bg-slate-400 disabled:cursor-not-allowed focus-visible:ring-[#2563eb]/50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            {isLoading ? "Signing In..." : "Submit"}
          </Button>
        </form>

        {/* Global Floating Toast Container */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 pointer-events-none z-50">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem
                message={toast.message}
                type={toast.type}
                onDone={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
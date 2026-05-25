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
import { Building2, CreditCard, KeyRound, Lock, User } from "lucide-react";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "error";
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
      className={`min-w-[240px] px-4 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all duration-300 ease-out ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

export default function ClientSignInFormLeft() {
  const [orgId, setOrgId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [keyCode, setKeyCode] = useState("");
  const [clientCardNumber, setClientCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (
      !orgId.trim() ||
      !accountNumber.trim() ||
      !licenseNumber.trim() ||
      !keyCode.trim() ||
      !clientCardNumber.trim()
    ) {
      showToast("Please complete all left form fields.", "error");
      setIsLoading(false);
      return;
    }

    showToast("Left form submitted successfully.", "success");
    setIsLoading(false);
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-[1.15rem] font-semibold text-slate-950">
          ON Boarding New Organization
        </CardTitle>
        <CardDescription className="mt-2 text-sm text-slate-600">
          Fill in the organization fields to continue with the left sign in
          flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="orgId">Org ID</Label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="orgId"
                name="orgId"
                value={orgId}
                onChange={(event) => setOrgId(event.target.value)}
                placeholder="Enter Org ID"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="accountNumber">Account Number</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="accountNumber"
                name="accountNumber"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                placeholder="Enter Account Number"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="licenseNumber">Licence number</Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="licenseNumber"
                name="licenseNumber"
                value={licenseNumber}
                onChange={(event) => setLicenseNumber(event.target.value)}
                placeholder="Enter Licence number"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="keyCode">Key code</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="keyCode"
                name="keyCode"
                value={keyCode}
                onChange={(event) => setKeyCode(event.target.value)}
                placeholder="Enter Key code"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="clientCardNumber">Client Card Number</Label>
            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="clientCardNumber"
                name="clientCardNumber"
                value={clientCardNumber}
                onChange={(event) => setClientCardNumber(event.target.value)}
                placeholder="Enter Client Card Number"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2563eb] text-white hover:bg-[#1d4ed8] focus-visible:ring-[#2563eb]/50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>

          <div className="mt-5 flex flex-col gap-3">
            {toasts.map((toast) => (
              <ToastItem
                key={toast.id}
                message={toast.message}
                type={toast.type}
                onDone={() => removeToast(toast.id)}
              />
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

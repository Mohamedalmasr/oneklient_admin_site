"use client";

import React, { useState, useEffect } from "react";
import { validateLicense, LicenseValidationResponse } from "@/lib/services/license.service";
import { checkBackendHealth } from "@/lib/api-client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LicenseValidationPage() {
  // 1. Core Input States
  const [clientCard, setClientCard] = useState("");
  const [passkey, setPasskey] = useState("");
  const [licNum, setLicNum] = useState("");
  const [keyCd, setKeyCd] = useState("");
  const [accountNum, setAccountNum] = useState("");

  // 2. Status States (Typed precisely to avoid 'unknown' ReactNode errors)
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LicenseValidationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendHealth, setBackendHealth] = useState<"checking" | "healthy" | "unhealthy">("checking");

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await checkBackendHealth();
        setBackendHealth("healthy");
      } catch {
        setBackendHealth("unhealthy");
      }
    };
    checkHealth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!clientCard || !passkey || !licNum || !keyCd || !accountNum) {
        throw new Error("All fields are required for license validation");
      }

      const response = await validateLicense({
        ClientCard: clientCard,
        Passkey: passkey,
        LicNum: licNum,
        KeyCd: keyCd,
        AccountNum: accountNum,
      });

      if (response.success) {
        setResult(response);
      } else {
        setError(response.message || "License validation failed");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage="license" />

      <main className="flex-1 px-4 py-12 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-[#0f172a]">
            License Validation
          </h1>

          {/* Backend Health Status */}
          <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-white">
            <p className="text-sm font-medium">
              Backend Status:{" "}
              <span className={backendHealth === "healthy" ? "text-green-600" : "text-red-600"}>
                {backendHealth === "checking"
                  ? "Checking..."
                  : backendHealth === "healthy"
                    ? "✓ Connected"
                    : "✗ Disconnected"}
              </span>
            </p>
          </div>

          {/* Validation Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1">Client Card *</label>
                <input
                  type="text"
                  value={clientCard}
                  onChange={(e) => setClientCard(e.target.value)}
                  placeholder="Enter Client Card"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1">Passkey *</label>
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter Passkey"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1">License Number *</label>
              <input
                type="text"
                value={licNum}
                onChange={(e) => setLicNum(e.target.value)}
                placeholder="Enter License Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1">Key Code *</label>
                <input
                  type="text"
                  value={keyCd}
                  onChange={(e) => setKeyCd(e.target.value)}
                  placeholder="Enter Key Code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1">Account Number *</label>
                <input
                  type="text"
                  value={accountNum}
                  onChange={(e) => setAccountNum(e.target.value)}
                  placeholder="Enter Account Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || backendHealth === "unhealthy"}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? "Validating..." : "Validate License"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">Validation Status</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium mb-2">
                ✓ License Data Received
              </p>
              <pre className="text-xs text-green-600 overflow-auto bg-white p-2 rounded border border-green-300">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
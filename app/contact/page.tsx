"use client";
import { useState, type FormEvent, useCallback, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, User, MessageSquare } from "lucide-react";

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

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (msg: string, type: "success" | "error" = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: msg, type }]);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      showToast("Please fill in all required fields.", "error");
      setIsLoading(false);
      return;
    }

    showToast("Message sent successfully!", "success");
    setFullName("");
    setEmail("");
    setMessage("");
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="contact" />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col justify-start px-4 pb-16 pt-12 sm:px-6 sm:pt-12 lg:pl-16 lg:pt-20">
          <div className="flex w-full max-w-xl flex-col self-end">

            {/* Title */}
            <h1 className="mb-8 text-[clamp(1.85rem,3.4vw,2.25rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
              Contact us
            </h1>
            {/* ── CONTACT FORM ── */}
            <div className="">
              <Card className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] shadow-sm">
                <CardContent className="px-5 py-6 sm:px-6">
                  <h2 className="mb-5 text-[1.05rem] font-bold tracking-[-0.02em] text-[#0f172a]">
                    Send us a message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-[0.85rem] font-medium text-[#334155]">
                        Full Name <span className="text-rose-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="pl-10 border-[#e2e8f0] bg-white focus-visible:ring-[#2563eb]/30"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="contactEmail" className="text-[0.85rem] font-medium text-[#334155]">
                        Email <span className="text-rose-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="contactEmail"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 border-[#e2e8f0] bg-white focus-visible:ring-[#2563eb]/30"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-[0.85rem] font-medium text-[#334155]">
                        Message <span className="text-rose-500">*</span>
                      </Label>
                      <div className="relative">
                        <MessageSquare className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can we help you?"
                          rows={4}
                          className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white pl-10 pr-3 py-2.5 text-sm text-[#0f172a] placeholder:text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/30 focus-visible:border-[#2563eb]/50 transition-all"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#2563eb] text-white hover:bg-[#1d4ed8] focus-visible:ring-[#2563eb]/50"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  {/* Toasts */}
                  {toasts.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                      {toasts.map((toast) => (
                        <ToastItem
                          key={toast.id}
                          message={toast.message}
                          type={toast.type}
                          onDone={() => removeToast(toast.id)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            {/* ── END FORM ── */}

          </div>
        </div>

        {/* ── RIGHT COLUMN — image, untouched ── */}
        <div className="flex items-start justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-4 pb-12 pt-10">
          <img
            src="/image/9c5ffd786a6598f4df431e2ac1fdd13e4cc5681f-removebg-preview.png"
            alt="Contact us — ONEklient support and portal access illustration"
            className="hidden md:block mt-12 h-auto w-full max-w-lg object-contain"
          />
        </div>

      </main>
      <Footer />
    </div>
  );
}
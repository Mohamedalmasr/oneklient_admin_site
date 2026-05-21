import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ClientSignInFormLeft from "./page_form_left";
import ClientSignInFormRight from "./page_form_right";

export default function ClientSignInPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <div
        className="pointer-events-none absolute left-[-180px] top-[-180px] h-[400px] w-[400px] rounded-full bg-[#0b3d91]/10 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-200px] bottom-[-200px] h-[500px] w-[500px] rounded-full bg-[#2563eb]/10 blur-[100px]"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="self-start rounded-full border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
            >
              <Link
                href="/administration"
                className="inline-flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Administration
              </Link>
            </Button>

            <div className="flex-1 max-w-2xl space-y-1 text-center text-slate-700 lg:text-left">
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Credentials Sign In
              </h1>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.05fr_0.95fr] items-start">
            <ClientSignInFormLeft />
            <ClientSignInFormRight />
          </div>
        </div>
      </main>
    </div>
  );
}

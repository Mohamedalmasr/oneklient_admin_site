import ClientSignInFormLeft from "./page_form_left";
import ClientSignInFormRight from "./page_form_right";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function ClientSignInPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage="administration" />

      {/* Full-screen white background layer */}
      <div className="flex-1 relative overflow-hidden bg-white">

        {/* Decorative blurs — kept exactly as original */}
        <div
          className="pointer-events-none absolute left-[-180px] top-[-180px] h-[400px] w-[400px] rounded-full bg-[#0b3d91]/10 blur-[90px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[-200px] bottom-[-200px] h-[500px] w-[500px] rounded-full bg-[#2563eb]/10 blur-[100px]"
          aria-hidden="true"
        />

        <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* Outer white card — full width */}
          <div className="flex flex-col gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">

            {/* Centered title block */}
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Credentials Sign In
              </h1>
              <p className="text-sm text-slate-500">
                Fill in your credentials below to access your account
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Two forms side by side — equal columns, aligned top */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
              <ClientSignInFormLeft />
              <ClientSignInFormRight />
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
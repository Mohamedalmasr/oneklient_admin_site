import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="privacy" />
      <main className=" px-4 pb-16 pt-12 sm:px-6 sm:pt-12 lg:px-16 lg:pt-20">
        <h1 className="mb-5 text-[clamp(1.85rem,3.4vw,2.625rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
          Privacy Policy
        </h1>

        <Alert variant="notice" className="mb-6 rounded-xl px-5 py-4 shadow-sm">
          <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
            This page is a placeholder for the full privacy policy and should be reviewed before publication.
          </AlertDescription>
        </Alert>

        <Alert variant="info" className="mb-10 rounded-xl px-5 py-4 shadow-sm">
          <ShieldCheck className="size-5 text-[#2563eb]" />
          <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
            ONEklient Solutions Inc. is committed to protecting information handled through its administration portals.
          </AlertDescription>
        </Alert>

        <section className="mt-2">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[#2563eb]" />
            <h2 className="text-[1.25rem] font-semibold text-[#0f172a]">Information handling</h2>
          </div>
          <p className="mb-8 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
            Business information should be collected, used, and stored only for authorized ONEklient purposes.
          </p>

          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <li className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-[#f8fafc] p-5 text-center transition-all duration-200 hover:bg-[#f1f5f9] hover:shadow-md">
              <img src="/svg/database-svgrepo-com.svg" alt="" className="h-12 w-12 text-[#2563eb]" />
              <span className="text-[0.95rem] font-medium text-[#475569]">Data Collection</span>
            </li>
            <li className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-[#f8fafc] p-5 text-center transition-all duration-200 hover:bg-[#f1f5f9] hover:shadow-md">
              <img src="/svg/cogwheel-svgrepo-com.svg" alt="" className="h-12 w-12 text-[#2563eb]" />
              <span className="text-[0.95rem] font-medium text-[#475569]">Data Usage</span>
            </li>
            <li className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-[#f8fafc] p-5 text-center transition-all duration-200 hover:bg-[#f1f5f9] hover:shadow-md">
              <img src="/svg/database-lock-svgrepo-com.svg" alt="" className="h-12 w-12 text-[#2563eb]" />
              <span className="text-[0.95rem] font-medium text-[#475569]">Data Storage</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

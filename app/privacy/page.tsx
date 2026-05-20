import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Info } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="privacy" />
      <main className="m-0 w-full max-w-[900px] px-8 pb-16 pt-16 sm:px-12 sm:pt-16 lg:px-16 lg:pt-20">
        <h1 className="mb-5 text-[42px] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
          Privacy Policy
        </h1>

        <Alert variant="notice" className="mb-[10px] rounded-[6px] px-[14px] py-[10px]">
          <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
            This page is a placeholder for the full privacy policy and should be reviewed before publication.
          </AlertDescription>
        </Alert>

        <Alert variant="info" className="mb-10 rounded-[6px] px-[14px] py-[10px]">
          <ShieldCheck className="size-5 text-[#2563eb]" />
          <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
            ONEklient Solutions Inc. is committed to protecting information handled through its administration portals.
          </AlertDescription>
        </Alert>

        <section className="mt-2">
          <div className="mb-[14px] flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[#2563eb]" />
            <h2 className="text-[1.25rem] font-semibold text-[#0f172a]">Information handling</h2>
          </div>
          <p className="mb-8 max-w-[750px] text-[0.95rem] leading-[1.618] text-[#475569]">
            Business information should be collected, used, and stored only for authorized ONEklient purposes.
          </p>

          <ul className="flex gap-12 flex-wrap">
            <li className="flex flex-col items-center gap-[10px]">
              <img src="/svg/database-svgrepo-com.svg" alt="" className="h-12 w-12 text-[#2563eb]" />
              <span className="text-[0.8125rem] font-medium text-[#475569]">Data Collection</span>
            </li>
            <li className="flex flex-col items-center gap-[10px]">
              <img src="/svg/cogwheel-svgrepo-com.svg" alt="" className="h-12 w-12 text-[#2563eb]" />
              <span className="text-[0.8125rem] font-medium text-[#475569]">Data Usage</span>
            </li>
            <li className="flex flex-col items-center gap-[10px]">
              <img src="/svg/database-lock-svgrepo-com.svg" alt="" className="h-12 w-12 text-[#2563eb]" />
              <span className="text-[0.8125rem] font-medium text-[#475569]">Data Storage</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

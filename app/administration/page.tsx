import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LogIn, FilePlus } from "lucide-react";

export default function AdministrationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage="administration" />
      <main className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="text-center">
          <h1 className="mb-4 text-[clamp(1.85rem,3.4vw,2.625rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
            Administration Portal
          </h1>
          <p className="mb-8 max-w-lg mx-auto text-[0.95rem] leading-[1.618] text-[#475569]">
            Access your ONEklient administration dashboard to manage clients,
            settings, and business processes — all in one secure place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full !bg-[#2563eb] !text-white hover:!bg-[#1d4ed8]">
              <a href="/client-sign-in">
                <LogIn className="h-4 w-4 mr-2" />
                 Client Sign in
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full !border-[#1e3a5f] !text-[#1e3a5f] hover:!bg-[#2563eb] hover:!text-white">
              <a href="/register-application">
                <FilePlus className="h-4 w-4 mr-2" />
                Register New Application
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

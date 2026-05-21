import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="contact" />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-start px-4 pb-16 pt-12 sm:px-6 sm:pt-12 lg:pl-16 lg:pt-20">
          <div className="flex w-full max-w-xl flex-col self-end">
            <h1 className="mb-6 text-[clamp(1.85rem,3.4vw,2.25rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
              Contact us
            </h1>
            <p className="text-[0.95rem] leading-[1.618] text-[#475569]">
              For questions about ONEklient products, portal access, or administrative support, please contact ONEklient Solutions Inc.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-5">
              <Card className="flex h-20 min-w-[250px] items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="flex h-full items-center gap-3 p-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(37,99,235,0.1)]">
                    <Mail className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <strong className="block text-[1.05rem] font-bold text-[#0f172a]">Email:</strong>
                    <a href="mailto:support@oneklient.com" className="no-underline text-[0.95rem] font-medium text-[#2563eb] hover:text-[#1d4ed8]">support@oneklient.com</a>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex h-20 min-w-[250px] items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="flex h-full items-center gap-3 p-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(37,99,235,0.1)]">
                    <Globe className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <strong className="block text-[1.05rem] font-bold text-[#0f172a]">Portal:</strong>
                    <a href="https://admin.oneklient.com" target="_blank" rel="noopener noreferrer" className="no-underline text-[0.95rem] font-medium text-[#2563eb] hover:text-[#1d4ed8]">admin.oneklient.com</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

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

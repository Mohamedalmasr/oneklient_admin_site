import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="contact" />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-start px-8 pb-16 pt-16 sm:px-12 sm:pt-16 lg:pl-16 lg:pt-20">
          <div className="flex w-full max-w-xl flex-col self-end">
            <h1 className="mb-5 text-[clamp(1.85rem,3.4vw,2.25rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
              Contact us
            </h1>
            <p className="text-[0.95rem] leading-[1.618] text-[#475569]">
              For questions about ONEklient products, portal access, or administrative support, please contact ONEklient Solutions Inc.
            </p>

            <div className="mt-6 flex gap-5">
              <div className="flex h-20 min-w-[250px] items-center gap-3 rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] px-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]">
                <div className="-mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] bg-[rgba(37,99,235,0.1)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <strong className="block text-[1.1rem] font-bold text-[#0f172a]">Email:</strong>
                  <a href="mailto:support@oneklient.com" className="no-underline text-[#2563eb] font-medium hover:text-[#1d4ed8]">support@oneklient.com</a>
                </div>
              </div>

              <div className="flex h-20 min-w-[250px] items-center gap-3 rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] px-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]">
                <div className="-mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center">
                  <img src="/svg/logo-icon.svg" alt="Portal" className="h-6 w-6" />
                </div>
                <div className="flex flex-col justify-center">
                  <strong className="block text-[1.1rem] font-bold text-[#0f172a]">Portal:</strong>
                  <a href="https://admin.oneklient.com" target="_blank" rel="noopener noreferrer" className="no-underline text-[#2563eb] font-medium hover:text-[#1d4ed8]">admin.oneklient.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center bg-[#f8fafc] overflow-hidden px-2 pb-12 pt-10">
          <img
            src="/image/9c5ffd786a6598f4df431e2ac1fdd13e4cc5681f-removebg-preview.png"
            alt="Contact us — ONEklient support and portal access illustration"
            className="mt-[60px] block h-auto w-full max-w-[540px] object-contain"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

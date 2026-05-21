import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage="home" />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-start px-4 py-12 sm:px-6 sm:pt-12 md:px-8 lg:pl-16 lg:pr-8 lg:pt-20">
          <section className="flex max-w-xl w-full flex-col self-end">
            <p className="text-[0.9rem] font-medium text-[#475569] mb-4 tracking-[0.01em]">
              Welcome to ONEklient.
            </p>
            <h1 className="mb-6 text-[clamp(1.85rem,4vw,2.625rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
              Your gateway to online
              <br className="hidden sm:inline" />
              products designed to
              <br className="hidden sm:inline" />
              streamline business.
            </h1>
            <div className="mb-6 flex flex-col gap-4">
              <p className="m-0 text-[0.95rem] leading-[1.618] text-[#475569]">
                ONEklient helps streamline, organize, and improve business
                processes — so your team can focus on serving each client with
                care.
              </p>
              <p className="m-0 text-[0.95rem] leading-[1.618] text-[#475569]">
                Integrate essential tools into one secure portal, reduce
                repetition, improve accuracy, and advance every process with
                confidence.
              </p>
            </div>
            <p className="mt-2 text-[0.95rem] font-bold text-[#0f172a]">
              Start with clarity. Work with purpose. Serve as one.
            </p>
            <a
              href="#"
              className="group mt-6 inline-flex items-center gap-2 self-start rounded-lg bg-[#2563eb] px-6 py-3 text-[0.95rem] font-medium text-white no-underline shadow-md transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-lg"
            >
              ONEklient Admin
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </section>
        </div>
        <div className="flex items-start justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-4 pb-12 pt-10 lg:px-8 lg:pb-16 lg:pt-16">
          <img
            src="/image/Gemini_Generated_Image_bw99rwbw99rwbw99.png"
            alt="ONEklient Dashboard Preview"
            className="hidden md:block w-full max-w-xl h-auto object-contain"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

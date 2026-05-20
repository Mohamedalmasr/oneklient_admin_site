import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage="home" />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-start px-8 py-16 sm:px-12 sm:pt-16 lg:pl-16 lg:pr-8 lg:pt-20">
          <section className="flex max-w-xl w-full flex-col self-end">
            <p className="text-[0.9rem] font-medium text-[#475569] mb-3 tracking-[0.01em]">
              Welcome to ONEklient.
            </p>
            <h1 className="mb-6 text-[42px] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
              Your gateway to online
              <br className="hidden md:inline" />
              products designed to
              <br className="hidden md:inline" />
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
              className="mt-6 inline-flex items-center gap-1.5 self-start rounded-[6px] bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white no-underline shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#1d4ed8]"
            >
              ONEklient Admin
              <span className="text-[0.95rem] transition-transform duration-200 group-hover:translate-x-[3px]">
                &gt;
              </span>
            </a>
          </section>
        </div>
        <div className="pl-6 pr-6 lg:pr-8 pb-12 lg:pb-16 pt-10 lg:pt-16 flex items-start justify-center bg-[#f8fafc] overflow-hidden">
          <img
            src="/image/Gemini_Generated_Image_bw99rwbw99rwbw99.png"
            alt="ONEklient Dashboard Preview"
            className="w-full max-w-[640px] h-auto object-contain rounded-lg"
          />
        </div>{" "}
      </main>
      <Footer />
    </div>
  );
}

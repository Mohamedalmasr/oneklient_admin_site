import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="about" />
      <main className="flex-1 w-full px-4 pb-16 pt-12 sm:px-6 sm:pt-12 lg:px-16 lg:pt-20">
        <h1 className="mb-5 text-[clamp(1.85rem,3.4vw,2.625rem)] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
          About ONEklient
        </h1>
        <p className="mb-4 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
          ONEklient Solutions Inc. creates online products designed to simplify, organize, and streamline business processes.
        </p>
        <p className="mb-8 max-w-3xl text-[0.95rem] leading-[1.618] text-[#475569]">
          Our goal is to help businesses manage their work with clarity, consistency, and the focused care of serving one client.
        </p>

        <section className="my-12 flex flex-col gap-6 sm:flex-row sm:gap-6 md:gap-8">
          <div className="flex flex-1 flex-col items-center gap-4 rounded-xl bg-[#f8fafc] p-6 text-center transition-all duration-200 hover:bg-[#f1f5f9] hover:shadow-md">
            <div className="h-16 w-16 flex-shrink-0">
              <img src="/svg/search-svgrepo-com.svg" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-[1rem] font-bold text-[#0f172a]">Clarity</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-4 rounded-xl bg-[#f8fafc] p-6 text-center transition-all duration-200 hover:bg-[#f1f5f9] hover:shadow-md">
            <div className="h-16 w-16 flex-shrink-0">
              <img src="/svg/automation-svgrepo-com.svg" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-[1rem] font-bold text-[#0f172a]">Consistency</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-4 rounded-xl bg-[#f8fafc] p-6 text-center transition-all duration-200 hover:bg-[#f1f5f9] hover:shadow-md">
            <div className="h-16 w-16 flex-shrink-0">
              <img src="/svg/user-profile-svgrepo-com.svg" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-[1rem] font-bold text-[#0f172a]">Focused Care</span>
          </div>
        </section>

        <div className="mt-16 flex w-full justify-center">
          <div className="flex w-full max-w-3xl flex-col px-4">
            <h2 className="mb-4 text-left text-[1.75rem] font-extrabold text-[#0f172a]">Our purpose</h2>
            <div className="relative flex w-full items-center">
              <Alert variant="notice" className="relative flex-1 max-w-full rounded-xl py-4 pr-32 pl-6 shadow-md">
                <AlertDescription className="m-0 text-[0.95rem] leading-[1.618]">
                  To bring practical business tools into one secure and efficient portal.
                </AlertDescription>
              </Alert>
              <figure className="absolute right-[-30px] z-[2] h-auto w-[260px] flex-shrink-0" aria-hidden="true">
                <img
                  src="/image/Gemini_Generated_Image_j9d8eyj9d8eyj9d8-removebg-preview.png"
                  alt="Business tools portal concept illustration"
                  className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] block h-full w-full"
                />
              </figure>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

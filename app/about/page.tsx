import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPage="about" />
      <main className="flex-1 w-full px-8 pb-16 pt-16 sm:px-12 sm:pt-16 lg:px-16 lg:pt-20">
        <h1 className="mb-5 text-[42px] font-extrabold leading-[1.236] tracking-[-0.027em] text-[#0f172a]">
          About ONEklient
        </h1>
        <p className="mb-4 max-w-[750px] text-[0.95rem] leading-[1.618] text-[#475569]">
          ONEklient Solutions Inc. creates online products designed to simplify, organize, and streamline business processes.
        </p>
        <p className="mb-4 max-w-[750px] text-[0.95rem] leading-[1.618] text-[#475569]">
          Our goal is to help businesses manage their work with clarity, consistency, and the focused care of serving one client.
        </p>

        <section className="my-20 flex flex-row gap-[180px] flex-wrap px-5">
          <div className="flex flex-row items-center gap-4 text-left">
            <div className="h-16 w-16 flex-shrink-0">
              <img src="/svg/search-svgrepo-com.svg" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-[0.95rem] font-bold text-[#0f172a]">Clarity</span>
          </div>
          <div className="flex flex-row items-center gap-4 text-left">
            <div className="h-16 w-16 flex-shrink-0">
              <img src="/svg/automation-svgrepo-com.svg" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-[0.95rem] font-bold text-[#0f172a]">Consistency</span>
          </div>
          <div className="flex flex-row items-center gap-4 text-left">
            <div className="h-16 w-16 flex-shrink-0">
              <img src="/svg/user-profile-svgrepo-com.svg" alt="" className="h-full w-full object-contain" />
            </div>
            <span className="text-[0.95rem] font-bold text-[#0f172a]">Focused Care</span>
          </div>
        </section>

        <div className="mt-16 flex w-full justify-center">
          <div className="flex w-full max-w-[900px] flex-col px-5">
            <h2 className="mb-4 text-left text-[1.75rem] font-extrabold text-[#0f172a]">Our purpose</h2>
            <div className="relative flex w-full items-center">
              <section className="relative flex-1 rounded-[12px] border border-[#e2e8f0] bg-gradient-to-br from-[#f0f9ff] to-[#f8fafc] py-[10px] pr-[130px] pl-7 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <p className="text-[0.95rem] leading-[1.618] text-[#475569]">
                  To bring practical business tools into one secure and efficient portal.
                </p>
              </section>
              <figure className="absolute right-[-50px] z-[2] h-auto w-[280px] flex-shrink-0" aria-hidden="true">
                <img
                  src="/image/Gemini_Generated_Image_j9d8eyj9d8eyj9d8-removebg-preview.png"
                  alt="Business tools portal concept illustration"
                  className="drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)] block h-full w-full"
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

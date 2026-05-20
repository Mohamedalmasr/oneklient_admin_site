import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-[#1e293b] px-6 py-6 flex-shrink-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6">
          <Link
            href="/privacy"
            className="text-[#94a3b8] text-xs font-normal no-underline underline underline-offset-[3px] transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
          <span className="text-[#94a3b8] text-xs font-normal">Terms of Service</span>
        </div>
        <div className="text-[#64748b] text-xs font-normal">
          &copy; 2026 ONEklient Solutions Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

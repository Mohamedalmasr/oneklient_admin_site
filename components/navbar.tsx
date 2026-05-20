import Link from "next/link";

interface NavbarProps {
  currentPage?: "home" | "about" | "contact" | "privacy";
}

export default function Navbar({ currentPage = "home" }: NavbarProps) {
  const isHome    = currentPage === "home";
  const isAbout   = currentPage === "about";
  const isContact = currentPage === "contact";
  const isPrivacy = currentPage === "privacy";

  const activeStyle: React.CSSProperties = {
    position: "absolute",
    bottom: -6,
    left: 0,
    right: 0,
    height: 2,
    background: "#2563eb",
    borderRadius: 2,
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1f5f9] bg-white px-6 py-4 sm:px-8 sm:py-5">
      <div className="flex items-center gap-5">
        <img
          src="/image/signal-٢٠٢٦-٠٥-١٩-٠٠٠٩١٤.png"
          alt="ONEklient"
          className="h-12 w-auto flex-shrink-0 object-contain sm:h-[50px]"
        />
      </div>

      <nav className="flex flex-col items-end gap-[2px]" aria-label="Main navigation">
        <Link
          href="/privacy"
          className={`text-[13px] transition-colors ${
            isPrivacy ? "text-[#2563eb] font-medium" : "text-[#94a3b8] hover:text-[#2563eb]"
          }`}
        >
          Privacy Policy
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`relative whitespace-nowrap text-[14px] font-medium no-underline transition-colors ${
              isHome ? "text-[#0f172a]" : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            Home
            {isHome && <span style={activeStyle} />}
          </Link>
          <Link
            href="/about"
            className={`relative whitespace-nowrap text-[14px] font-medium no-underline transition-colors ${
              isAbout ? "text-[#0f172a]" : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            About us
            {isAbout && <span style={activeStyle} />}
          </Link>
          <Link
            href="/contact"
            className={`relative whitespace-nowrap text-[14px] font-medium no-underline transition-colors ${
              isContact ? "text-[#0f172a]" : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            Contact us
            {isContact && <span style={activeStyle} />}
          </Link>
        </div>
      </nav>
    </header>
  );
}

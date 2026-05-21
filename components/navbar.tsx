"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogIn, FilePlus, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage?: "home" | "about" | "contact" | "privacy";
}

export default function Navbar({ currentPage = "home" }: NavbarProps) {
  const isHome    = currentPage === "home";
  const isAbout   = currentPage === "about";
  const isContact = currentPage === "contact";
  const isPrivacy = currentPage === "privacy";

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const activeStyle: React.CSSProperties = {
    position: "absolute",
    bottom: -6,
    left: 0,
    right: 0,
    height: 2,
    background: "#2563eb",
    borderRadius: 2,
  };

  const NavLink = ({ href, label, active }: { href: string; label: string; active: boolean }) => (
    <Link
      href={href}
      onClick={() => setMobileOpen(false)}
      className={`relative block whitespace-nowrap text-[15px] font-medium no-underline transition-colors py-2 ${
        active ? "text-[#2563eb]" : "text-[#475569] hover:text-[#0f172a]"
      }`}
    >
      {label}
      {active && <span style={activeStyle} />}
    </Link>
  );

  return (
    <header className="isolate flex flex-wrap items-center justify-between gap-4 border-b border-[#f1f5f9] bg-white px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
      <div className="flex items-center gap-4">
        <img
          src="/image/signal-2026-05-19-000914.png"
          alt="ONEklient"
          className="h-10 w-auto flex-shrink-0 object-contain sm:h-[50px]"
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-6">
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
              isHome ? "text-[#2563eb]" : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            Home
            {isHome && <span style={activeStyle} />}
          </Link>
            <Link
              href="/about"
              className={`relative whitespace-nowrap text-[14px] font-medium no-underline transition-colors ${
                isAbout ? "text-[#2563eb]" : "text-[#475569] hover:text-[#0f172a]"
              }`}
            >
              About us
              {isAbout && <span style={activeStyle} />}
            </Link>
            <Link
              href="/contact"
              className={`relative whitespace-nowrap text-[14px] font-medium no-underline transition-colors ${
                isContact ? "text-[#2563eb]" : "text-[#475569] hover:text-[#0f172a]"
              }`}
            >
              Contact us
              {isContact && <span style={activeStyle} />}
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#1e3a5f] px-3 py-1 text-[11px] font-medium text-[#1e3a5f] no-underline transition-colors hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
          >
            <LogIn className="h-3 w-3" />
            Client Sign In
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#14b8a6] px-3 py-1 text-[11px] font-medium text-white no-underline transition-colors hover:bg-[#0d9488]"
          >
            <FilePlus className="h-3 w-3" />
            Register New Application
          </a>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <button
        type="button"
        className="sm:hidden inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#475569] transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a]"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu + Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 sm:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="sm:hidden fixed left-0 right-0 z-50 bg-white px-5 pb-6 pt-4 shadow-xl border-t border-[#f1f5f9]"
            style={{ top: "57px", maxHeight: "calc(100vh - 57px)", overflowY: "auto" }}
          >
            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
              <Link
                href="/privacy"
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                  isPrivacy ? "bg-[#f0f9ff] text-[#2563eb]" : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                }`}
              >
                Privacy Policy
              </Link>
              <NavLink href="/" label="Home" active={isHome} />
              <NavLink href="/about" label="About us" active={isAbout} />
              <NavLink href="/contact" label="Contact us" active={isContact} />
            </nav>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1e3a5f] px-5 py-2.5 text-[13px] font-medium text-[#1e3a5f] no-underline transition-colors hover:bg-[#2563eb] hover:text-white"
              >
                <LogIn className="h-4 w-4" />
                Client Sign In
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#14b8a6] px-5 py-2.5 text-[13px] font-medium text-white no-underline transition-colors hover:bg-[#0d9488]"
              >
                <FilePlus className="h-4 w-4" />
                Register New Application
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
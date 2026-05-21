"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", key: "home" },
  { href: "/about", label: "About us", key: "about" },
  { href: "/contact", label: "Contact us", key: "contact" },
  { href: "/privacy", label: "Privacy Policy", key: "privacy" },
  { href: "/administration", label: "Administration", key: "administration" },
] as const;

const allKeys = navLinks.map((l) => l.key) as readonly string[];

interface NavbarProps {
  currentPage?: "home" | "about" | "contact" | "privacy" | "administration";
}

export default function Navbar({ currentPage = "home" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (key: string) => currentPage === key;

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
    <header className="isolate flex flex-wrap items-center justify-between gap-3 sm:gap-6 border-b border-[#f1f5f9] bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-4 no-underline">
        <img
          src="/image/signal-2026-05-19-000914.png"
          alt="ONEklient"
          className="h-10 w-auto flex-shrink-0 object-contain sm:h-[50px]"
        />
      </Link>

      {/* Desktop Nav — single row */}
      <div className="hidden sm:flex items-center gap-5 lg:gap-6">
        {navLinks.map(({ href, label, key }) => (
          <Link
            key={key}
            href={href}
            className={`relative whitespace-nowrap text-[14px] font-medium no-underline transition-colors ${
              isActive(key)
                ? "text-[#2563eb]"
                : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            {label}
            {isActive(key) && <span style={activeStyle} />}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        type="button"
        className="sm:hidden inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#475569] transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a] ml-auto"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <>
          <div
            className="sm:hidden fixed inset-0 z-40 bg-black/20"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="sm:hidden fixed left-0 right-0 z-50 bg-white px-5 pb-6 pt-4 shadow-xl border-t border-[#f1f5f9]"
            style={{
              top: "57px",
              maxHeight: "calc(100vh - 57px)",
              overflowY: "auto",
            }}
          >
            <nav
              className="flex flex-col gap-0.5"
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ href, label, key }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium no-underline transition-colors ${
                    isActive(key)
                      ? "bg-[#f0f9ff] text-[#2563eb]"
                      : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

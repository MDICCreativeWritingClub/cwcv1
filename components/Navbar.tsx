"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenLine, Menu, X, Settings } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Literary Hub", to: "/hub" },
  { label: "Help Desk", to: "/submit" },
  { label: "Archive", to: "/archive" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(to: string) {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  }

  return (
    <nav style={{ backgroundColor: "#000000" }} className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setMenuOpen(false)}>
          <PenLine size={20} style={{ color: "#4ade80" }} />
          <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>
            Manarat <span style={{ color: "#4ade80" }}>CWC</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              style={{
                color: isActive(link.to) ? "#ffffff" : "#bbf7d0",
                fontSize: "0.85rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "9999px",
                backgroundColor: isActive(link.to) ? "#166534" : "transparent",
                fontWeight: isActive(link.to) ? 500 : 400,
              }}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/review"
            title="Review Panel — Editors only"
            style={{
              color: isActive("/review") ? "#ffffff" : "#4b7a5e",
              padding: "0.35rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
            }}
            className="hover:text-white transition-colors"
          >
            <Settings size={16} />
          </Link>
          <Link
            href="/submit"
            style={{ backgroundColor: "#16a34a", color: "#ffffff", fontSize: "0.8rem" }}
            className="px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Submit Work
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ backgroundColor: "#166534" }} className="md:hidden px-5 pb-5 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              style={{
                color: isActive(link.to) ? "#ffffff" : "#bbf7d0",
                fontSize: "0.9rem",
                padding: "0.5rem 0",
                fontWeight: isActive(link.to) ? 600 : 400,
                borderBottom: "1px solid #14532d",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/review"
            style={{ color: "#4b7a5e", fontSize: "0.85rem", padding: "0.5rem 0" }}
            onClick={() => setMenuOpen(false)}
          >
            Review Panel (Editors)
          </Link>
          <Link
            href="/submit"
            style={{ backgroundColor: "#16a34a", color: "#ffffff", fontSize: "0.875rem" }}
            className="self-start mt-1 px-5 py-2 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            Submit Work
          </Link>
        </div>
      )}
    </nav>
  );
}

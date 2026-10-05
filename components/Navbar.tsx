"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/apply", label: "Apply" },
    { href: "/instructions", label: "Instructions" },
    { href: "/contact", label: "Contact Us" },
    { href: "/students", label: "Students" },
    { href: "/about", label: "About" },
    { href: "/user", label: "User" },
    { href: "/admin", label: "Admin" },
    { href: "/forms", label: "Forms" },
    { href: "/pictures", label: "Pictures" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e7ded5] bg-[#faf8f5]/95 backdrop-blur">
      <div className="mx-auto max-w-3/4 px-6 lg:px-8">

        <div className="flex h-20 items-center justify-between">

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-[#795548] text-lg font-bold text-white shadow-sm">
              UOVT
            </div>

            <div className="leading-tight">
              <div className="text-lg font-bold tracking-tight text-[#4e342e]">
                Nipunatha Sisu Saviya
              </div>

              <div className="hidden text-xs text-[#8d8178] sm:block">
                University of Vocational Technology
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
         <div className="hidden items-center gap-7 lg:flex">
           {links.map((link) => (
              <NavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                    >
                {link.label}
              </NavLink>
              ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-[#5d4037] transition hover:bg-[#eee7e1] lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="border-t border-[#e7ded5] py-4 lg:hidden">
         <div className="flex flex-col gap-1">
            {links.map((link) => (
              <MobileNavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                  onClick={() => setMenuOpen(false)}
                >
                {link.label}
              </MobileNavLink>
  ))}
</div>
          </div>
        )}

      </div>
    </nav>
  );
}


/* ================= DESKTOP LINK ================= */

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        text-sm
        font-medium
        transition
        duration-200
        ${
          active
            ? "font-semibold text-[#795548] underline underline-offset-4 decoration-[#795548]"
            : "text-[#6d5a50] hover:text-[#795548]"
        }
      `}
    >
      {children}
    </Link>
  );
}


/* ================= MOBILE LINK ================= */

function MobileNavLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        rounded-lg
        px-4
        py-3
        text-sm
        font-medium
        transition
        duration-200
        ${
          active
            ? "bg-[#eee7e1] font-semibold text-[#5d4037]"
            : "text-[#6d5a50] hover:bg-[#eee7e1] hover:text-[#5d4037]"
        }
      `}
    >
      {children}
    </Link>
  );
}
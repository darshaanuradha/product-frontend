
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#5a4037] bg-[#3e2b26] text-[#f5eee9]">

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="grid gap-10 md:grid-cols-4">

          {/* ================= BRAND ================= */}

          <div className="md:col-span-2">

            <Link href="/" className="inline-flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8d6e63] text-xl font-bold text-white">
                U
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  UOVT
                </h2>

                <p className="text-xs text-[#cdbfb8]">
                  University of Vocational Technology
                </p>
              </div>

            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-[#cdbfb8]">
              Nipunatha Sisu Saviya — connecting students with
              opportunities, information, and services at UOVT.
            </p>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  href="/"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/apply"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Apply
                </Link>
              </li>

              <li>
                <Link
                  href="/instructions"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Instructions
                </Link>
              </li>

              <li>
                <Link
                  href="/students"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Students
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= INFORMATION ================= */}

          <div>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Information
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  href="/about"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  About UOVT
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-[#cdbfb8] transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}

        <div className="mt-10 flex flex-col gap-4 border-t border-[#5a4037] pt-6 sm:flex-row sm:items-center sm:justify-between">

         <p className="text-xs text-[#b9aaa2]">
               © {new Date().getFullYear()} University of Vocational Technology. All rights reserved.
          </p>

          <p className="text-xs text-[#b9aaa2]">
            Nipunatha Sisu Saviya
          </p>

        </div>

      </div>

    </footer>
  );
}


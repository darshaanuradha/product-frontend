
import Link from "next/link";

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export function BackButton({
  href = "/",
  children = "Back to Home",
  className = "",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-md bg-[#795548] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5d4037] ${className}`}
    >
      {children}
    </Link>
  );
}
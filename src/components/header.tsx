"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo-s.svg"
            alt="Logo"
            width={100}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Avatar */}
        <div className="flex items-center space-x-4">
          <Image
            src="/profile.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border border-gray-300 shadow-sm cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
}

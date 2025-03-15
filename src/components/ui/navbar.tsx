import React from "react";
import Link from "next/link";

// Template if Needed (Just For Visuals)

export const Header = () => {
  return (
    <header
      className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10"
      style={{ backgroundColor: "rgb(var(--background))" }}
    >
      <div className="flex items-center gap-2">
        <div>
          <img src="/logo.png" alt="Logo" width={20} height={20} />
        </div>
        <span
          className="text-xl font-semibold"
          style={{ color: "rgb(var(--foreground))" }}
        >
          Cryptarity
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="#"
          className="transition-colors"
          style={{
            color: "rgb(var(--foreground))",
            hover: { color: "rgb(var(--foreground))" },
          }}
        >
          How It Works
        </Link>
        <Link
          href="#"
          className="transition-colors"
          style={{
            color: "rgb(var(--foreground))",
            hover: { color: "rgb(var(--foreground))" },
          }}
        >
          Charities
        </Link>
        <Link
          href="#"
          className="transition-colors"
          style={{
            color: "rgb(var(--foreground))",
            hover: { color: "rgb(var(--foreground))" },
          }}
        >
          Impact Reports
        </Link>
        <Link
          href="#"
          className="transition-colors"
          style={{
            color: "rgb(var(--foreground))",
            hover: { color: "rgb(var(--foreground))" },
          }}
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="transition-colors"
          style={{ color: "rgb(var(--foreground))" }}
        >
          Connect Wallet
        </Link>
        <Link
          href="#"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-colors px-4 py-2 rounded-lg"
          style={{ color: "rgb(var(--foreground))" }}
        >
          Donate Now
        </Link>
      </div>
    </header>
  );
};

export default Header;

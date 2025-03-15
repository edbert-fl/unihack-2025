import React from "react";
import Link from "next/link";

// Template if Needed (Just For Visuals)

export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-2">
        <Link href="/">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-black rounded-lg flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="25,5 45,45 5,45"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
          </div>
        </Link>
        <Link href="/" className="text-xl font-semibold text-white">
          CryptoImpact
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/about"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          About
        </Link>
        <Link
          href="/"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          Charities
        </Link>
        <Link
          href="/donate"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          Donate
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/wallet"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          Connect Wallet
        </Link>
        <Link
          href="/donate"
          className="bg-black hover:bg-sky-900 border border-sky-500 hover:border-sky-400 transition-colors px-4 py-2 rounded-lg text-white"
        >
          Donate Now
        </Link>
      </div>
    </header>
  );
};

export default Header;

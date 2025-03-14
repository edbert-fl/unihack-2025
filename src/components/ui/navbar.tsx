import React from "react";
import Link from "next/link";

// Template if Needed (Just For Visuals)

export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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
        <span className="text-xl font-semibold text-white">CryptoImpact</span>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          How It Works
        </Link>
        <Link
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Charities
        </Link>
        <Link
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Impact Reports
        </Link>
        <Link
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Connect Wallet
        </Link>
        <Link
          href="#"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-colors px-4 py-2 rounded-lg text-white"
        >
          Donate Now
        </Link>
      </div>
    </header>
  );
};

export default Header;

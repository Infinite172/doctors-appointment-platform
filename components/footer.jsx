import React from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-4">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main row: logo left, links center, social right */}
        <div className="flex flex-col md:flex-row items-center md:justify-between md:items-center gap-8 md:gap-0">
          {/* Left: Logo */}
          <div className="text-emerald-400 font-bold text-2xl whitespace-nowrap">
            eWakil
          </div>

          {/* Center: Quick Links */}
          <nav className="flex flex-wrap justify-center gap-8 text-emerald-300 font-medium flex-1 md:flex-none md:mx-8">
            <Link href="/" className="hover:text-emerald-400 transition">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition">
              Pricing
            </Link>
            <Link href="#feature" className="hover:text-emerald-400 transition">
              Features
            </Link>
            <Link href="#contact" className="hover:text-emerald-400 transition hidden lg:inline">
              Contact Us
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition">
              Terms &amp; Conditions
            </Link>
          </nav>

          {/* Right: Social Icons */}
          <div className="flex space-x-6 text-emerald-400">
            <a
              href="https://twitter.com/ewakil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-emerald-700 transition"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com/ewakil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-emerald-700 transition"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/ewakil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-emerald-700 transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/company/ewakil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-emerald-700 transition"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/ewakil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-emerald-700 transition"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-700/40 mt-8"></div>

        {/* Bottom: Copyright */}
        <p className="text-emerald-300 text-center text-sm mt-4">
          &copy; {new Date().getFullYear()} eWakil. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

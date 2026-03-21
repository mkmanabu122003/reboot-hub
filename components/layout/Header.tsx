'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME, CATEGORIES } from '@/lib/constants';
import Navigation from './Navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-content mx-auto px-5 flex items-center justify-between h-[56px]">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.webp" alt={SITE_NAME} width={160} height={40} className="h-8 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {Object.entries(CATEGORIES).slice(0, 4).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/${slug}/`}
              className={`text-[13px] hover:text-primary transition-colors ${
                pathname?.startsWith(`/${slug}`)
                  ? 'text-primary font-bold'
                  : 'text-text-muted'
              }`}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about/"
            className={`text-[13px] hover:text-primary transition-colors ${
              pathname === '/about' ? 'text-primary font-bold' : 'text-text-muted'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6 text-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Sheet */}
      {isMenuOpen && (
        <Navigation onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;

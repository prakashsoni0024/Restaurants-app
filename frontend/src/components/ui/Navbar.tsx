"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const smoothEase = [0.22, 1, 0.36, 1];

const desktopLinks = [
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

const mobileLinksVariants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: smoothEase,
      }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <nav className="border-b border-[#d8c1c3]/40 bg-[#fff9ef]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[88px] max-w-[1280px] items-center justify-between px-5 md:px-16">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-3xl font-semibold tracking-tight text-[#3f0917]"
          >
            Verandah
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-9 md:flex">
            {desktopLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block"
          >
            <Link
              href="/menu"
              className="block bg-[#5a1f2b] px-6 py-3 text-sm font-medium tracking-[0.05em] text-white transition-colors duration-200 hover:bg-[#3f0917]"
            >
              VIEW MENU
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center text-[#3f0917] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenu}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenu ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden border-t border-[#d8c1c3]/40 bg-[#fff9ef] md:hidden"
            >
              <motion.div
                className="flex flex-col gap-5 px-5 py-6"
                initial="hidden"
                animate="visible"
                transition={{
                  staggerChildren: 0.06,
                  delayChildren: 0.08,
                }}
              >
                {desktopLinks.map((link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </MobileLink>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  variants={mobileLinksVariants}
                  className="mt-2"
                >
                  <Link
                    href="/menu"
                    onClick={closeMobileMenu}
                    className="block w-full bg-[#5a1f2b] px-6 py-4 text-center text-sm font-medium tracking-[0.05em] text-white transition-colors duration-200 hover:bg-[#3f0917]"
                  >
                    VIEW MENU
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-xs font-semibold uppercase tracking-[0.15em] text-[#534344] transition-colors duration-200 hover:text-[#3f0917]"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.div variants={mobileLinksVariants}>
      <Link
        href={href}
        onClick={onClick}
        className="block border-b border-[#d8c1c3]/50 pb-4 text-sm font-medium uppercase tracking-[0.12em] text-[#3f0917]"
      >
        {children}
      </Link>
    </motion.div>
  );
}
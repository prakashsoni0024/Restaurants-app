"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1];

const footerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const footerItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

export default function Footer() {
  return (
    <footer className="border-t border-[#d8c1c3]/50 bg-[#f3ede4] px-5 py-16 md:px-16 md:py-20">
      <motion.div
        variants={footerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-4"
      >
        {/* Brand */}
        <motion.div variants={footerItem}>
          <Link
            href="/"
            className="font-serif text-3xl font-semibold text-[#3f0917]"
          >
            Verandah
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-6 text-[#534344]">
            Contemporary Indian dining built around flavour, comfort and
            good company.
          </p>

          <p className="mt-6 text-xs text-[#857374]">
            © 2026 Verandah. All Rights Reserved.
          </p>
        </motion.div>

        {/* Explore */}
        <FooterColumn
          title="EXPLORE"
          links={[
            ["About", "/about"],
            ["Menu", "/menu"],
          ]}
        />

        {/* Visit */}
        <FooterColumn
          title="VISIT"
          links={[
            ["Gallery", "/gallery"],
            ["Contact", "/contact"],
          ]}
        />

        {/* Legal */}
        <FooterColumn
          title="LEGAL"
          links={[
            ["Privacy Policy", "/privacy"],
            ["Terms of Service", "/terms"],
          ]}
        />
      </motion.div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <motion.div variants={footerItem}>
      <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#857374]">
        {title}
      </p>

      <div className="flex flex-col gap-4">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="w-fit text-sm text-[#534344] transition-colors duration-200 hover:text-[#3f0917]"
          >
            {label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
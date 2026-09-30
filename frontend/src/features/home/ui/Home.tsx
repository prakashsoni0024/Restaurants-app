"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useAnimation from "../hooks/useAnimation";

const { smoothEase, fadeUp, heroContainer, heroItem, imageReveal } =
  useAnimation();

/* =========================================================
   DATA
========================================================= */

const unsplash = (id: string, width: number, quality = 85) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

const IMAGES = {
  hero: unsplash("1517248135467-4c7edcad34c4", 2200, 90),
  ambience: unsplash("1559339352-11d035aa65de", 1400),
};

const DISHES = [
  {
    name: "Slow-cooked Lamb Shank",
    price: "₹899",
    description:
      "Tender lamb shank slow-cooked in aromatic spices, served over fragrant saffron rice with a vibrant pomegranate garnish.",
    image: unsplash("1544025162-d76694265947", 1400),
    className: "md:col-span-7",
    aspect: "aspect-[4/3]",
  },
  {
    name: "Signature Chaat",
    price: "₹449",
    description:
      "Crispy puris filled with spiced potatoes and chickpeas, finished with tangy tamarind chutney and sweet yogurt.",
    image: unsplash("1601050690597-df0568f70950", 1000),
    className: "md:col-span-4 md:col-start-9 md:mt-32",
    aspect: "aspect-square",
  },
];

const GALLERY = [
  { src: unsplash("1515003197210-e0cd71810b5f", 1000), alt: "Restaurant interior" },
  { src: unsplash("1547592180-85f173990554", 1000), alt: "Indian food" },
  { src: unsplash("1517248135467-4c7edcad34c4", 1000), alt: "Restaurant dining" },
  { src: unsplash("1552566626-52f8b828add9", 1000), alt: "Restaurant atmosphere" },
];

const ADDRESS = ["Your Restaurant Address", "Jabalpur, Madhya Pradesh"];

const HOURS = [
  "Mon - Thu: 12pm - 10pm",
  "Fri - Sat: 12pm - 11pm",
  "Sun: 12pm - 9pm",
];

/* =========================================================
   SHARED STYLES & SETTINGS
========================================================= */

const VIEWPORT = { once: true, amount: 0.15 };
const SECTION_SPACING = "py-24 md:py-[120px]";
const HOVER_ZOOM = { scale: 1.04 };
const HOVER_ZOOM_TRANSITION = { duration: 0.8, ease: smoothEase };

const linkBase =
  "text-xs font-semibold uppercase tracking-[0.15em] text-[#3f0917]";

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9ef] text-[#1d1b16]">
      <Hero />
      <Intro />
      <Food />
      <Ambience />
      <Gallery />
      <Visit />
    </main>
  );
}

/* =========================================================
   SECTIONS
========================================================= */

function Hero() {
  return (
    <section className="relative flex min-h-[760px] items-center justify-center overflow-hidden pt-[88px] md:min-h-[900px]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: smoothEase }}
          src={IMAGES.hero}
          alt="Warm contemporary restaurant interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-[1280px] px-5 text-center text-white md:px-16"
      >
        <motion.p
          variants={heroItem}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          Contemporary Indian Kitchen
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="mx-auto max-w-5xl font-serif text-[42px] font-bold leading-[1.15] tracking-tight md:text-[72px]"
        >
          Good Food.
          <br />
          Warm Moments.
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg"
        >
          A contemporary dining experience crafted around flavour, comfort and
          good company.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <HeroButton
            href="/menu"
            className="bg-[#5a1f2b] text-white hover:bg-[#3f0917]"
          >
            EXPLORE MENU
          </HeroButton>

          <HeroButton
            href="/about"
            className="border border-white text-white hover:bg-white hover:text-[#3f0917]"
          >
            OUR STORY
          </HeroButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <Reveal
      as="section"
      className={`mx-auto max-w-[1280px] px-5 md:px-16 ${SECTION_SPACING}`}
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7 md:pr-12">
          <Eyebrow className="mb-5">Our philosophy</Eyebrow>
          <h2 className="font-serif text-[40px] font-bold leading-[1.2] text-[#3f0917] md:text-[58px]">
            A place to eat,
            <br />
            gather, and stay awhile.
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:col-span-5">
          <p className="text-base leading-7 text-[#534344] md:text-lg">
            At Verandah, we believe that the best moments are shared over a
            great meal. We've curated a space that feels like home, yet
            elevates the everyday with meticulously crafted dishes and an
            atmosphere designed for lingering conversations.
          </p>
          <ArrowLink href="/about">Our Story</ArrowLink>
        </div>
      </div>
    </Reveal>
  );
}

function Food() {
  return (
    <section className={`bg-[#f9f3ea] ${SECTION_SPACING}`}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <Reveal className="mb-14 flex items-end justify-between md:mb-16">
          <div>
            <Eyebrow className="mb-3">The menu</Eyebrow>
            <h2 className="font-serif text-4xl font-semibold text-[#3f0917] md:text-[42px]">
              From Our Kitchen
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden border-b border-[#d8c1c3] pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#534344] transition-colors duration-300 hover:text-[#3f0917] md:block"
          >
            View full menu →
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-6">
          {DISHES.map((dish, index) => (
            <DishCard key={dish.name} dish={dish} index={index} />
          ))}
        </div>

        <Link
          href="/menu"
          className={`mt-12 inline-block border-b border-[#3f0917] pb-1 md:hidden ${linkBase}`}
        >
          View full menu →
        </Link>
      </div>
    </section>
  );
}

function Ambience() {
  return (
    <section
      className={`mx-auto max-w-[1280px] px-5 md:px-16 ${SECTION_SPACING}`}
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-6">
        <Reveal variants={imageReveal} className="overflow-hidden">
          <HoverImage
            src={IMAGES.ambience}
            alt="Cozy restaurant dining space"
            className="h-[450px] md:h-[540px]"
          />
        </Reveal>

        <Reveal className="flex flex-col gap-6 md:pl-16">
          <Eyebrow>The experience</Eyebrow>
          <h2 className="font-serif text-[38px] font-semibold leading-[1.25] text-[#3f0917] md:text-[46px]">
            Relaxed hospitality and social dining.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#534344] md:text-lg">
            Whether you're stopping by for a quick coffee or lingering over a
            shared meal, our space is designed to foster connection, warmth,
            and comfort.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const [large, topLeft, topRight, bottom] = GALLERY;

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-16 md:pb-[120px]">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow className="mb-4">Moments</Eyebrow>
        <h2 className="font-serif text-[40px] font-semibold text-[#3f0917] md:text-[48px]">
          A Taste of Verandah
        </h2>
        <ArrowLink href="/gallery" className="mx-auto mt-6">
          View Gallery
        </ArrowLink>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Large image */}
        <Reveal
          variants={imageReveal}
          className="h-[500px] overflow-hidden md:col-span-5"
        >
          <HoverImage src={large.src} alt={large.alt} className="h-full" />
        </Reveal>

        {/* Right column */}
        <div className="grid h-[500px] grid-rows-2 gap-4 md:col-span-7">
          <div className="grid grid-cols-2 gap-4">
            <GalleryImage {...topLeft} delay={0.1} />
            <GalleryImage {...topRight} delay={0.18} />
          </div>
          <GalleryImage {...bottom} delay={0.25} />
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section
      className={`bg-[#5a1f2b] px-5 text-white md:px-16 ${SECTION_SPACING}`}
    >
      <Reveal className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <Eyebrow className="mb-5 !text-white/60">Visit us</Eyebrow>
          <h2 className="font-serif text-[48px] font-bold leading-[1.1] md:text-[64px]">
            Come by.
            <br />
            Stay awhile.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/80 md:text-lg">
            We are ready to welcome you for your next memorable meal.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:items-end md:text-right">
          <InfoBlock label="Location" className="text-base leading-7 md:text-lg">
            {ADDRESS.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </InfoBlock>

          <InfoBlock label="Hours" className="text-sm leading-7 text-white/80">
            {HOURS.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </InfoBlock>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

/** Small uppercase label above headings. */
function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] text-[#904c2e] ${className}`}
    >
      {children}
    </p>
  );
}

/** Fades its content in once it scrolls into view. */
function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "section";
}) {
  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </Component>
  );
}

/** Image that zooms slightly on hover. Parent should have `overflow-hidden`. */
function HoverImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <motion.img
      whileHover={HOVER_ZOOM}
      transition={HOVER_ZOOM_TRANSITION}
      src={src}
      alt={alt}
      className={`w-full object-cover ${className}`}
    />
  );
}

/** Underlined text link with a sliding arrow. */
function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex w-fit items-center gap-2 border-b border-[#3f0917] pb-1 ${linkBase} ${className}`}
    >
      {children}
      <ArrowRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

/** Hero call-to-action button with lift and press animation. */
function HeroButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: smoothEase }}
    >
      <Link
        href={href}
        className={`block px-8 py-4 text-sm font-medium tracking-[0.05em] transition-colors duration-300 ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function DishCard({
  dish,
  index,
}: {
  dish: (typeof DISHES)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay: index * 0.14, ease: smoothEase }}
      className={dish.className}
    >
      <div className={`overflow-hidden ${dish.aspect}`}>
        <HoverImage src={dish.image} alt={dish.name} className="h-full" />
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#3f0917]">
            {dish.name}
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#534344] md:text-base">
            {dish.description}
          </p>
        </div>

        <span className="shrink-0 text-sm text-[#534344]">{dish.price}</span>
      </div>
    </motion.article>
  );
}

function GalleryImage({
  src,
  alt,
  delay = 0,
}: {
  src: string;
  alt: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: smoothEase }}
      className="h-full overflow-hidden"
    >
      <HoverImage src={src} alt={alt} className="h-full" />
    </motion.div>
  );
}

function InfoBlock({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {label}
      </p>
      <p className={className}>{children}</p>
    </div>
  );
}
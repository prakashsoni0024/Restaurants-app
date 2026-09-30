"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useAnimation from "../hooks/useAnimation";

const { smoothEase, fadeUp, heroContainer, heroItem, imageReveal } =
  useAnimation();

/* =========================================================
   DATA  (placeholder copy, replace with your own story)
========================================================= */

const unsplash = (id: string, width: number, quality = 85) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

const IMAGES = {
  hero: unsplash("1555396273-367ea4eb4db5", 2200, 90),
  story: unsplash("1414235077428-338989a2e8c0", 1400),
  room: unsplash("1559339352-11d035aa65de", 1400),
  detail: unsplash("1517248135467-4c7edcad34c4", 1000),
};

const KITCHEN = [
  {
    title: "Verandah Smoke House",
    text: "Paneer, mushroom and broccoli tikkas and soft kebabs, marinated overnight and finished in the tandoor.",
  },
  {
    title: "Gravies and dal",
    text: "Slow-cooked paneer gravies, kofta, kaju curries and dal makhni simmered until the flavours settle.",
  },
  {
    title: "Verandah Goes Oriental",
    text: "Indo-Chinese favourites like paneer 65, crispy chilli baby corn and hot, saucy noodles.",
  },
  {
    title: "Sizzlers, pizza and pasta",
    text: "Sizzling plates and oven-fresh pizzas for the table that wants something different.",
  },
];

const VALUES = [
  {
    title: "Cooked slowly",
    text: "Gravies are simmered, spices are balanced by hand and nothing is rushed to the table.",
  },
  {
    title: "Something for everyone",
    text: "From a quick masala tea to a full thali-style spread, there is room for every appetite at one table.",
  },
  {
    title: "Made for lingering",
    text: "Soft light, comfortable seats and an unhurried pace, so you can stay as long as the conversation lasts.",
  },
];

const ADDRESS = ["Your Restaurant Address", "Jabalpur, Madhya Pradesh"];

const HOURS = [
  "Mon - Thu: 12pm - 10pm",
  "Fri - Sat: 12pm - 11pm",
  "Sun: 12pm - 9pm",
];

/* =========================================================
   SHARED SETTINGS
========================================================= */

const VIEWPORT = { once: true, amount: 0.15 };
const SECTION_SPACING = "py-24 md:py-[120px]";

const linkBase =
  "text-xs font-semibold uppercase tracking-[0.15em] text-[#3f0917]";

/* =========================================================
   PAGE
========================================================= */

export default function About() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9ef] text-[#1d1b16]">
      <Hero />
      <Story />
      <Statement />
      <Kitchen />
      <Values />
      <Visit />
    </main>
  );
}

/* =========================================================
   SECTIONS
========================================================= */

function Hero() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden pt-[88px] md:min-h-[560px]">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: smoothEase }}
          src={IMAGES.hero}
          alt="Warmly lit Verandah dining room"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

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
          Our story
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="mx-auto max-w-4xl font-serif text-[40px] font-bold leading-[1.15] tracking-tight md:text-[64px]"
        >
          A table set for everyone.
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg"
        >
          Verandah began with a simple idea: a restaurant should feel like the
          best part of coming home.
        </motion.p>
      </motion.div>
    </section>
  );
}

function Story() {
  return (
    <section
      className={`mx-auto max-w-[1280px] px-5 md:px-16 ${SECTION_SPACING}`}
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6">
        <Reveal
          variants={imageReveal}
          className="h-[420px] overflow-hidden md:col-span-5 md:h-[580px]"
        >
          <HoverImage
            src={IMAGES.story}
            alt="A plated dish from the Verandah kitchen"
            className="h-full"
          />
        </Reveal>

        <Reveal className="flex flex-col gap-6 md:col-span-6 md:col-start-7">
          <Eyebrow>How we started</Eyebrow>

          <h2 className="font-serif text-[36px] font-semibold leading-[1.25] text-[#3f0917] md:text-[46px]">
            Familiar flavours, cooked with care.
          </h2>

          <p className="text-base leading-7 text-[#534344] md:text-lg">
            Our kitchen is built on the food people in central India grew up
            with: rich gravies, smoky tandoor starters, comforting dal and
            khichdi. We cook it the slow way and plate it with a lighter,
            contemporary hand.
          </p>

          <p className="text-base leading-7 text-[#534344] md:text-lg">
            The room is built the same way: soft light, comfortable seating and
            enough space between tables for real conversation. Come for a
            quick cup of tea or stay for the whole evening.
          </p>

          <ArrowLink href="/menu">Explore the menu</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className={`bg-[#f9f3ea] ${SECTION_SPACING}`}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7 md:pr-12">
            <p className="font-serif text-[30px] font-semibold leading-[1.35] text-[#3f0917] md:text-[40px]">
              The best moments are shared over a great meal, so we built a
              place made for sharing them.
            </p>
          </Reveal>

          <Reveal
            variants={imageReveal}
            className="h-[320px] overflow-hidden md:col-span-4 md:col-start-9 md:h-[400px]"
          >
            <HoverImage
              src={IMAGES.detail}
              alt="Verandah interior in the evening"
              className="h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Kitchen() {
  return (
    <section
      className={`mx-auto max-w-[1280px] px-5 md:px-16 ${SECTION_SPACING}`}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-4 md:pr-8">
          <div className="mb-3">
            <Eyebrow>Our kitchen</Eyebrow>
          </div>
          <h2 className="font-serif text-4xl font-semibold leading-[1.2] text-[#3f0917] md:text-[42px]">
            What we cook
          </h2>
          <p className="mt-5 text-base leading-7 text-[#534344]">
            Four kitchens under one roof, each with its own way of doing things.
          </p>
        </Reveal>

        <div className="md:col-span-8">
          {KITCHEN.map((area, index) => (
            <Reveal
              key={area.title}
              className={`grid gap-2 border-t border-[#d8c1c3] py-7 md:grid-cols-[1fr_1.4fr] md:gap-10 ${
                index === KITCHEN.length - 1 ? "border-b" : ""
              }`}
            >
              <h3 className="font-serif text-2xl font-semibold text-[#3f0917]">
                {area.title}
              </h3>
              <p className="text-base leading-7 text-[#534344]">{area.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-16 md:pb-[120px]">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-6">
        <Reveal
          variants={imageReveal}
          className="h-[400px] overflow-hidden md:h-[560px]"
        >
          <HoverImage
            src={IMAGES.room}
            alt="Cozy Verandah dining space"
            className="h-full"
          />
        </Reveal>

        <div className="flex flex-col gap-10 md:pl-16">
          <Reveal>
            <div className="mb-3">
              <Eyebrow>What we care about</Eyebrow>
            </div>
            <h2 className="font-serif text-[36px] font-semibold leading-[1.25] text-[#3f0917] md:text-[42px]">
              Three things we won't compromise on
            </h2>
          </Reveal>

          <div className="flex flex-col gap-8">
            {VALUES.map((value) => (
              <Reveal key={value.title} className="border-l-2 border-[#904c2e] pl-6">
                <h3 className="font-serif text-2xl font-semibold text-[#3f0917]">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-md text-base leading-7 text-[#534344]">
                  {value.text}
                </p>
              </Reveal>
            ))}
          </div>
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
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Visit us
          </p>
          <h2 className="font-serif text-[48px] font-bold leading-[1.1] md:text-[64px]">
            Come by.
            <br />
            Stay awhile.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/80 md:text-lg">
            We are ready to welcome you for your next memorable meal.
          </p>

          <Link
            href="/contact"
            className="group mt-8 flex w-fit items-center gap-3 border border-white px-8 py-4 text-sm font-medium tracking-[0.05em] text-white transition-colors duration-300 hover:bg-white hover:text-[#3f0917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            CONTACT US
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#904c2e]">
      {children}
    </p>
  );
}

/** Fades its content in once it scrolls into view. */
function Reveal({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
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
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full object-cover ${className}`}
    />
  );
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`group flex w-fit items-center gap-2 border-b border-[#3f0917] pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#904c2e] ${linkBase}`}
    >
      {children}
      <ArrowRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
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
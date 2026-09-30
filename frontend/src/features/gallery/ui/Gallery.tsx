"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import useAnimation from "../hooks/useAnimation";

const { smoothEase, fadeUp, heroContainer, heroItem } = useAnimation();

/* =========================================================
   DATA
========================================================= */

const unsplash = (id: string, width: number, quality = 85) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

type Category = "Food" | "Space";
type Filter = "All" | Category;

const FILTERS: Filter[] = ["All", "Food", "Space"];

const PHOTOS: {
  id: string;
  title: string;
  category: Category;
  aspect: string;
}[] = [
  { id: "1515003197210-e0cd71810b5f", title: "The main dining room", category: "Space", aspect: "aspect-[4/5]" },
  { id: "1544025162-d76694265947", title: "Slow-cooked lamb shank", category: "Food", aspect: "aspect-[4/3]" },
  { id: "1547592180-85f173990554", title: "Bowl of spiced curry", category: "Food", aspect: "aspect-square" },
  { id: "1517248135467-4c7edcad34c4", title: "Warm evening light", category: "Space", aspect: "aspect-[4/3]" },
  { id: "1601050690597-df0568f70950", title: "Signature chaat", category: "Food", aspect: "aspect-[4/5]" },
  { id: "1552566626-52f8b828add9", title: "Tables set for dinner", category: "Space", aspect: "aspect-square" },
  { id: "1414235077428-338989a2e8c0", title: "Plated at the pass", category: "Food", aspect: "aspect-[4/3]" },
  { id: "1559339352-11d035aa65de", title: "A corner to linger in", category: "Space", aspect: "aspect-[4/5]" },
  { id: "1555396273-367ea4eb4db5", title: "Inside Verandah", category: "Space", aspect: "aspect-[4/3]" },
];

const HERO_IMAGE = unsplash("1517248135467-4c7edcad34c4", 2200, 90);

/* =========================================================
   PAGE
========================================================= */

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const photos =
    filter === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9ef] text-[#1d1b16]">
      <Hero />

      {/* GRID */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-16 md:py-[100px]">
        <FilterBar
          filter={filter}
          count={photos.length}
          onChange={(next) => {
            setFilter(next);
            setActiveIndex(null);
          }}
        />

        <motion.div
          layout
          className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          <AnimatePresence mode="popLayout">
            {photos.map((photo, index) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                onOpen={() => setActiveIndex(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <VisitBanner />

      <Lightbox
        photos={photos}
        index={activeIndex}
        onChange={setActiveIndex}
      />
    </main>
  );
}

/* =========================================================
   SECTIONS
========================================================= */

function Hero() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden pt-[88px] md:min-h-[540px]">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: smoothEase }}
          src={HERO_IMAGE}
          alt="Verandah dining room"
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
          Gallery
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="font-serif text-[40px] font-bold leading-[1.15] tracking-tight md:text-[64px]"
        >
          A Taste of Verandah
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg"
        >
          The food we cook and the room we cook it for.
        </motion.p>
      </motion.div>
    </section>
  );
}

function FilterBar({
  filter,
  count,
  onChange,
}: {
  filter: Filter;
  count: number;
  onChange: (filter: Filter) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Pills: the active background slides between options */}
      <LayoutGroup>
        <div
          role="tablist"
          aria-label="Filter photos"
          className="inline-flex rounded-full border border-[#d8c1c3] bg-white/60 p-1 backdrop-blur"
        >
          {FILTERS.map((name) => {
            const isActive = filter === name;

            return (
              <button
                key={name}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(name)}
                className="relative rounded-full px-6 py-2.5 text-sm font-medium tracking-[0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#904c2e]"
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="absolute inset-0 rounded-full bg-[#5a1f2b]"
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#534344]"
                  }`}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <p className="text-sm text-[#534344]" aria-live="polite">
        {count} photos
      </p>
    </div>
  );
}

function PhotoTile({
  photo,
  onOpen,
}: {
  photo: (typeof PHOTOS)[number];
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: smoothEase }}
      onClick={onOpen}
      aria-label={`Open photo: ${photo.title}`}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#904c2e]"
    >
      <div className={`overflow-hidden ${photo.aspect}`}>
        <img
          src={unsplash(photo.id, 900)}
          alt={photo.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#3f0917]/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            {photo.category}
          </p>
          <p className="mt-1 font-serif text-lg text-white">{photo.title}</p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
          <Maximize2 size={16} />
        </span>
      </div>
    </motion.button>
  );
}

function VisitBanner() {
  return (
    <section className="bg-[#5a1f2b] px-5 py-24 text-white md:px-16 md:py-[120px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-10 md:flex-row md:items-center"
      >
        <h2 className="font-serif text-[40px] font-bold leading-[1.1] md:text-[56px]">
          Seen enough?
          <br />
          Come and taste it.
        </h2>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25, ease: smoothEase }}
        >
          <Link
            href="/contact"
            className="group flex items-center gap-3 border border-white px-8 py-4 text-sm font-medium tracking-[0.05em] text-white transition-colors duration-300 hover:bg-white hover:text-[#3f0917]"
          >
            VIEW MENU
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   LIGHTBOX
========================================================= */

function Lightbox({
  photos,
  index,
  onChange,
}: {
  photos: typeof PHOTOS;
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const isOpen = index !== null;

  const close = useCallback(() => onChange(null), [onChange]);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null) return;
      onChange((index + direction + photos.length) % photos.length);
    },
    [index, photos.length, onChange]
  );

  // Keyboard controls + lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col bg-[#1d1b16]/95 backdrop-blur-sm"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-white md:px-10">
            <p className="text-sm tabular-nums text-white/70">
              {index + 1} / {photos.length}
            </p>

            <IconButton label="Close" onClick={close} autoFocus>
              <X size={24} />
            </IconButton>
          </div>

          {/* Image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 md:px-24">
            <IconButton
              label="Previous photo"
              onClick={() => step(-1)}
              className="absolute left-2 md:left-8"
            >
              <ChevronLeft size={32} />
            </IconButton>

            <motion.img
              key={photo.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: smoothEase }}
              src={unsplash(photo.id, 1800)}
              alt={photo.title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full object-contain"
            />

            <IconButton
              label="Next photo"
              onClick={() => step(1)}
              className="absolute right-2 md:right-8"
            >
              <ChevronRight size={32} />
            </IconButton>
          </div>

          {/* Caption + thumbnails */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="px-5 pb-6 pt-4 text-center text-white md:px-10"
          >
            <p className="font-serif text-xl">{photo.title}</p>

            <div className="mt-4 flex justify-center gap-2 overflow-x-auto">
              {photos.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => onChange(i)}
                  aria-label={`Show ${item.title}`}
                  aria-current={i === index}
                  className={`h-14 w-14 shrink-0 overflow-hidden transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    i === index
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <img
                    src={unsplash(item.id, 160, 70)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconButton({
  label,
  onClick,
  children,
  className = "",
  autoFocus,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <button
      aria-label={label}
      autoFocus={autoFocus}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors duration-300 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${className}`}
    >
      {children}
    </button>
  );
}
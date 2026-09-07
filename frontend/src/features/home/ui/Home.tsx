"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

   /* =========================================================
   DATA
========================================================= */

    const dishes = [
        {
            name: "Slow-cooked Lamb Shank",
            price: "₹899",
            description:
                "Tender lamb shank slow-cooked in aromatic spices, served over fragrant saffron rice with a vibrant pomegranate garnish.",
            image:
                "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85",
            className: "md:col-span-7",
            aspect: "aspect-[4/3]",
        },
        {
            name: "Signature Chaat",
            price: "₹449",
            description:
                "Crispy puris filled with spiced potatoes and chickpeas, finished with tangy tamarind chutney and sweet yogurt.",
            image:
                "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
            className: "md:col-span-4 md:col-start-9 md:mt-32",
            aspect: "aspect-square",
        },
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
    ];

    /* =========================================================
       MOTION SETTINGS
    ========================================================= */

    const smoothEase = [0.22, 1, 0.36, 1];

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 24,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.9,
                ease: smoothEase,
            },
        },
    };

    const heroContainer = {
        hidden: {},

        visible: {
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.14,
            },
        },
    };

    const heroItem = {
        hidden: {
            opacity: 0,
            y: 20,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.9,
                ease: smoothEase,
            },
        },
    };

    const imageReveal = {
        hidden: {
            opacity: 0,
            scale: 0.985,
        },

        visible: {
            opacity: 1,
            scale: 1,

            transition: {
                duration: 1,
                ease: smoothEase,
            },
        },
    };

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9ef] text-[#1d1b16]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative flex min-h-[760px] items-center justify-center overflow-hidden pt-[88px] md:min-h-[900px]">
        {/* Background */}

        <div className="absolute inset-0">
          <motion.img
            initial={{
              scale: 1.06,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.8,
              ease: smoothEase,
            }}
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=90"
            alt="Warm contemporary restaurant interior"
            className="h-full w-full object-cover"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Hero Content */}

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-[1280px] px-5 text-center text-white md:px-16"
        >
          {/* Eyebrow */}

          <motion.p
            variants={heroItem}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
          >
            Contemporary Indian Kitchen
          </motion.p>

          {/* Heading */}

          <motion.h1
            variants={heroItem}
            className="mx-auto max-w-5xl font-serif text-[42px] font-bold leading-[1.15] tracking-tight md:text-[72px]"
          >
            Good Food.
            <br />
            Warm Moments.
          </motion.h1>

          {/* Description */}

          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg"
          >
            A contemporary dining experience crafted around flavour,
            comfort and good company.
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            {/* Menu Button */}

            <motion.div
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
                ease: smoothEase,
              }}
            >
              <Link
                href="/menu"
                className="block bg-[#5a1f2b] px-8 py-4 text-sm font-medium tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#3f0917]"
              >
                EXPLORE MENU
              </Link>
            </motion.div>

            {/* Story Button */}

            <motion.div
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
                ease: smoothEase,
              }}
            >
              <Link
                href="/about"
                className="block border border-white bg-transparent px-8 py-4 text-sm font-medium tracking-[0.05em] text-white transition-all duration-300 hover:bg-white hover:text-[#3f0917]"
              >
                OUR STORY
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="mx-auto max-w-[1280px] px-5 py-24 md:px-16 md:py-[120px]"
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6">
          {/* Left */}

          <div className="md:col-span-7 md:pr-12">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#904c2e]">
              OUR PHILOSOPHY
            </p>

            <h2 className="font-serif text-[40px] font-bold leading-[1.2] text-[#3f0917] md:text-[58px]">
              A place to eat,
              <br />
              gather, and stay awhile.
            </h2>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-6 md:col-span-5">
            <p className="text-base leading-7 text-[#534344] md:text-lg">
              At Verandah, we believe that the best moments are shared over
              a great meal. We've curated a space that feels like home, yet
              elevates the everyday with meticulously crafted dishes and an
              atmosphere designed for lingering conversations.
            </p>

            <Link
              href="/about"
              className="group flex w-fit items-center gap-2 border-b border-[#3f0917] pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3f0917]"
            >
              Our Story

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          FOOD
      ===================================================== */}

      <section className="bg-[#f9f3ea] py-24 md:py-[120px]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-16">
          {/* Heading */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mb-14 flex items-end justify-between md:mb-16"
          >
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#904c2e]">
                THE MENU
              </p>

              <h2 className="font-serif text-4xl font-semibold text-[#3f0917] md:text-[42px]">
                From Our Kitchen
              </h2>
            </div>

            <Link
              href="/menu"
              className="hidden border-b border-[#d8c1c3] pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#534344] transition-colors duration-300 hover:text-[#3f0917] md:block"
            >
              VIEW FULL MENU →
            </Link>
          </motion.div>

          {/* Dishes */}

          <div className="grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-6">
            {dishes.map((dish, index) => (
              <motion.article
                key={dish.name}
                initial={{
                  opacity: 0,
                  y: 32,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.14,
                  ease: smoothEase,
                }}
                className={dish.className}
              >
                <div className="group overflow-hidden">
                  {/* Image */}

                  <div className={`overflow-hidden ${dish.aspect}`}>
                    <motion.img
                      whileHover={{
                        scale: 1.04,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: smoothEase,
                      }}
                      src={dish.image}
                      alt={dish.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}

                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-[#3f0917]">
                        {dish.name}
                      </h3>

                      <p className="mt-2 max-w-lg text-sm leading-6 text-[#534344] md:text-base">
                        {dish.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm text-[#534344]">
                      {dish.price}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Mobile Menu Link */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: smoothEase,
            }}
            className="mt-12 md:hidden"
          >
            <Link
              href="/menu"
              className="border-b border-[#3f0917] pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3f0917]"
            >
              VIEW FULL MENU →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          AMBIENCE
      ===================================================== */}

      <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-16 md:py-[120px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-6">
          {/* Image */}

          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="group overflow-hidden"
          >
            <motion.img
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.8,
                ease: smoothEase,
              }}
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85"
              alt="Cozy restaurant dining space"
              className="h-[450px] w-full object-cover md:h-[540px]"
            />
          </motion.div>

          {/* Content */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="flex flex-col gap-6 md:pl-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#904c2e]">
              THE EXPERIENCE
            </p>

            <h2 className="font-serif text-[38px] font-semibold leading-[1.25] text-[#3f0917] md:text-[46px]">
              Relaxed hospitality and social dining.
            </h2>

            <p className="max-w-xl text-base leading-7 text-[#534344] md:text-lg">
              Whether you're stopping by for a quick coffee or lingering over
              a shared meal, our space is designed to foster connection,
              warmth, and comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-16 md:pb-[120px]">
        {/* Heading */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#904c2e]">
            MOMENTS
          </p>

          <h2 className="font-serif text-[40px] font-semibold text-[#3f0917] md:text-[48px]">
            A Taste of Verandah
          </h2>

          <Link
            href="/gallery"
            className="group mx-auto mt-6 flex w-fit items-center gap-2 border-b border-[#3f0917] pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3f0917]"
          >
            View Gallery

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Gallery Grid */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Large Image */}

          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="group h-[500px] overflow-hidden md:col-span-5"
          >
            <motion.img
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.8,
                ease: smoothEase,
              }}
              src={galleryImages[0]}
              alt="Restaurant interior"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Right Gallery */}

          <div className="grid h-[500px] grid-rows-2 gap-4 md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <GalleryImage
                src={galleryImages[1]}
                alt="Indian food"
                delay={0.1}
              />

              <GalleryImage
                src={galleryImages[2]}
                alt="Restaurant dining"
                delay={0.18}
              />
            </div>

            <GalleryImage
              src={galleryImages[3]}
              alt="Restaurant atmosphere"
              delay={0.25}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-[#5a1f2b] px-5 py-24 text-white md:px-16 md:py-[120px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-2"
        >
          {/* Left */}

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              VISIT US
            </p>

            <h2 className="font-serif text-[48px] font-bold leading-[1.1] md:text-[64px]">
              Come by.
              <br />
              Stay awhile.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-white/80 md:text-lg">
              We are ready to welcome you for your next memorable meal.
            </p>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-8 md:items-end md:text-right">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-white/50">
                LOCATION
              </p>

              <p className="text-base leading-7 md:text-lg">
                Your Restaurant Address
                <br />
                Jabalpur, Madhya Pradesh
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-white/50">
                HOURS
              </p>

              <p className="text-sm leading-7 text-white/80">
                Mon - Thu: 12pm - 10pm
                <br />
                Fri - Sat: 12pm - 11pm
                <br />
                Sun: 12pm - 9pm
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* =========================================================
   GALLERY IMAGE COMPONENT
========================================================= */

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
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: smoothEase,
      }}
      className="group h-full overflow-hidden"
    >
      <motion.img
        whileHover={{
          scale: 1.04,
        }}
        transition={{
          duration: 0.8,
          ease: smoothEase,
        }}
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}


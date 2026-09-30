"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import useAnimation from "../../../hooks/useAnimation";
const { smoothEase, fadeUp, heroContainer, heroItem } = useAnimation();

/* =========================================================
   DATA  (edit these once, the page updates everywhere)
========================================================= */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2200&q=90";

const CONTACT = {
  addressLines: ["Your Restaurant Address", "Jabalpur, Madhya Pradesh"],
  phone: "+91 00000 00000",
  email: "hello@verandah.example",
  hours: [
    { days: "Mon - Thu", time: "12pm - 10pm" },
    { days: "Fri - Sat", time: "12pm - 11pm" },
    { days: "Sun", time: "12pm - 9pm" },
  ],
  // Paste your Google Maps "Embed a map" URL here
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.989782861894!2d79.9243613!3d23.170572999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981afcb6c70a739%3A0x6a0020942a71e932!2sVerandah%20%22Brew%20House%20Kitchen%22!5e0!3m2!1sen!2sin!4v1790729262433!5m2!1sen!2sin",
};

const TOPICS = [
  "General enquiry",
  "Private event",
  "Feedback",
] as const;
type Topic = (typeof TOPICS)[number];

const INITIAL_VALUES = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "error";

/* =========================================================
   SHARED STYLES
========================================================= */

const fieldClass =
  "w-full border-0 border-b border-[#d8c1c3] bg-transparent py-3 text-base text-[#1d1b16] placeholder:text-[#534344]/60 transition-colors duration-300 focus:border-[#3f0917] focus:outline-none focus-visible:border-b-2";

const labelClass =
  "mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-[#534344]";

/* =========================================================
   PAGE
========================================================= */

export default function Contact() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9ef] text-[#1d1b16]">
      <Hero />

      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-16 md:py-[100px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
          <InfoColumn />
          <FormCard />
        </div>
      </section>

      <MapSection />
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
          alt="Cozy Verandah dining space"
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
          Contact
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="font-serif text-[40px] font-bold leading-[1.15] tracking-tight md:text-[64px]"
        >
          Get in touch.
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg"
        >
          Questions, private events or feedback all reach the same team.
        </motion.p>
      </motion.div>
    </section>
  );
}

function InfoColumn() {
  const phoneHref = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

  return (
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col gap-4 md:col-span-5 md:pr-10"
    >
      <h2 className="mb-4 font-serif text-4xl font-semibold text-[#3f0917] md:text-[42px]">
        Find us
      </h2>

      <InfoCard icon={<MapPin size={20} />} label="Address">
        <address className="not-italic">
          {CONTACT.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </InfoCard>

      <InfoCard icon={<Clock size={20} />} label="Opening hours">
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
          {CONTACT.hours.map(({ days, time }) => (
            <div key={days} className="contents">
              <dt>{days}</dt>
              <dd className="text-[#534344]">{time}</dd>
            </div>
          ))}
        </dl>
      </InfoCard>

      <InfoCard icon={<Phone size={20} />} label="Call">
        <a
          href={phoneHref}
          className="transition-colors duration-300 hover:text-[#904c2e]"
        >
          {CONTACT.phone}
        </a>
      </InfoCard>

      <InfoCard icon={<Mail size={20} />} label="Email">
        <a
          href={`mailto:${CONTACT.email}`}
          className="break-all transition-colors duration-300 hover:text-[#904c2e]"
        >
          {CONTACT.email}
        </a>
      </InfoCard>
    </motion.aside>
  );
}

function MapSection() {
  return (
    <section aria-label="Map" className="bg-[#f9f3ea]">
      <div className="h-[360px] w-full md:h-[460px]">
        {CONTACT.mapEmbedUrl ? (
          <iframe
            title="Verandah location map"
            src={CONTACT.mapEmbedUrl}
            loading="lazy"
            className="h-full w-full border-0"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center text-[#534344]">
            <MapPin size={28} className="text-[#904c2e]" />
            <p className="max-w-sm text-base leading-7">
              Add your Google Maps embed link to{" "}
              <code className="text-sm">CONTACT.mapEmbedUrl</code> to show your
              location here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   FORM
========================================================= */

function FormCard() {
  const [topic, setTopic] = useState<Topic>("General enquiry");
  const [values, setValues] = useState(INITIAL_VALUES);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // TODO: send to your backend (API route, Formspree, etc.)
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ topic, ...values }),
      // });
      // if (!res.ok) throw new Error("Request failed");
      await new Promise((resolve) => setTimeout(resolve, 900));

      setValues(INITIAL_VALUES);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="bg-white p-6 shadow-[0_24px_60px_-30px_rgba(63,9,23,0.35)] md:col-span-7 md:p-12"
    >
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <SuccessMessage key="sent" onReset={() => setStatus("idle")} />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="font-serif text-3xl font-semibold text-[#3f0917] md:text-[36px]">
                Send us a message
              </h2>
              <p className="mt-2 text-base leading-7 text-[#534344]">
                We reply by phone or email, usually within a day.
              </p>
            </div>

            <TopicPicker value={topic} onChange={setTopic} />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Field label="Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>

              <Field label="Phone" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label="Email (optional)" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                className={fieldClass}
              />
            </Field>

            <Field label="Message" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can we help?"
                value={values.message}
                onChange={handleChange}
                className={`${fieldClass} resize-none`}
              />
            </Field>

            {status === "error" && (
              <p role="alert" className="text-sm text-[#93000a]">
                Your message didn't send. Check your connection and try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#5a1f2b] px-8 py-4 text-sm font-medium tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#3f0917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#904c2e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
            >
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TopicPicker({
  value,
  onChange,
}: {
  value: Topic;
  onChange: (topic: Topic) => void;
}) {
  return (
    <LayoutGroup id="topic">
      <div role="radiogroup" aria-label="What is this about?" className="flex flex-wrap gap-2">
        {TOPICS.map((name) => {
          const isActive = value === name;

          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(name)}
              className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#904c2e] ${
                isActive
                  ? "border-transparent text-white"
                  : "border-[#d8c1c3] text-[#534344] hover:border-[#3f0917] hover:text-[#3f0917]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="topic-pill"
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="absolute inset-0 rounded-full bg-[#5a1f2b]"
                />
              )}
              <span className="relative z-10">{name}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: smoothEase }}
      className="flex min-h-[420px] flex-col items-start justify-center gap-5"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5a1f2b] text-white">
        <Check size={26} />
      </span>

      <h2 className="font-serif text-3xl font-semibold text-[#3f0917] md:text-[36px]">
        Message sent
      </h2>

      <p className="max-w-md text-base leading-7 text-[#534344]">
        Thank you for writing. We'll get back to you soon.
      </p>

      <button
        onClick={onReset}
        className="border-b border-[#3f0917] pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3f0917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#904c2e]"
      >
        Send another message
      </button>
    </motion.div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 border border-[#eadfd2] bg-[#f9f3ea] p-5 transition-colors duration-300 hover:border-[#d8c1c3]">
      <span className="mt-0.5 shrink-0 text-[#904c2e]">{icon}</span>

      <div className="min-w-0">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#534344]">
          {label}
        </p>
        <div className="text-base leading-7 text-[#1d1b16]">{children}</div>
      </div>
    </div>
  );
}
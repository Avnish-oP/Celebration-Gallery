"use client";

import React, { useState, useActionState, useEffect, startTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Check,
  Phone,
  PartyPopper,
  Palette,
  Gift,
  Lightbulb,
  User,
  Mail,
  MapPin,
  CalendarDays,
  MessageSquare,
  ChevronDown,
  Loader2,
  Star,
  Flag,
  IndianRupee,
  ClipboardList,
  Layers,
  Flower,
  CircleDot,
  Crown,
  Camera,
  Wind,
  Hash,
} from "lucide-react";
import { CustomPackageRequest } from "../../../types";
import { submitCustomPackageRequest } from "../../actions/custom-package";

function BalloonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a6 6 0 0 1 6 6c0 3.5-3 6.5-6 7.5-3-1-6-4-6-7.5a6 6 0 0 1 6-6Z" />
      <path d="m12 15.5-1 2-1-.5-.5.5.5.5.5-.5h2l.5.5.5-.5-.5-.5-1 .5-1-2" />
      <path d="M12 17.5c0 1.5-1 2.5-2 3.5" />
    </svg>
  );
}

/* ───────────────────────── constants ───────────────────────── */

const BALLOON_OPTIONS = [50, 100, 200, 300, 500];

const BANNER_OPTIONS = ["Happy Birthday", "Welcome", "Congratulations", "Custom"];

const DECORATION_TYPES = [
  { id: "curtains", label: "Curtains", icon: Layers },
  { id: "led-lights", label: "LED Lights", icon: Lightbulb },
  { id: "foil-balloons", label: "Foil Balloons", icon: BalloonIcon },
  { id: "flower-arrangements", label: "Flower Arrangements", icon: Flower },
  { id: "neon-signs", label: "Neon Signs", icon: Sparkles },
  { id: "ring-decoration", label: "Ring Decoration", icon: CircleDot },
];

const EXTRAS = [
  { id: "cake-stand", label: "Cake Stand", icon: Crown },
  { id: "photo-booth-props", label: "Photo Booth Props", icon: Camera },
  { id: "smoke-machine", label: "Smoke Machine", icon: Wind },
  { id: "confetti-cannons", label: "Confetti Cannons", icon: PartyPopper },
  { id: "fairy-lights", label: "Fairy Lights", icon: Lightbulb },
  { id: "number-foils", label: "Number Foils", icon: Hash },
];

const BUDGET_OPTIONS = [
  "Under ₹1,000",
  "₹1,000 – ₹3,000",
  "₹3,000 – ₹5,000",
  "₹5,000+",
];

const LOCATIONS = [
  "South Delhi",
  "Gurugram",
  "Noida",
  "Dwarka",
  "Vasant Kunj",
  "Chattarpur",
  "Other Delhi NCR",
];

/* ────────────── stagger animation helper ────────────── */
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] },
  }),
};

/* ────────────────── confetti particle ─────────────────── */
function ConfettiParticle({ index }: { index: number }) {
  const colors = ["#f53d6b", "#ffd600", "#ffb8d2", "#ff8a50", "#a855f7", "#22d3ee"];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.6;
  const size = 6 + Math.random() * 8;
  const rotate = Math.random() * 360;

  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 1, rotate }}
      animate={{
        y: [0, 400 + Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [1, 1, 0],
        rotate: rotate + 360 * (Math.random() > 0.5 ? 1 : -1),
      }}
      transition={{ duration: 2 + Math.random(), delay, ease: "easeOut" }}
      className="absolute pointer-events-none"
      style={{ left: `${left}%`, top: 0, width: size, height: size, backgroundColor: color, borderRadius: Math.random() > 0.5 ? "50%" : "2px" }}
    />
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export default function CustomPackagePage() {
  /* ── form state ── */
  const [form, setForm] = useState<CustomPackageRequest>({
    balloonCount: 100,
    banners: [],
    customBannerText: "",
    decorationTypes: [],
    extras: [],
    budgetRange: "",
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    location: "",
    specialNotes: "",
  });

  const [state, formAction, isPending] = useActionState(submitCustomPackageRequest, null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) setShowSuccess(true);
  }, [state]);

  /* ── helpers ── */
  const toggle = (field: "banners" | "decorationTypes" | "extras", value: string) => {
    setForm((prev) => {
      const list = prev[field] as string[];
      return {
        ...prev,
        [field]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      };
    });
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.set("data", JSON.stringify(form));
    startTransition(() => {
      formAction(fd);
    });
  };

  let sectionIndex = 0;

  /* ═══════════════════════ RENDER ═══════════════════════ */
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-[960px] mx-auto pb-28 px-4 sm:px-6 md:px-10 font-sans relative"
    >
      {/* ── success overlay ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            {/* confetti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 60 }).map((_, i) => (
                <ConfettiParticle key={i} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 18 }}
              className="relative z-10 bg-white rounded-3xl p-10 sm:p-14 text-center shadow-2xl max-w-md mx-4 border border-muted-pink/30"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-yellow flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-text-dark mb-3">
                You&apos;re All Set, {state?.name}! 🎉
              </h2>
              <p className="text-base font-bold text-text-dark/60 mb-8 leading-relaxed">
                Our party architects are already sketching your dream setup. We&apos;ll reach out within 2 hours!
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-primary to-pink-400 text-white px-10 py-3.5 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/30"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ 1. HERO ═══════════ */}
      <motion.header
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="pt-10 sm:pt-14 pb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-black text-xs uppercase tracking-widest px-5 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          Custom Builder
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-dark tracking-tighter leading-[1.08] mb-4">
          Build Your{" "}
          <span className="bg-gradient-to-r from-primary via-pink-400 to-accent-yellow bg-clip-text text-transparent">
            Dream Package
          </span>
        </h1>
        <p className="text-base sm:text-lg font-bold text-text-dark/55 max-w-xl mx-auto leading-relaxed">
          Mix & match everything — balloons, banners, lights, the works. We&apos;ll turn your vision into a jaw-dropping celebration.
        </p>
      </motion.header>

      {/* ═══════════ 2. BALLOONS ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionCard icon={<BalloonIcon className="w-6 h-6 text-primary" />} title="Balloons" subtitle="How many do you want?">
          <div className="flex flex-wrap gap-3">
            {BALLOON_OPTIONS.map((count) => {
              const active = form.balloonCount === count;
              return (
                <motion.button
                  key={count}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setForm((p) => ({ ...p, balloonCount: count }))}
                  className={`relative px-6 py-3 rounded-full font-black text-sm transition-all cursor-pointer border-2 ${
                    active
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                      : "bg-white border-muted-pink/40 text-text-dark hover:border-primary/50"
                  }`}
                >
                  {count}
                  {active && (
                    <motion.span
                      layoutId="balloon-check"
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-yellow flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-text-dark" strokeWidth={3} />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
          <p className="mt-4 text-sm font-bold text-primary">
            Selected: <span className="text-lg font-black">{form.balloonCount}</span> balloons
          </p>
        </SectionCard>
      </motion.section>

      {/* ═══════════ 3. BANNERS ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionCard icon={<Flag className="w-6 h-6 text-primary" />} title="Banners" subtitle="Choose one or more banner styles">
          <div className="flex flex-wrap gap-3">
            {BANNER_OPTIONS.map((banner) => {
              const active = form.banners.includes(banner);
              return (
                <motion.button
                  key={banner}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggle("banners", banner)}
                  className={`px-5 py-2.5 rounded-full font-black text-sm transition-all cursor-pointer border-2 flex items-center gap-2 ${
                    active
                      ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                      : "bg-white border-muted-pink/40 text-text-dark hover:border-primary/50"
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  {banner}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {form.banners.includes("Custom") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Type your custom banner text…"
                  value={form.customBannerText}
                  onChange={(e) => setForm((p) => ({ ...p, customBannerText: e.target.value }))}
                  className="mt-4 w-full max-w-md px-5 py-3 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark placeholder:text-text-dark/30 focus:outline-none focus:border-primary transition-colors bg-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </SectionCard>
      </motion.section>

      {/* ═══════════ 4. DECORATION TYPES ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionCard icon={<Palette className="w-6 h-6 text-primary" />} title="Decoration Type" subtitle="Pick everything you love">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DECORATION_TYPES.map((item) => {
              const active = form.decorationTypes.includes(item.label);
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggle("decorationTypes", item.label)}
                  className={`relative flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                    active
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-muted-pink/30 bg-white hover:border-primary/40"
                  }`}
                >
                  {active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                  <item.icon className={`w-8 h-8 transition-colors ${active ? "text-primary" : "text-text-dark/50"}`} />
                  <span className="font-black text-sm text-text-dark">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </SectionCard>
      </motion.section>

      {/* ═══════════ 5. EXTRAS ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionCard icon={<Gift className="w-6 h-6 text-primary" />} title="Extras" subtitle="Add the finishing touches">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EXTRAS.map((item) => {
              const active = form.extras.includes(item.label);
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggle("extras", item.label)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    active
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-muted-pink/30 bg-white hover:border-primary/40"
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? "text-primary" : "text-text-dark/50"}`} />
                  <span className="font-black text-xs sm:text-sm text-text-dark text-left">{item.label}</span>
                  {active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </SectionCard>
      </motion.section>

      {/* ═══════════ 6. BUDGET ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionCard icon={<IndianRupee className="w-6 h-6 text-primary" />} title="Budget Range" subtitle="What's your approximate budget?">
          <div className="flex flex-wrap gap-3">
            {BUDGET_OPTIONS.map((budget) => {
              const active = form.budgetRange === budget;
              return (
                <motion.button
                  key={budget}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setForm((p) => ({ ...p, budgetRange: budget }))}
                  className={`px-5 py-2.5 rounded-full font-black text-sm transition-all cursor-pointer border-2 ${
                    active
                      ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                      : "bg-white border-muted-pink/40 text-text-dark hover:border-primary/50"
                  }`}
                >
                  {budget}
                </motion.button>
              );
            })}
          </div>
        </SectionCard>
      </motion.section>

      {/* ═══════════ 7. CONTACT DETAILS ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <SectionCard icon={<ClipboardList className="w-6 h-6 text-primary" />} title="Contact Details" subtitle="So we can reach you with the quote">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative sm:col-span-2 md:col-span-1">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                required
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark placeholder:text-text-dark/30 focus:outline-none focus:border-primary transition-colors bg-white"
              />
            </div>

            {/* Phone */}
            <div className="relative sm:col-span-2 md:col-span-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                required
                type="tel"
                placeholder="Phone Number * (10 digits)"
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setForm((p) => ({ ...p, phone: val }));
                }}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark placeholder:text-text-dark/30 focus:outline-none focus:border-primary transition-colors bg-white"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark placeholder:text-text-dark/30 focus:outline-none focus:border-primary transition-colors bg-white"
              />
            </div>

            {/* Date */}
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                type="date"
                placeholder="Preferred Date"
                value={form.preferredDate}
                onChange={(e) => setForm((p) => ({ ...p, preferredDate: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark placeholder:text-text-dark/30 focus:outline-none focus:border-primary transition-colors bg-white appearance-none"
              />
            </div>

            {/* Location */}
            <div className="relative sm:col-span-2">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dark/30 pointer-events-none" />
              <select
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark focus:outline-none focus:border-primary transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Notes */}
            <div className="relative sm:col-span-2">
              <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-primary/50" />
              <textarea
                placeholder="Special notes, themes, color preferences…"
                value={form.specialNotes}
                onChange={(e) => setForm((p) => ({ ...p, specialNotes: e.target.value }))}
                rows={3}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-muted-pink/40 text-sm font-bold text-text-dark placeholder:text-text-dark/30 focus:outline-none focus:border-primary transition-colors bg-white resize-none"
              />
            </div>
          </div>
        </SectionCard>
      </motion.section>

      {/* ═══════════ error ═══════════ */}
      <AnimatePresence>
        {state?.error && !showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold text-center"
          >
            {state.error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ 8. ACTION BUTTONS ═══════════ */}
      <motion.section
        custom={sectionIndex++}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isPending}
          onClick={handleSubmit}
          className="w-full py-4 sm:py-5 rounded-full font-black text-base sm:text-lg text-white bg-gradient-to-r from-primary via-pink-500 to-primary shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Your Dream…
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Request Custom Quote
            </>
          )}
        </motion.button>

        <a
          href="tel:+919876543210"
          className="flex items-center justify-center gap-2 text-sm font-black text-text-dark/50 hover:text-primary transition-colors py-2"
        >
          <Phone className="w-4 h-4" />
          Or Call Us: +91 98765 43210
        </a>
      </motion.section>

      {/* ── decorative gradient blobs ── */}
      <div className="pointer-events-none fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 via-accent-yellow/5 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none fixed -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-muted-pink/10 via-primary/5 to-transparent blur-3xl -z-10" />
    </motion.div>
  );
}

/* ═══════════════════════ SECTION CARD ═══════════════════════ */

function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-muted-pink/20 rounded-2xl p-6 sm:p-8 shadow-bento">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="flex-shrink-0">{icon}</div>
        <h2 className="text-xl sm:text-2xl font-black text-text-dark">{title}</h2>
      </div>
      <p className="text-sm font-bold text-text-dark/45 mb-5">{subtitle}</p>
      {children}
    </div>
  );
}

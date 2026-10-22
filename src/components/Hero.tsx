import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, CalendarDays, Check, Clock3, Laptop, MessageCircle, Rocket, Sparkles } from "lucide-react";
import InteractiveDemo from "./InteractiveDemo";
import { cn } from "../utils/cn";
import { course, materialTypes, whatsappMessages } from "../content";

function getRemaining() {
  const difference = new Date(course.startISO).getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, started: true };
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    started: false,
  };
}

function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (remaining.started) {
    return <span className="text-xs font-semibold text-white/75">Taller de noviembre en curso</span>;
  }

  return (
    <div
      className="flex items-center gap-3"
      aria-label={`El taller comienza en ${remaining.days} días, ${remaining.hours} horas y ${remaining.minutes} minutos`}
    >
      {[
        [remaining.days, "días"],
        [remaining.hours, "hrs"],
        [remaining.minutes, "min"],
      ].map(([value, label], index) => (
        <div key={label} className="flex items-center gap-3">
          {index > 0 && <span className="h-5 w-px bg-white/15" aria-hidden="true" />}
          <div className="text-center">
            <span className="block text-xl leading-none font-medium tracking-tight text-white tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.15em] text-white/42 uppercase">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function downloadCalendar() {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Windward Academy//Serie Creacion Digital//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:ia-docentes-20261103@windward.academy",
    `DTSTAMP:${stamp}`,
    "DTSTART:20261104T010000Z",
    "DTEND:20261104T030000Z",
    "SUMMARY:Windward Academy — Taller IA + HTML y CSS para maestros de idiomas · Sesión 1",
    "DESCRIPTION:De la idea al primer material interactivo (flashcards y gramática). 19:00–21:00 h Ciudad de México. El enlace de acceso se envía a las personas registradas.",
    "LOCATION:Sesión en vivo por videollamada",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "UID:ia-docentes-20261105@windward.academy",
    `DTSTAMP:${stamp}`,
    "DTSTART:20261106T010000Z",
    "DTEND:20261106T030000Z",
    "SUMMARY:Windward Academy — Taller IA + HTML y CSS para maestros de idiomas · Sesión 2",
    "DESCRIPTION:Listening, juegos y tu kit personal. 19:00–21:00 h Ciudad de México. El enlace de acceso se envía a las personas registradas.",
    "LOCATION:Sesión en vivo por videollamada",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "windward-ia-docentes-docente-nov-2026.ics";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [calendarAdded, setCalendarAdded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.15]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);

  const addCalendar = () => {
    downloadCalendar();
    setCalendarAdded(true);
    window.setTimeout(() => setCalendarAdded(false), 3500);
  };

  const headline = ["IA para crear", "materiales interactivos", "con HTML y CSS"];

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(120%_90%_at_85%_0%,#0a58e0_0%,#0b2a74_42%,#061640_80%)] text-white"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <motion.div
        className="ambient-orb absolute -top-40 left-[18%] h-[540px] w-[540px] rounded-full bg-[#1ed8ff]/18 blur-[110px]"
        animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[#1d6fe0]/15 blur-[120px]" aria-hidden="true" />
      <svg
        className="absolute top-[15%] left-0 w-[55%] opacity-[0.09]"
        viewBox="0 0 800 400"
        fill="none"
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((line) => (
          <motion.path
            key={line}
            d={`M-80 ${100 + line * 55} C 170 ${-20 + line * 70}, 360 ${280 - line * 25}, 830 ${110 + line * 40}`}
            stroke="#67e8ff"
            strokeWidth="1"
            animate={reduceMotion ? undefined : { pathLength: [0.35, 1, 0.35], opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 10 + line * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1380px] items-center gap-12 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-10 lg:pt-28 lg:pb-14 xl:px-14">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 max-w-[710px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-2 text-[10px] font-bold tracking-[0.16em] text-white/75 uppercase backdrop-blur-md sm:text-[11px]"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7deeff] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7deeff]" />
            </span>
            Primer taller de la serie Creación Digital · Noviembre 2026
          </motion.div>

          <p className="mb-3 inline-block -rotate-1 rounded-xl bg-gradient-to-r from-[#0a58e0] to-[#1ed8ff] px-4 py-1.5 font-serif text-2xl text-white italic shadow-[0_10px_30px_rgba(30,216,255,0.3)] sm:text-3xl">
            Taller intensivo
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(2.9rem,6.2vw,6.2rem)] leading-[0.92] font-bold tracking-[-0.06em]"
          >
            {headline.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={cn("block", index === 1 && "bg-gradient-to-r from-[#67e8ff] to-[#ffffff] bg-clip-text text-transparent", index === 2 && "font-extrabold text-[#67e8ff]")}
                  initial={reduceMotion ? false : { y: "110%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1, delay: 0.18 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-3 text-xl font-medium tracking-[-0.02em] text-white/85 sm:text-2xl"
          >
            para maestros de idiomas
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58 }}
            className="mt-5 max-w-[590px] text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
          >
            Crea flashcards, ejercicios de gramática, actividades de listening y juegos que funcionan en cualquier celular o proyector. La IA escribe el código; tú diriges la pedagogía. Sin saber programar.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.64 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {materialTypes.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className={cn("inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold", item.tone)}>
                  <Icon className="h-4 w-4" aria-hidden="true" />{item.label}
                </span>
              );
            })}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/85"
          >
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#7deeff]" aria-hidden="true" />
              3 y 5 de noviembre
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#7deeff]" aria-hidden="true" />
              7:00 a 9:00 p.m. · CDMX
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <Laptop className="h-4 w-4 text-[#7deeff]" aria-hidden="true" />
              En línea · 4 horas
            </span>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={`${course.whatsappUrl}?text=${encodeURIComponent(whatsappMessages.inscribirme)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 text-base font-extrabold text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#1fbf5b]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              ¡Inscríbete! <span className="font-bold tabular-nums opacity-90">{course.whatsappDisplay}</span>
            </a>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] py-2 pr-5 pl-2 backdrop-blur-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0a58e0] to-[#1ed8ff]"><Rocket className="h-4 w-4 text-white" aria-hidden="true" /></span>
              <span className="leading-none"><span className="block text-[9px] font-bold tracking-[0.16em] text-[#7deeff] uppercase">Precio de lanzamiento</span><span className="mt-1 block text-xl font-extrabold tracking-tight">$250 <span className="text-sm font-bold text-white/70">pesos</span></span></span>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60"
          >
            <a href="#pago" className="underline decoration-white/30 underline-offset-4 hover:text-white">Ver formas de pago</a>
            <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden="true" />
            <span>No necesitas saber programar</span>
            <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden="true" />
            <span>Material de apoyo incluido</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 55, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[600px] lg:mx-0"
        >
          <motion.div style={{ y: mediaY }} className="relative px-2 py-5 sm:px-6 lg:px-2">
            <InteractiveDemo />
            <div className="mt-5 flex items-center justify-between rounded-[20px] border border-white/14 bg-[#07194d]/65 p-4 backdrop-blur-xl sm:p-5">
              <div>
                <span className="text-[9px] font-bold tracking-[0.18em] text-[#7deeff] uppercase">El taller comienza en</span>
                <div className="mt-3"><Countdown /></div>
              </div>
              <Sparkles className="hidden h-5 w-5 text-[#7deeff]/70 sm:block" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute right-5 bottom-5 left-5 z-20 mx-auto flex max-w-[1300px] items-center justify-between sm:right-8 sm:left-8">
        <a
          href="#comunidad"
          className="group hidden items-center gap-3 text-[10px] font-bold tracking-[0.17em] text-white/40 uppercase transition-colors hover:text-white md:inline-flex"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12">
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </span>
          Explorar el taller
        </a>
        <button
          type="button"
          onClick={addCalendar}
          className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[11px] font-semibold text-white/58 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            {calendarAdded ? (
              <motion.span key="added" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-[#67e8ff]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" /> Calendario descargado
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Añadir ambas fechas
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </section>
  );
}

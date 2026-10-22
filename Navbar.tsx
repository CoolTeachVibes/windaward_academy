import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { course, navLinks, whatsappMessages } from "../content";
import { Logo } from "./ui";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-[68px] max-w-[1380px] items-center justify-between rounded-[22px] border px-4 transition-all duration-500 sm:px-5",
          scrolled || open
            ? "border-white/10 bg-[#061640]/90 shadow-[0_14px_50px_rgba(3,18,16,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo inverse />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2.5 text-[13px] font-semibold text-white/66 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white focus-visible:outline-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#/confirmar"
            className="rounded-full px-3 py-2 text-[13px] font-semibold text-white/66 transition-colors hover:text-white focus-visible:outline-offset-2"
          >
            Ya pagué · Confirmar
          </a>
          <a
            href={`${course.whatsappUrl}?text=${encodeURIComponent(whatsappMessages.inscribirme)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-[13px] font-extrabold text-white transition-all hover:bg-[#1fbf5b] focus-visible:outline-offset-2"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            ¡Inscríbete! {course.whatsappDisplay}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-h-[calc(100svh-100px)] max-w-[1380px] overflow-y-auto rounded-[26px] border border-white/10 bg-[#061640]/97 p-5 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Navegación móvil">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                  className="flex items-center justify-between border-b border-white/8 py-4 text-xl font-medium tracking-tight text-white/85"
                >
                  {link.label}
                  <span className="text-xs font-normal text-white/30">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="mt-5 rounded-2xl bg-white/[0.05] p-4">
              <p className="text-xs leading-5 text-white/50">{course.dates}</p>
              <p className="mt-1 text-sm font-semibold text-white">{course.schedule} · CDMX · En línea</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="#/confirmar"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-3 text-sm font-bold text-white"
              >
                Ya pagué · Confirmar
              </a>
              <a
                href={`${course.whatsappUrl}?text=${encodeURIComponent(whatsappMessages.inscribirme)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 text-sm font-extrabold text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />¡Inscríbete!
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

let markCounter = 0;

/** Marca Windward: W con listón degradado, píxeles ascendentes y destello. */
export function WindwardMark({
  className,
  tile = true,
}: {
  className?: string;
  tile?: boolean;
}) {
  const [uid] = useState(() => `wm${++markCounter}`);
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a2d8f" />
          <stop offset="0.55" stopColor="#0a58e0" />
          <stop offset="1" stopColor="#1ed8ff" />
        </linearGradient>
        <linearGradient id={`${uid}-w`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tile ? "#ffffff" : "#0a2d8f"} />
          <stop offset="1" stopColor={tile ? "#dff6ff" : "#1a74e8"} />
        </linearGradient>
        <linearGradient id={`${uid}-swoosh`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={tile ? "#4fd9ff" : "#0ea5e9"} />
          <stop offset="1" stopColor={tile ? "#c9f7ff" : "#38d4ff"} />
        </linearGradient>
      </defs>
      {tile && <rect width="120" height="120" rx="30" fill={`url(#${uid}-tile)`} />}
      {/* W */}
      <path
        d="M22 42h14l9 34 9-26h8l9 26 9-34h14l-16 46h-12l-8-24-8 24H38z"
        fill={`url(#${uid}-w)`}
      />
      {/* Listón ascendente */}
      <path
        d="M44 84c10-18 26-32 50-44-18 20-30 36-38 48-4-2-8-3-12-4z"
        fill={`url(#${uid}-swoosh)`}
      />
      {/* Píxeles */}
      <rect x="82" y="30" width="7" height="7" rx="1.5" fill={tile ? "#ffffff" : "#0a58e0"} opacity="0.95" />
      <rect x="76" y="38" width="6" height="6" rx="1.3" fill={tile ? "#c9f7ff" : "#1ed8ff"} opacity="0.9" />
      <rect x="88" y="38" width="6" height="6" rx="1.3" fill={tile ? "#9beeff" : "#0ea5e9"} opacity="0.9" />
      {/* Destello */}
      <path
        d="M98 14l2.6 8.4L109 25l-8.4 2.6L98 36l-2.6-8.4L87 25l8.4-2.6z"
        fill={tile ? "#ffffff" : "#1ed8ff"}
      />
    </svg>
  );
}

export function Logo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <a
      href="#inicio"
      className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-offset-4"
      aria-label="Windward Academy, volver al inicio"
    >
      <WindwardMark className="h-10 w-10 shrink-0 drop-shadow-[0_6px_16px_rgba(10,88,224,0.35)] transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[15px] font-extrabold tracking-[0.12em]",
              inverse ? "text-white" : "text-[#0b2a74]",
            )}
          >
            WINDWARD
          </span>
          <span
            className={cn(
              "mt-1.5 text-[9px] font-bold tracking-[0.36em]",
              inverse ? "text-[#67e8ff]" : "text-[#0a8fe0]",
            )}
          >
            ACADEMY
          </span>
        </span>
      )}
    </a>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "mint" | "dark" | "light" | "outline" | "ghost";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  download?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className,
  arrow = false,
  onClick,
  download,
}: ButtonLinkProps) {
  const variants = {
    mint: "bg-[#67e8ff] text-[#07194d] shadow-[0_12px_40px_rgba(107,231,188,0.16)] hover:bg-[#a5f3ff]",
    dark: "bg-[#0b2a74] text-white shadow-[0_12px_30px_rgba(11,41,38,0.14)] hover:bg-[#123a9a]",
    light: "bg-white text-[#0b2a74] shadow-[0_12px_30px_rgba(11,41,38,0.08)] hover:bg-[#eef4fe]",
    outline:
      "border border-[#0b2a74]/15 bg-white/40 text-[#0b2a74] hover:border-[#0b2a74]/35 hover:bg-white/80",
    ghost: "border border-white/18 bg-white/[0.06] text-white backdrop-blur-md hover:bg-white/[0.12]",
  };

  return (
    <a
      href={href}
      onClick={onClick}
      download={download}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold tracking-[-0.01em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-offset-4 active:translate-y-0",
        variants[variant],
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -40px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[0.19em] uppercase",
          align === "center" && "justify-center",
          inverse ? "text-[#7deeff]" : "text-[#1d5fc9]",
        )}
      >
        <span className={cn("h-px w-7", inverse ? "bg-[#7deeff]/60" : "bg-[#1d5fc9]/45")} />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.055em]",
          inverse ? "text-white" : "text-[#0b2a74]",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-7 md:text-lg md:leading-8",
            align === "center" && "mx-auto",
            inverse ? "text-white/62" : "text-[#3d4f7a]",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal tracking-[-0.025em]">{children}</em>;
}

export function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

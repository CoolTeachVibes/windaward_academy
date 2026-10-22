import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clipboard,
  Clock3,
  CreditCard,
  ExternalLink,
  Landmark,
  Laptop,
  Link2,
  MessageCircle,
} from "lucide-react";
import Registration from "../components/Registration";
import { Logo } from "../components/ui";
import { course } from "../content";

async function copy(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("copy failed");
}

function CopyButton({ value, label, done }: { value: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        copy(value)
          .then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2500);
          })
          .catch(() => setCopied(false));
      }}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0b2a74]/12 bg-white px-4 text-xs font-bold text-[#0b2a74] transition-colors hover:bg-[#eaf0fa]"
      aria-live="polite"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#1d5fc9]" aria-hidden="true" /> : <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? done : label}
    </button>
  );
}

export default function ConfirmPage() {
  const reduceMotion = useReducedMotion();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Confirma tu inscripción | Windward Academy";
    setShareUrl(`${window.location.origin}${window.location.pathname}#/confirmar`);
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4fb] text-[#0b2a74]">
      <header className="border-b border-[#0b2a74]/8 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <a href="#inicio" onClick={() => { window.location.hash = ""; }} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0b2a74]/12 px-4 text-xs font-bold text-[#24418a] transition-colors hover:bg-[#eaf0fa]">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />Ver el taller
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold tracking-[0.19em] text-[#1d5fc9] uppercase">Taller intensivo · Windward Academy</p>
              <h1 className="mt-3 text-balance text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.05em]">Confirma tu inscripción</h1>
              <p className="mt-3 text-base leading-7 text-[#4a5b85]">{course.name} · {course.audience}.</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#1f336b]">
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#1d5fc9]" aria-hidden="true" />3 y 5 de noviembre</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#1d5fc9]" aria-hidden="true" />7:00 a 9:00 p.m. CDMX</span>
                <span className="inline-flex items-center gap-2"><Laptop className="h-4 w-4 text-[#1d5fc9]" aria-hidden="true" />En línea · 4 horas</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {shareUrl && <CopyButton value={shareUrl} label="Copiar liga de esta página" done="Liga copiada" />}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Confirma tu inscripción al Taller Intensivo de Windward Academy (3 y 5 de noviembre, $250 MXN) aquí: ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25D366] px-4 text-xs font-extrabold text-white transition-colors hover:bg-[#1fbf5b]"
              >
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />Compartir por WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#0b2a74]/8 bg-white p-5">
              <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dcefff] text-[#1d5fc9]"><CreditCard className="h-4 w-4" aria-hidden="true" /></span><span className="text-[10px] font-bold text-[#0b2a74]/30">01</span></div>
              <p className="mt-4 text-sm font-bold">Paga $250 MXN</p>
              <a href={course.mercadoPagoUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#1a4fb0] underline underline-offset-4">Mercado Pago <ExternalLink className="h-3 w-3" aria-hidden="true" /></a>
              <div className="mt-3 rounded-xl bg-[#f0f4fb] px-3 py-2.5">
                <p className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] text-[#3e5ea8] uppercase"><Landmark className="h-3 w-3" aria-hidden="true" />O transferencia · CLABE</p>
                <p className="mt-1 font-mono text-xs font-bold tabular-nums">{course.clabe}</p>
              </div>
              <div className="mt-2"><CopyButton value={course.clabeRaw} label="Copiar CLABE" done="CLABE copiada" /></div>
            </div>
            <div className="rounded-2xl border border-[#0b2a74]/8 bg-white p-5">
              <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dcefff] text-[#1d5fc9]"><Check className="h-4 w-4" aria-hidden="true" /></span><span className="text-[10px] font-bold text-[#0b2a74]/30">02</span></div>
              <p className="mt-4 text-sm font-bold">Registra tus datos</p>
              <p className="mt-2 text-xs leading-5 text-[#56678f]">Llena el formulario de abajo. Toma menos de un minuto y quedas en nuestra lista de inscripciones.</p>
            </div>
            <div className="rounded-2xl border border-[#0b2a74]/8 bg-white p-5">
              <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C7E]"><MessageCircle className="h-4 w-4" aria-hidden="true" /></span><span className="text-[10px] font-bold text-[#0b2a74]/30">03</span></div>
              <p className="mt-4 text-sm font-bold">Envía tu comprobante</p>
              <p className="mt-2 text-xs leading-5 text-[#56678f]">Al terminar se abrirá WhatsApp con tu mensaje listo. Adjunta la captura de tu pago al <strong className="font-bold text-[#1f336b]">{course.whatsappDisplay}</strong>.</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <Registration standalone />
        </div>

        <p className="mt-8 text-center text-xs text-[#5b6c93]">
          ¿Dudas? Escríbenos por WhatsApp al{" "}
          <a href={course.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1a4fb0] underline underline-offset-4">{course.whatsappDisplay}</a>
          {" "}· © {new Date().getFullYear()} Windward Academy
        </p>
      </main>
    </div>
  );
}

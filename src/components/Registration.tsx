import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleAlert,
  Clipboard,
  Clock3,
  CreditCard,
  ExternalLink,
  Landmark,
  LoaderCircle,
  MessageCircle,
  Paperclip,
  ShieldCheck,
  Table2,
} from "lucide-react";
import { course } from "../content";
import { SHEETS_ENDPOINT, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../config";
import { Reveal, Serif } from "./ui";
import { cn } from "../utils/cn";

type PaymentMethod = "mercadopago" | "transferencia";
type SheetStatus = "idle" | "sending" | "saved" | "unconfirmed" | "error" | "unconfigured";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  method: PaymentMethod;
  reference: string;
};

const initialForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  institution: "",
  role: "Profesor/a de educación superior",
  method: "mercadopago",
  reference: "",
};

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

const inputClass =
  "mt-2.5 h-12 w-full rounded-xl border border-[#0b2a74]/12 bg-[#fafbfe] px-4 text-sm text-[#0b2a74] outline-none transition-colors placeholder:text-[#0b2a74]/30 focus:border-[#1d5fc9]";

async function sendToSheet(payload: Record<string, string>): Promise<SheetStatus> {
  if (!SHEETS_ENDPOINT) return "unconfigured";
  const body = JSON.stringify(payload);
  try {
    // text/plain evita la verificación previa CORS; Apps Script responde con JSON legible.
    const response = await fetch(SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "follow",
    });
    if (response.ok) {
      try {
        const data = (await response.json()) as { ok?: boolean };
        return data.ok ? "saved" : "error";
      } catch {
        return "unconfirmed";
      }
    }
    return "error";
  } catch {
    try {
      await fetch(SHEETS_ENDPOINT, { method: "POST", mode: "no-cors", body });
      return "unconfirmed";
    } catch {
      return "error";
    }
  }
}

export default function Registration({ standalone = false }: { standalone?: boolean }) {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [prepared, setPrepared] = useState(false);
  const [sheetStatus, setSheetStatus] = useState<SheetStatus>("idle");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const methodLabel = form.method === "mercadopago" ? "Mercado Pago" : "Transferencia SPEI";

  const whatsappText = useMemo(
    () => `Hola, Windward Academy 👋

Acabo de pagar mi inscripción al *Taller Intensivo: ${course.name}* (${course.dates}, ${course.schedule} CDMX) y comparto mi comprobante.

*Nombre:* ${form.name}
*Correo:* ${form.email}
*Institución:* ${form.institution || "No indicada"}
*Perfil:* ${form.role}
*Método de pago:* ${methodLabel}
*Monto:* ${money.format(course.price)} MXN
*Referencia:* ${form.reference || "Adjunto comprobante"}

📎 Adjunto el comprobante en este chat. Quedo al pendiente de la confirmación y el enlace de acceso. ¡Gracias!`,
    [form, methodLabel],
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  useEffect(() => {
    if (prepared) resultRef.current?.focus();
  }, [prepared]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sheetStatus === "sending") return;
    setSheetStatus("sending");
    const status = await sendToSheet({
      nombre: form.name.trim(),
      correo: form.email.trim(),
      whatsapp: form.phone.trim(),
      institucion: form.institution.trim(),
      perfil: form.role,
      metodoPago: methodLabel,
      referencia: form.reference.trim(),
      monto: String(course.price),
      curso: course.name,
      fechas: `${course.dates} · ${course.schedule} CDMX`,
      origen: typeof window !== "undefined" ? window.location.hostname || "landing" : "landing",
    });
    setSheetStatus(status);
    setPrepared(true);
  };

  const retrySheet = async () => {
    setSheetStatus("sending");
    const status = await sendToSheet({
      nombre: form.name.trim(),
      correo: form.email.trim(),
      whatsapp: form.phone.trim(),
      institucion: form.institution.trim(),
      perfil: form.role,
      metodoPago: methodLabel,
      referencia: form.reference.trim(),
      monto: String(course.price),
      curso: course.name,
      fechas: `${course.dates} · ${course.schedule} CDMX`,
      origen: "landing-reintento",
    });
    setSheetStatus(status);
  };

  const copyMessage = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(whatsappText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = whatsappText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        textarea.remove();
        if (!successful) throw new Error("No se pudo copiar el mensaje");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const statusView: Record<Exclude<SheetStatus, "idle" | "sending">, { tone: string; icon: typeof Check; text: string }> = {
    saved: { tone: "bg-[#dcefff]/70 text-[#1f336b]", icon: Check, text: "Tus datos quedaron guardados en nuestro registro de inscripciones." },
    unconfirmed: { tone: "bg-[#dcefff]/70 text-[#1f336b]", icon: Table2, text: "Tus datos se enviaron a nuestro registro. Si no recibes confirmación en 24 h, escríbenos por WhatsApp." },
    error: { tone: "bg-[#fff1ec] text-[#7a3b2a]", icon: CircleAlert, text: "No pudimos guardar tus datos automáticamente. No te preocupes: van completos en el mensaje de WhatsApp." },
    unconfigured: { tone: "bg-[#f3f6fc] text-[#4a5b85]", icon: Table2, text: "Tus datos van completos en el mensaje de WhatsApp; con eso registramos tu inscripción." },
  };

  return (
    <section id="registro" className={cn("scroll-mt-20 bg-[#f0f4fb]", standalone ? "py-0" : "py-24 sm:py-32")} aria-labelledby="registration-title">
      <div className={cn("mx-auto max-w-[1180px]", standalone ? "px-0" : "px-5 sm:px-8 lg:px-12")}>
        <div className="grid overflow-hidden rounded-[32px] border border-[#0b2a74]/10 bg-white shadow-[0_30px_100px_rgba(11,42,116,0.1)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2d8f] via-[#0b2a74] to-[#061640] p-7 text-white sm:p-10">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#1ed8ff]/25 blur-[70px]" aria-hidden="true" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[#1d6fe0]/30 blur-[70px]" aria-hidden="true" />
            <Reveal className="relative flex h-full flex-col" y={20}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#67e8ff] uppercase">Confirma tu inscripción</p>
                {!standalone && (
                  <a href="#/confirmar" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white">
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />Abrir en pestaña propia
                  </a>
                )}
              </div>
              <h2 id="registration-title" className="mt-5 text-4xl leading-[1.02] font-medium tracking-[-0.055em] sm:text-5xl">Pagaste. Ahora <Serif>asegura tu lugar.</Serif></h2>
              <p className="mt-5 text-sm leading-6 text-white/65">Registra tus datos y comparte tu comprobante por WhatsApp. Al recibirlo, te confirmamos y te enviamos el enlace de acceso, la guía de preparación y el material de apoyo.</p>
              <a href={course.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(37,211,102,0.35)] transition-colors hover:bg-[#1fbf5b]"><MessageCircle className="h-4 w-4" aria-hidden="true" />wa.me/{WHATSAPP_NUMBER}</a>

              <ol className="mt-8 space-y-3">
                {[
                  ["1", "Paga $250 MXN por Mercado Pago o transferencia"],
                  ["2", "Registra tus datos en el formulario"],
                  ["3", `Envía tu comprobante por WhatsApp al ${WHATSAPP_DISPLAY}`],
                ].map(([number, text]) => (
                  <li key={number} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#67e8ff] text-[11px] font-bold text-[#061640]">{number}</span>
                    {text}
                  </li>
                ))}
              </ol>

              <div className="mt-8 space-y-5 border-y border-white/10 py-7">
                <div className="flex items-start gap-3"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8ff]" /><div><p className="text-sm font-semibold">3 y 5 de noviembre de 2026</p><p className="mt-1 text-xs text-white/50">Martes y jueves · Sesiones en vivo</p></div></div>
                <div className="flex items-start gap-3"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8ff]" /><div><p className="text-sm font-semibold">19:00–21:00 h · CDMX</p><p className="mt-1 text-xs text-white/50">4 horas en total · UTC−6</p></div></div>
              </div>

              <div className="mt-7">
                <p className="text-[10px] font-bold tracking-[0.16em] text-white/45 uppercase">¿Aún no has pagado?</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a href={course.mercadoPagoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-4 text-xs font-bold text-white transition-colors hover:bg-white/[0.12]"><span className="inline-flex items-center gap-2"><CreditCard className="h-4 w-4 text-[#67e8ff]" />Mercado Pago</span><ExternalLink className="h-3.5 w-3.5 opacity-60" /></a>
                  <a href="#pago" className="inline-flex min-h-11 items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-4 text-xs font-bold text-white transition-colors hover:bg-white/[0.12]"><span className="inline-flex items-center gap-2"><Landmark className="h-4 w-4 text-[#67e8ff]" />Ver CLABE para transferencia</span><ArrowRight className="h-3.5 w-3.5 opacity-60" /></a>
                </div>
              </div>

              <div className="mt-auto pt-9">
                <div className="flex items-start gap-2.5 text-[11px] leading-5 text-white/60"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8ff]" /><p>Tus datos se usan únicamente para registrar tu inscripción y enviarte el acceso al taller.</p></div>
              </div>
            </Reveal>
          </div>

          <div className="p-6 sm:p-9 lg:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {!prepared ? (
                <motion.form
                  key="form"
                  onSubmit={(event) => void submit(event)}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div><p className="text-[10px] font-bold tracking-[0.16em] text-[#3e5ea8] uppercase">Paso 1 de 2 · Tus datos</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#0b2a74]">Cuéntanos sobre ti</h3></div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dcefff] text-[#1d5fc9]"><Table2 className="h-5 w-5" /></span>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="text-xs font-bold text-[#1f336b]">Nombre completo <span aria-hidden="true">*</span></span>
                      <input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} maxLength={100} className={inputClass} placeholder="¿Cómo te llamas?" />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-[#1f336b]">Correo <span aria-hidden="true">*</span></span>
                      <input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} maxLength={120} className={inputClass} placeholder="tu@correo.edu.mx" />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-[#1f336b]">Tu WhatsApp <span aria-hidden="true">*</span></span>
                      <input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} maxLength={20} pattern="[0-9+\s()-]{10,20}" title="Escribe un número de 10 dígitos" className={inputClass} placeholder="449 123 4567" />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-[#1f336b]">Institución <span className="font-normal text-[#6a7a9f]">(opcional)</span></span>
                      <input autoComplete="organization" value={form.institution} onChange={(event) => setForm({ ...form, institution: event.target.value })} maxLength={120} className={inputClass} placeholder="Nombre de tu institución" />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-[#1f336b]">Tu perfil</span>
                      <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className={inputClass}>
                        <option>Profesor/a de educación superior</option>
                        <option>Docente de educación media superior</option>
                        <option>Coordinación académica</option>
                        <option>Personal administrativo</option>
                        <option>Otro perfil educativo</option>
                      </select>
                    </label>
                  </div>

                  <fieldset className="mt-6">
                    <legend className="text-xs font-bold text-[#1f336b]">¿Cómo realizaste tu pago?</legend>
                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-[#eaf0fa] p-1.5">
                      {([
                        ["mercadopago", "Mercado Pago", CreditCard],
                        ["transferencia", "Transferencia", Landmark],
                      ] as const).map(([value, label, Icon]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm({ ...form, method: value })}
                          aria-pressed={form.method === value}
                          className={cn("relative inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition-colors", form.method === value ? "text-[#0b2a74]" : "text-[#5b6c93] hover:text-[#0b2a74]")}
                        >
                          {form.method === value && <motion.span layoutId="payment-method" className="absolute inset-0 rounded-xl bg-white shadow-sm" transition={{ duration: reduceMotion ? 0 : 0.3 }} />}
                          <Icon className="relative h-4 w-4" aria-hidden="true" /><span className="relative">{label}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <label className="mt-5 block">
                    <span className="text-xs font-bold text-[#1f336b]">Referencia, folio o clave de rastreo <span className="font-normal text-[#6a7a9f]">(opcional)</span></span>
                    <input value={form.reference} onChange={(event) => setForm({ ...form, reference: event.target.value })} maxLength={60} className={inputClass} placeholder={form.method === "mercadopago" ? "Número de operación de Mercado Pago" : "Clave de rastreo SPEI"} />
                  </label>

                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#0b2a74]/8 bg-[#f3f6fc] p-4 text-[11px] leading-5 text-[#4a5b85]">
                    <Paperclip className="mt-0.5 h-4 w-4 shrink-0 text-[#1d5fc9]" aria-hidden="true" />
                    <p>En el siguiente paso se abrirá WhatsApp con tu mensaje listo. Solo tendrás que <strong className="font-bold text-[#1f336b]">adjuntar tu comprobante</strong> (captura o PDF).</p>
                  </div>

                  <button
                    type="submit"
                    disabled={sheetStatus === "sending"}
                    className="group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#0b2a74] px-6 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#123a9a] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
                  >
                    {sheetStatus === "sending" ? (
                      <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Guardando tus datos…</>
                    ) : (
                      <>Registrarme y continuar a WhatsApp <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                    )}
                  </button>
                  <p className="mt-4 text-center text-[10px] leading-5 text-[#5b6c93]">Tus datos se guardan en nuestro registro de inscripciones. Después revisarás el mensaje antes de enviarlo.</p>
                </motion.form>
              ) : (
                <motion.div
                  key="result"
                  ref={resultRef}
                  tabIndex={-1}
                  role="status"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="outline-none"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#128C7E]"><MessageCircle className="h-6 w-6" /></span>
                  <p className="mt-6 text-[10px] font-bold tracking-[0.16em] text-[#3e5ea8] uppercase">Paso 2 de 2 · Comprobante</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#0b2a74]">Comparte tu comprobante por WhatsApp.</h3>
                  <p className="mt-3 text-sm leading-6 text-[#56678f]">Abre el chat con <strong className="font-semibold text-[#1f336b]">{WHATSAPP_DISPLAY}</strong>: el mensaje ya va listo con tus datos. <strong className="font-semibold text-[#1f336b]">Adjunta la captura o PDF de tu pago</strong> y envíalo.</p>

                  {sheetStatus !== "idle" && sheetStatus !== "sending" && (() => {
                    const view = statusView[sheetStatus];
                    const Icon = view.icon;
                    return (
                      <div className={cn("mt-5 flex items-start gap-3 rounded-xl p-4 text-xs leading-5", view.tone)}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <div className="flex-1">
                          <p>{view.text}</p>
                          {sheetStatus === "error" && (
                            <button type="button" onClick={() => void retrySheet()} className="mt-2 text-xs font-bold underline underline-offset-4">Reintentar guardado</button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  {sheetStatus === "sending" && (
                    <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#f3f6fc] p-4 text-xs text-[#4a5b85]"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Guardando tus datos…</div>
                  )}

                  <div className="mt-6 rounded-2xl border border-[#0b2a74]/9 bg-[#f0f4fb] p-5">
                    <div className="flex items-start justify-between gap-4 border-b border-[#0b2a74]/8 pb-4"><div><p className="text-xs font-bold text-[#1f336b]">{form.name}</p><p className="mt-1 text-xs break-all text-[#5b6c93]">{form.email} · {form.phone}</p></div><span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#1a4fb0]">{methodLabel}</span></div>
                    <div className="mt-4 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold text-[#1f336b]">{course.shortName}</p><p className="mt-1 text-[11px] text-[#5b6c93]">3 y 5 nov · 19:00 h CDMX</p></div><p className="text-xl font-semibold tracking-tight text-[#0b2a74]">{money.format(course.price)}</p></div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#1fbf5b]"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" /> Enviar comprobante por WhatsApp <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                  </a>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPrepared(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b2a74]/12 text-xs font-bold text-[#24418a] hover:bg-[#f0f4fb]"><ArrowLeft className="h-3.5 w-3.5" />Editar datos</button>
                    <button type="button" onClick={() => void copyMessage()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b2a74]/12 text-xs font-bold text-[#24418a] hover:bg-[#f0f4fb]">{copied ? <Check className="h-3.5 w-3.5 text-[#1d5fc9]" /> : <Clipboard className="h-3.5 w-3.5" />}{copied ? "Mensaje copiado" : "Copiar mensaje"}</button>
                  </div>
                  <p className="mt-5 text-[10px] leading-5 text-[#5b6c93]">Si WhatsApp no se abre, copia el mensaje y envíalo manualmente al {WHATSAPP_DISPLAY} junto con tu comprobante. Tu lugar queda confirmado cuando te respondamos.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MessageCircle, X } from "lucide-react";
import { course } from "../content";
import { Logo } from "./ui";

type LegalView = "privacidad" | "terminos" | null;

const legalContent = {
  privacidad: {
    eyebrow: "Aviso de privacidad",
    title: "Tus datos permanecen bajo tu control.",
    sections: [
      ["Datos del formulario", "Al enviar el formulario de registro, tus datos (nombre, correo, WhatsApp, institución, perfil y datos de pago) se guardan en el registro de inscripciones de Windward Academy, alojado en Google Sheets, y se incluyen en el mensaje de WhatsApp que tú decides enviar. Este sitio no utiliza cookies de publicidad ni herramientas de seguimiento."],
      ["Uso de la información", "Los datos se utilizan para verificar tu pago, confirmar tu inscripción, enviarte el enlace de acceso y el material de apoyo, y responder tus preguntas. No se comparten con terceros ni se usan con fines publicitarios."],
      ["Comprobantes de pago", "El comprobante que compartes por WhatsApp (+52 449 285 0638) se utiliza únicamente para verificar tu inscripción. No incluyas datos de tarjetas ni información personal de estudiantes en el formulario o en el laboratorio de prompts."],
      ["Tus opciones", `Puedes pedir acceso, corrección o eliminación de tu información escribiendo por WhatsApp al ${course.whatsappDisplay} o a ${course.admissionsEmail}.`],
    ],
  },
  terminos: {
    eyebrow: "Términos del curso",
    title: "Condiciones claras para aprender mejor.",
    sections: [
      ["Fechas y horario", "El Taller Intensivo “IA para crear materiales interactivos con HTML y CSS” se imparte de forma íntegra en dos días: 3 y 5 de noviembre de 2026, de 19:00 a 21:00 h, hora de Ciudad de México. Cualquier cambio necesario se comunicará por WhatsApp y correo a las personas inscritas."],
      ["Precio, pago y confirmación", "El precio de lanzamiento es de $250 MXN por persona e incluye material de apoyo. El pago se realiza por Mercado Pago (link.mercadopago.com.mx/windward) o por transferencia SPEI a la CLABE 012 010 01509618820 0. La inscripción queda confirmada cuando recibimos tu comprobante por WhatsApp (+52 449 285 0638) y respondemos con el enlace de acceso."],
      ["Acceso y materiales", "El acceso es personal. Las grabaciones permanecen disponibles durante 30 días para las personas inscritas. Los materiales HTML que crees son tuyos y puedes usarlos libremente con tus estudiantes; las guías y el kit de prompts son para uso docente personal y no pueden revenderse."],
      ["Uso responsable de IA", "Las actividades formativas no sustituyen las políticas de tu institución ni el juicio profesional. Revisa siempre los resultados de herramientas de IA y evita introducir datos personales, confidenciales o protegidos."],
    ],
  },
};

export default function Footer() {
  const [legal, setLegal] = useState<LegalView>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!legal) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLegal(null);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])"),
        ).filter((element) => !element.hasAttribute("disabled"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [legal]);

  const content = legal ? legalContent[legal] : null;

  return (
    <footer className="bg-[#061640] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#0a2d8f] via-[#0a58e0] to-[#1ed8ff]" aria-hidden="true" />
      <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Logo inverse />
            <p className="mt-7 max-w-xl text-3xl leading-[1.12] font-medium tracking-[-0.045em] text-white/90 sm:text-4xl">Transformando maestros en<br /><span className="font-serif font-normal text-[#67e8ff] italic">creadores digitales.</span></p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={course.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/20 text-[#5de89a]"><MessageCircle className="h-4 w-4" /></span>
                WhatsApp {course.whatsappDisplay}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={`mailto:${course.admissionsEmail}`} className="group inline-flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12"><Mail className="h-4 w-4" /></span>
                {course.admissionsEmail}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.17em] text-white/35 uppercase">Explora</p>
              <nav className="mt-5 flex flex-col items-start gap-3.5" aria-label="Enlaces del pie de página">
                {[["Filosofía", "#filosofia"], ["Qué crearás", "#metodo"], ["Programa", "#programa"], ["Laboratorio", "#laboratorio"], ["Próximos cursos", "#proximos"]].map(([label, href]) => <a key={href} href={href} className="text-sm text-white/58 transition-colors hover:text-[#67e8ff]">{label}</a>)}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.17em] text-white/35 uppercase">Taller</p>
              <nav className="mt-5 flex flex-col items-start gap-3.5" aria-label="Enlaces de inscripción">
                {[["Precio de lanzamiento", "#inversion"], ["Mercado Pago y CLABE", "#pago"], ["Preguntas frecuentes", "#faq"], ["Confirmar inscripción", "#/confirmar"]].map(([label, href]) => <a key={href} href={href} className="text-sm text-white/58 transition-colors hover:text-[#67e8ff]">{label}</a>)}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-7 text-[11px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Windward Academy. Digital Teaching & AI Innovation.</p>
          <div className="flex flex-wrap items-center gap-5">
            <button type="button" onClick={() => setLegal("privacidad")} className="transition-colors hover:text-white">Privacidad</button>
            <button type="button" onClick={() => setLegal("terminos")} className="transition-colors hover:text-white">Términos del curso</button>
            <a href="#inicio" className="inline-flex items-center gap-2 transition-colors hover:text-white">Volver arriba <ArrowUp className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {legal && content && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-[#020a24]/75 p-0 backdrop-blur-md sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setLegal(null); }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-title"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-[#f3f6fc] p-6 text-[#0b2a74] shadow-2xl sm:rounded-[28px] sm:p-10"
            >
              <button ref={closeRef} type="button" onClick={() => setLegal(null)} className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#0b2a74]/10 bg-white transition-colors hover:bg-[#e4ecfa]" aria-label="Cerrar ventana"><X className="h-5 w-5" /></button>
              <p className="pr-14 text-[10px] font-bold tracking-[0.17em] text-[#3e5ea8] uppercase">{content.eyebrow}</p>
              <h2 id="legal-title" className="mt-4 max-w-xl pr-8 text-3xl leading-tight font-medium tracking-[-0.045em] sm:text-4xl">{content.title}</h2>
              <div className="mt-8 space-y-7">
                {content.sections.map(([title, text]) => <section key={title}><h3 className="text-sm font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-[#4a5b85]">{text}</p></section>)}
              </div>
              <div className="mt-9 border-t border-[#0b2a74]/10 pt-6"><p className="text-xs leading-5 text-[#5b6c93]">Última actualización: octubre de 2026. ¿Necesitas aclarar algo? <a className="font-bold text-[#1a4fb0] underline underline-offset-4" href={`https://wa.me/${course.whatsappNumber}`} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>.</p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

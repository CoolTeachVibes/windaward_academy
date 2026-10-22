import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  CreditCard,
  ExternalLink,
  Clipboard,
  GraduationCap,
  Landmark,
  MessageCircle,
  MonitorPlay,
  Bell,
  Quote,
  Video,
} from "lucide-react";
import { audiences, course, faqs, features, outcomes, sessions, testimonials, upcomingCourses, whatsappMessages } from "../content";
import { ButtonLink, Reveal, SectionHeading, Serif } from "./ui";
import { cn } from "../utils/cn";

export function SocialProof() {
  return (
    <section id="comunidad" className="border-b border-[#0b2a74]/8 bg-[#f3f6fc] py-10 sm:py-12" aria-label="Comunidad a la que está dirigido el curso">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-14">
        <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[210px] text-[10px] font-bold tracking-[0.18em] text-[#3e5ea8] uppercase">Diseñado para quienes enseñan idiomas</p>
          <div className="grid flex-1 grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4">
            {audiences.map((audience, index) => (
              <div key={audience} className="flex items-center gap-2.5 text-xs font-semibold text-[#1f336b] sm:text-sm">
                <span className="text-[10px] font-medium text-[#7f8fb5]">0{index + 1}</span>
                {audience}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#0b2a74]/8 bg-[#0b2a74]/8 md:grid-cols-4">
          {[
            ["4 h", "en vivo · 2 noches"],
            ["4", "materiales listos"],
            ["$250", "precio de lanzamiento"],
            ["0", "experiencia en código"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline justify-center gap-2.5 bg-[#fafbfe] px-3 py-5 text-center sm:py-6">
              <span className="text-2xl font-medium tracking-[-0.05em] text-[#0b2a74] sm:text-3xl">{value}</span>
              <span className="max-w-24 text-left text-[10px] leading-4 text-[#56678f] sm:text-xs">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Method() {
  return (
    <section id="metodo" className="bg-[#f3f6fc] py-24 sm:py-32" aria-labelledby="method-title">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <SectionHeading
            eyebrow="Qué crearás en el taller"
            title={<span id="method-title">Cuatro tipos de material.<br />Tu contenido, <Serif>tu estilo.</Serif></span>}
          />
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-7 text-[#4a5b85] lg:pb-2">
              Cada actividad se construye en vivo con tu propio vocabulario, tus oraciones y tu nivel. Te llevas el archivo y el prompt para repetirlo en cualquier unidad.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(index % 3) * 0.08} className="h-full">
                <article className="group flex h-full min-h-[310px] flex-col rounded-[26px] border border-[#0b2a74]/9 bg-white/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0b2a74]/18 hover:bg-white hover:shadow-[0_24px_70px_rgba(25,61,53,0.09)] sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dcefff] text-[#1d5fc9] transition-all duration-500 group-hover:rotate-3 group-hover:bg-[#67e8ff] group-hover:text-[#0b2a74]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#0b2a74]/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-[22px] leading-tight font-semibold tracking-[-0.035em] text-[#0b2a74]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#4a5b85]">{feature.description}</p>
                  <div className="mt-auto flex items-start gap-2 border-t border-[#0b2a74]/8 pt-5 text-[11px] leading-5 font-semibold text-[#2458b8]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{feature.example}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Curriculum() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const session = sessions[active];

  return (
    <section id="programa" className="bg-[#fafbfe] py-24 sm:py-32" aria-labelledby="program-title">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Programa del taller intensivo"
          title={<span id="program-title">Dos noches. Cuatro materiales <Serif>funcionando.</Serif></span>}
          description="Trae el vocabulario y la gramática de tu próxima unidad. Cada sesión alterna explicación breve, demostración y laboratorio guiado para que termines con archivos listos."
          align="center"
        />

        <Reveal className="mt-12" y={24}>
          <div className="grid gap-3 rounded-[24px] border border-[#0b2a74]/9 bg-[#eaf0fa] p-2 sm:grid-cols-2" role="group" aria-label="Selecciona una sesión para ver su temario">
            {sessions.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                aria-controls="session-panel"
                className={cn(
                  "relative min-h-[94px] overflow-hidden rounded-[18px] px-5 py-4 text-left transition-colors sm:px-6",
                  active === index ? "text-white" : "text-[#1f336b] hover:bg-white/60",
                )}
              >
                {active === index && (
                  <motion.span layoutId="active-session" className="absolute inset-0 bg-[#0b2a74]" transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} />
                )}
                <span className="relative flex items-center gap-4">
                  <span className={cn("font-serif text-3xl italic", active === index ? "text-[#67e8ff]" : "text-[#6a7a9f]")}>{item.number}</span>
                  <span>
                    <span className="block text-[10px] font-bold tracking-[0.12em] uppercase opacity-55">{item.date} · 19:00 h</span>
                    <span className="mt-1.5 block text-sm font-bold sm:text-base">{item.title}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div id="session-panel" className="mt-4 overflow-hidden rounded-[28px] border border-[#0b2a74]/9 bg-white" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={session.number}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-[0.75fr_1.25fr]"
              >
                <div className="flex flex-col border-b border-[#0b2a74]/8 bg-[#eff3fb] p-6 sm:p-9 lg:border-r lg:border-b-0">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0b2a74]/10 bg-white px-3 py-2 text-[10px] font-bold tracking-[0.12em] text-[#3e5ea8] uppercase">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{session.date}
                  </span>
                  <h3 className="mt-7 text-3xl leading-[1.06] font-medium tracking-[-0.045em] text-[#0b2a74]">{session.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#4a5b85]">{session.summary}</p>
                  <div className="mt-auto pt-8">
                    <div className="rounded-2xl bg-[#d8ecff] p-4">
                      <p className="text-[10px] font-bold tracking-[0.14em] text-[#2458b8] uppercase">Entregable de la sesión</p>
                      <p className="mt-2 text-sm leading-6 font-semibold text-[#132a63]">{session.deliverable}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-9">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#5b6c93] uppercase">Agenda · Hora CDMX</p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#5b6c93]"><Clock3 className="h-3.5 w-3.5" />120 min</span>
                  </div>
                  <ol>
                    {session.agenda.map(([time, item], index) => (
                      <motion.li
                        key={time + item}
                        initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * index }}
                        className="grid grid-cols-[52px_1fr] gap-4 border-b border-[#0b2a74]/7 py-4 last:border-0 sm:grid-cols-[64px_1fr]"
                      >
                        <span className="pt-0.5 text-xs font-semibold text-[#5b6c93] tabular-nums">{time}</span>
                        <span className="text-sm leading-6 font-medium text-[#1c2f66]">{item}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const outcomeImage =
  "https://images.pexels.com/photos/8199134/pexels-photo-8199134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

export function Outcomes() {
  return (
    <section id="beneficios" className="bg-[#eaf0fa] py-24 sm:py-32" aria-labelledby="outcomes-title">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          <Reveal className="relative" y={45}>
            <div className="relative h-[480px] overflow-hidden rounded-[32px] sm:h-[620px]">
              <img src={outcomeImage} alt="Profesor dialogando con un grupo de estudiantes en clase" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07194d]/65 via-transparent to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 rounded-[22px] border border-white/18 bg-[#07194d]/55 p-5 text-white backdrop-blur-xl sm:right-8 sm:bottom-8 sm:left-8">
                <p className="text-[10px] font-bold tracking-[0.17em] text-[#67e8ff] uppercase">Tu unidad es el material</p>
                <p className="mt-2 font-serif text-2xl leading-tight italic sm:text-3xl">Trabajas con tu propio vocabulario.</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-3 rounded-2xl border border-[#0b2a74]/10 bg-[#fafbfe] p-4 shadow-xl sm:-right-7 sm:p-5">
              <div className="flex items-center gap-3"><GraduationCap className="h-5 w-5 text-[#1d5fc9]" /><div><p className="text-xl font-semibold tracking-tight text-[#0b2a74]">4 archivos</p><p className="text-[10px] text-[#56678f]">listos al terminar</p></div></div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Lo que te llevas"
              title={<span id="outcomes-title">Menos teoría.<br /><Serif>Más materiales listos.</Serif></span>}
              description="El valor no está en ver otra demostración, sino en cerrar la computadora con archivos que tus alumnos pueden usar mañana."
            />
            <div className="mt-9">
              {outcomes.map((outcome, index) => (
                <Reveal key={outcome.value} delay={index * 0.07} y={22}>
                  <div className="group grid grid-cols-[42px_1fr] gap-4 border-t border-[#0b2a74]/10 py-5 last:border-b sm:grid-cols-[54px_1fr] sm:py-6">
                    <span className="pt-1 font-serif text-xl text-[#3e5ea8] italic">{outcome.value}</span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.025em] text-[#0b2a74] transition-transform duration-300 group-hover:translate-x-1">{outcome.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#4a5b85]">{outcome.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="voces" className="bg-[#fafbfe] py-24 sm:py-32" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Voces de maestros de idiomas"
          title={<span id="testimonials-title">Cuando el material se adapta a tu clase, <Serif>y no al revés.</Serif></span>}
          align="center"
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1} className="h-full">
              <figure className={cn(
                "flex h-full min-h-[370px] flex-col rounded-[28px] border p-7 transition-transform duration-500 hover:-translate-y-1.5 sm:p-8",
                index === 1 ? "border-[#0b2a74] bg-[#0b2a74] text-white" : "border-[#0b2a74]/9 bg-[#eef3fb] text-[#0b2a74]",
              )}>
                <Quote className={cn("h-7 w-7", index === 1 ? "text-[#67e8ff]" : "text-[#2f6fd6]")} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <blockquote className="mt-8 font-serif text-[25px] leading-[1.3] tracking-[-0.02em] italic">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold", index === 1 ? "bg-white/10 text-[#67e8ff]" : "bg-[#d8ecff] text-[#1a4fb0]")}>{testimonial.initials}</span>
                  <span><span className="block text-sm font-bold">{testimonial.name}</span><span className={cn("mt-1 block text-xs", index === 1 ? "text-white/48" : "text-[#0b2a74]/48")}>{testimonial.role}</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center text-xs leading-5 text-[#5b6c93]">Experiencias de docentes sobre su proceso de aprendizaje; los resultados dependen de cada contexto.</Reveal>
      </div>
    </section>
  );
}

const included = [
  "Dos sesiones en vivo de 2 horas (3 y 5 de noviembre)",
  "Material de apoyo: guías, ejemplos y kit de prompts",
  "Grabaciones disponibles por 30 días",
  "Constancia de participación",
];

function CopyClabeButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(course.clabeRaw);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = course.clabeRaw;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        textarea.remove();
        if (!ok) throw new Error("copy failed");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b2a74]/15 bg-white px-4 text-xs font-bold text-[#0b2a74] transition-colors hover:bg-[#eaf0fa]"
      aria-live="polite"
    >
      {copied ? <Check className="h-4 w-4 text-[#1d5fc9]" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
      {copied ? "CLABE copiada" : "Copiar CLABE"}
    </button>
  );
}

export function Pricing() {
  return (
    <section id="inversion" className="relative overflow-hidden bg-[#e4ecfa] py-24 sm:py-32" aria-labelledby="pricing-title">
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Precio de lanzamiento"
          title={<span id="pricing-title">Un solo pago. <Serif>Todo incluido.</Serif></span>}
          description="Para este primer taller de la serie, el curso completo de dos días tiene un precio especial de lanzamiento. Paga, envía tu comprobante por WhatsApp y tu lugar queda confirmado."
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0a2d8f] via-[#0b2a74] to-[#07194d] p-7 text-white shadow-[0_30px_80px_rgba(11,42,116,0.25)] sm:p-9">
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#1ed8ff]/25 blur-[70px]" aria-hidden="true" />
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.17em] text-[#67e8ff] uppercase">Inscripción individual</span>
                <span className="rounded-full border border-[#67e8ff]/30 bg-[#67e8ff]/10 px-3 py-1.5 text-[9px] font-bold tracking-wide text-[#c6f8ff] uppercase">Lanzamiento</span>
              </div>
              <div className="relative mt-9 flex items-end gap-2">
                <span className="pb-2 text-xl text-white/55">$</span>
                <span className="text-7xl leading-none font-medium tracking-[-0.065em] sm:text-8xl">250</span>
                <span className="pb-2 text-sm font-semibold text-white/55">MXN</span>
              </div>
              <p className="relative mt-3 text-xs text-white/60">Pago único · Incluye material de apoyo · Taller completo de 2 días</p>
              <div className="relative mt-8 space-y-3.5 border-t border-white/10 pt-7">
                {included.map((item) => <div key={item} className="flex items-center gap-3 text-sm text-white/80"><CircleCheck className="h-4 w-4 shrink-0 text-[#67e8ff]" aria-hidden="true" />{item}</div>)}
              </div>
              <a
                href={course.mercadoPagoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-9 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#67e8ff] px-6 py-4 text-sm font-bold text-[#061640] transition-all hover:-translate-y-0.5 hover:bg-[#a5f3ff]"
              >
                <CreditCard className="h-4 w-4" aria-hidden="true" /> Pagar con Mercado Pago <ExternalLink className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <p className="relative mt-3 text-center text-[11px] text-white/50">Se abre en una pestaña nueva · Tarjeta, débito o saldo</p>
            </article>
          </Reveal>

          <Reveal id="pago" delay={0.1} className="h-full scroll-mt-28">
            <article className="flex h-full flex-col rounded-[30px] border border-[#0b2a74]/10 bg-white/75 p-7 backdrop-blur-md sm:p-9">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.17em] text-[#2458b8] uppercase">Formas de pago</span>
                <Landmark className="h-5 w-5 text-[#2458b8]" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-3xl leading-tight font-medium tracking-[-0.045em] text-[#0b2a74]">Elige cómo pagar <Serif>y confirma tu lugar.</Serif></h3>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-[#0b2a74]/8 bg-white p-5">
                  <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dcefff] text-[#1d5fc9]"><CreditCard className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-sm font-bold text-[#0b2a74]">Opción 1 · Mercado Pago</p><p className="text-[11px] text-[#56678f]">Tarjeta, débito o saldo en cuenta</p></div></div>
                  <a href={course.mercadoPagoUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block truncate rounded-xl bg-[#f0f4fb] px-4 py-3 text-xs font-semibold text-[#1a4fb0] underline-offset-4 hover:underline">link.mercadopago.com.mx/windward</a>
                </div>
                <div className="rounded-2xl border border-[#0b2a74]/8 bg-white p-5">
                  <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dcefff] text-[#1d5fc9]"><Landmark className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-sm font-bold text-[#0b2a74]">Opción 2 · Transferencia SPEI</p><p className="text-[11px] text-[#56678f]">Desde cualquier banco en México</p></div></div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="rounded-xl bg-[#f0f4fb] px-4 py-3"><p className="text-[9px] font-bold tracking-[0.16em] text-[#3e5ea8] uppercase">CLABE</p><p className="mt-1 font-mono text-sm font-bold tracking-wide text-[#0b2a74] tabular-nums">{course.clabe}</p></div>
                    <CopyClabeButton />
                  </div>
                  <p className="mt-3 text-[11px] leading-5 text-[#56678f]">Concepto sugerido: <strong className="font-semibold text-[#1f336b]">Taller HTML + tu nombre</strong>. Monto: $250.00 MXN.</p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#dcefff]/60 p-4 text-xs leading-5 text-[#1f336b]">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1d5fc9]" aria-hidden="true" />
                <p><strong className="font-bold">Último paso:</strong> registra tus datos en el formulario y envía tu comprobante por WhatsApp al <a href={course.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">{course.whatsappDisplay}</a>. Recibirás confirmación y el enlace de acceso.</p>
              </div>
              <ButtonLink href="#/confirmar" variant="dark" className="mt-5 w-full" arrow>Ya pagué · Confirmar mi inscripción</ButtonLink>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  return (
    <section id="faq" className="bg-[#fafbfe] py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:px-12">
        <div>
          <SectionHeading eyebrow="Preguntas frecuentes" title={<span id="faq-title">Antes de <Serif>comenzar.</Serif></span>} description="Todo lo que necesitas para decidir si este taller encaja con tu clase y tu momento." />
          <Reveal delay={0.1} className="mt-7">
            <p className="text-xs text-[#56678f]">¿Tienes otra pregunta?</p>
            <a href={`${course.whatsappUrl}?text=${encodeURIComponent(whatsappMessages.pregunta)}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#1a4fb0] underline decoration-[#1a4fb0]/25 underline-offset-4 hover:decoration-[#1a4fb0]">Escríbenos por WhatsApp · {course.whatsappDisplay} <ArrowRight className="h-4 w-4" /></a>
          </Reveal>
        </div>
        <Reveal y={25}>
          <div className="border-t border-[#0b2a74]/12">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.question} className="border-b border-[#0b2a74]/12">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="group flex w-full items-center justify-between gap-5 py-6 text-left"
                    >
                      <span className="text-base leading-6 font-semibold tracking-[-0.02em] text-[#132a63] sm:text-lg">{faq.question}</span>
                      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300", isOpen ? "rotate-180 border-[#0b2a74] bg-[#0b2a74] text-white" : "border-[#0b2a74]/12 text-[#0b2a74] group-hover:bg-[#eaf0fa]")}><ChevronDown className="h-4 w-4" aria-hidden="true" /></span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pr-12 pb-7 text-sm leading-7 text-[#4a5b85]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-[#fafbfe] px-4 pb-4 sm:px-6 sm:pb-6" aria-labelledby="final-cta-title">
      <Reveal y={40}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[34px] bg-[#061640] px-5 py-20 text-center text-white sm:px-10 sm:py-28">
          <div className="absolute top-[-40%] left-[5%] h-[500px] w-[500px] rounded-full bg-[#22c1e8]/20 blur-[120px]" aria-hidden="true" />
          <div className="absolute right-[2%] bottom-[-55%] h-[500px] w-[500px] rounded-full bg-[#1d6fe0]/25 blur-[120px]" aria-hidden="true" />
          <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-50 360C240 90 480 500 760 190C930 10 1060 130 1260 20" stroke="#67e8ff" />
            <path d="M-50 420C240 150 480 560 760 250C930 70 1060 190 1260 80" stroke="#67e8ff" />
          </svg>
          <div className="relative mx-auto max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#7deeff] uppercase"><MonitorPlay className="h-3.5 w-3.5" />3 y 5 de noviembre · 7:00 a 9:00 p.m. CDMX · En línea</div>
            <h2 id="final-cta-title" className="text-balance text-[clamp(2.9rem,6vw,6rem)] leading-[0.94] font-medium tracking-[-0.065em]">Tu próxima unidad puede ser <span className="font-serif font-normal text-[#67e8ff] italic">interactiva.</span></h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/58 sm:text-lg">Cuatro horas para crear flashcards, gramática, listening y juegos con IA, HTML y CSS. Material de apoyo incluido y precio de lanzamiento de solo $250 pesos.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`${course.whatsappUrl}?text=${encodeURIComponent(whatsappMessages.inscribirme)}`} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 text-base font-extrabold text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#1fbf5b]"><MessageCircle className="h-5 w-5" aria-hidden="true" />¡Inscríbete! {course.whatsappDisplay}</a>
              <ButtonLink href="#pago" variant="ghost">Ver formas de pago</ButtonLink>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-white/55"><Video className="h-3.5 w-3.5" />En vivo · No necesitas saber programar · Material de apoyo incluido</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function UpcomingCourses() {
  return (
    <section id="proximos" className="relative overflow-hidden bg-[#061640] py-24 text-white sm:py-32" aria-labelledby="upcoming-title">
      <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#0a58e0]/30 blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-30%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[#1ed8ff]/15 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Serie Creación Digital"
            title={<span id="upcoming-title">Este taller es el primero.<br />Vienen <Serif>más.</Serif></span>}
            description="Windward Academy está construyendo una serie de cursos cortos y prácticos para que docentes y personal educativo creen con IA. Estos son los siguientes en camino."
            inverse
          />
          <Reveal delay={0.15}>
            <a
              href={`${course.whatsappUrl}?text=${encodeURIComponent(whatsappMessages.proximos)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/[0.12]"
            >
              <Bell className="h-4 w-4 text-[#67e8ff]" aria-hidden="true" />Avísame por WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0a58e0] to-[#1ed8ff] p-6 text-white shadow-[0_24px_60px_rgba(10,88,224,0.35)]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[9px] font-bold tracking-wide uppercase"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />Inscripciones abiertas</span>
              <p className="mt-6 text-[10px] font-bold tracking-[0.16em] text-white/75 uppercase">Maestros de idiomas</p>
              <h3 className="mt-2 text-xl leading-tight font-bold tracking-[-0.03em]">IA para crear materiales interactivos con HTML y CSS</h3>
              <p className="mt-3 text-sm leading-6 text-white/85">3 y 5 de noviembre · 7:00 a 9:00 p.m. · $250 MXN</p>
              <a href="#registro" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold underline decoration-white/40 underline-offset-4 hover:decoration-white">Inscribirme <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            </article>
          </Reveal>
          {upcomingCourses.slice(0, 3).map((item, index) => (
            <Reveal key={item.title} delay={(index + 1) * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-[26px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#67e8ff]/40 hover:bg-white/[0.08]">
                <span className="inline-flex w-fit items-center rounded-full border border-white/15 px-3 py-1.5 text-[9px] font-bold tracking-wide text-white/70 uppercase">{item.status}</span>
                <p className="mt-6 text-[10px] font-bold tracking-[0.16em] text-[#67e8ff] uppercase">{item.tag}</p>
                <h3 className="mt-2 text-xl leading-tight font-bold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p>
                <p className="mt-auto pt-6 text-xs text-white/40">Fecha por anunciar</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-5">
          <div className="flex flex-col gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#67e8ff] uppercase">{upcomingCourses[3].tag} · {upcomingCourses[3].status}</p>
              <p className="mt-1 text-base font-bold">{upcomingCourses[3].title}</p>
              <p className="mt-1 text-sm text-white/60">{upcomingCourses[3].text}</p>
            </div>
            <p className="text-xs text-white/45">Las personas inscritas al primer taller reciben acceso prioritario a los siguientes.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

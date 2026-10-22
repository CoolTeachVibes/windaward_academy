import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, CircleAlert, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "../utils/cn";

const storyImage =
  "https://images.pexels.com/photos/8197513/pexels-photo-8197513.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const methodSteps = [
  { number: "01", title: "Describe", text: "Idioma, nivel, tema y cómo quieres que funcione la actividad." },
  { number: "02", title: "Genera", text: "La IA escribe el HTML, el CSS y la lógica en un solo archivo." },
  { number: "03", title: "Prueba", text: "Ábrelo en tu navegador, úsalo en el celular, detecta qué mejorar." },
  { number: "04", title: "Ajusta", text: "Cambia textos, colores e imágenes con lo esencial que aprendes." },
];

export default function ScrollStory() {
  const target = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [compactLayout, setCompactLayout] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches,
  );
  const reduceMotion = prefersReducedMotion || compactLayout;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const updateLayout = () => setCompactLayout(query.matches);
    updateLayout();
    query.addEventListener("change", updateLayout);
    return () => query.removeEventListener("change", updateLayout);
  }, []);

  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });

  const firstOpacity = useTransform(scrollYProgress, [0, 0.27, 0.36], [1, 1, 0.25]);
  const firstScale = useTransform(scrollYProgress, [0, 0.36], [1, reduceMotion ? 1 : 0.96]);
  const imageScale = useTransform(scrollYProgress, [0, 0.36], [1.04, reduceMotion ? 1.04 : 1.2]);

  const secondOpacity = useTransform(scrollYProgress, [0.25, 0.34, 0.62, 0.7], [0, 1, 1, 0.35]);
  const secondClip = useTransform(
    scrollYProgress,
    [0.25, 0.4, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const secondContentY = useTransform(scrollYProgress, [0.27, 0.46], [65, 0]);
  const convergence = useTransform(scrollYProgress, [0.3, 0.51], [0, 1]);

  const thirdOpacity = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);
  const thirdClip = useTransform(
    scrollYProgress,
    [0.61, 0.79, 1],
    ["circle(0% at 78% 50%)", "circle(145% at 78% 50%)", "circle(145% at 78% 50%)"],
  );
  const thirdY = useTransform(scrollYProgress, [0.64, 0.85], [70, 0]);

  const cardX = [
    useTransform(convergence, [0, 1], [-110, 0]),
    useTransform(convergence, [0, 1], [100, 0]),
    useTransform(convergence, [0, 1], [-90, 0]),
    useTransform(convergence, [0, 1], [120, 0]),
  ];
  const cardY = [
    useTransform(convergence, [0, 1], [-55, 0]),
    useTransform(convergence, [0, 1], [-85, 0]),
    useTransform(convergence, [0, 1], [75, 0]),
    useTransform(convergence, [0, 1], [90, 0]),
  ];

  return (
    <section
      ref={target}
      aria-label="Del PDF estático al material interactivo"
      className={cn("relative bg-[#061640]", reduceMotion ? "" : "h-[320svh]")}
    >
      <div className={cn(reduceMotion ? "" : "sticky top-0 h-[100svh] overflow-hidden")}>
        <motion.article
          style={reduceMotion ? undefined : { opacity: firstOpacity, scale: firstScale }}
          className={cn(
            "overflow-hidden bg-[#061640] text-white",
            reduceMotion ? "relative min-h-[100svh]" : "absolute inset-0",
          )}
        >
          <motion.img
            src={storyImage}
            alt=""
            aria-hidden="true"
            style={reduceMotion ? undefined : { scale: imageScale }}
            className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061640] via-[#061640]/90 to-[#061640]/45" />
          <div className="story-noise absolute inset-0 opacity-25" aria-hidden="true" />
          <div className="relative mx-auto grid min-h-[100svh] max-w-[1380px] items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-14">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-white/45 uppercase">
                <span className="text-[#7deeff]">01</span><span className="h-px w-8 bg-white/20" /> El punto de partida
              </div>
              <h2 className="text-balance text-[clamp(2.8rem,6vw,6.2rem)] leading-[0.95] font-medium tracking-[-0.065em]">
                Un PDF más no hace que tus alumnos <span className="font-serif font-normal text-[#67e8ff] italic">practiquen más.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/58 md:text-lg md:leading-8">
                Hojas de trabajo, listas de vocabulario, presentaciones que nadie vuelve a abrir. Crear materiales que realmente respondan al alumno parecía reservado para quien sabe programar o paga plataformas.
              </p>
            </div>

            <div className="relative mx-auto hidden h-[480px] w-full max-w-[520px] sm:block">
              <motion.div
                animate={reduceMotion ? undefined : { rotate: [-4, -2, -4], y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-4 w-[78%] rounded-[26px] border border-white/12 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl"
              >
                <p className="text-[10px] font-bold tracking-[0.17em] text-white/40 uppercase">worksheet_unit3_final_v2.pdf</p>
                <p className="mt-5 font-serif text-3xl leading-tight text-white/90 italic">“Complete the sentences. Check your answers next class.”</p>
                <div className="mt-8 h-2 w-full rounded-full bg-white/8" />
                <div className="mt-3 h-2 w-4/5 rounded-full bg-white/8" />
                <div className="mt-3 h-2 w-3/5 rounded-full bg-white/8" />
              </motion.div>
              {[
                { label: "Sin retroalimentación inmediata", position: "top-[270px] right-0", rotate: "rotate-[5deg]" },
                { label: "Plataformas de pago por alumno", position: "bottom-[5px] left-0", rotate: "-rotate-[4deg]" },
              ].map((note) => (
                <div key={note.label} className={cn("absolute flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12317f]/90 px-5 py-4 text-sm text-white/75 shadow-xl backdrop-blur-lg", note.position, note.rotate)}>
                  <CircleAlert className="h-4 w-4 text-[#e6b6a8]" aria-hidden="true" />{note.label}
                </div>
              ))}
            </div>
          </div>
        </motion.article>

        <motion.article
          style={reduceMotion ? undefined : { opacity: secondOpacity, clipPath: secondClip }}
          className={cn(
            "overflow-hidden bg-[#e6eefb] text-[#0b2a74]",
            reduceMotion ? "relative min-h-[100svh]" : "absolute inset-0",
          )}
        >
          <div className="absolute top-[-30%] right-[-10%] h-[700px] w-[700px] rounded-full border border-[#0b2a74]/8" aria-hidden="true" />
          <div className="absolute top-[-20%] right-[-2%] h-[540px] w-[540px] rounded-full border border-[#0b2a74]/8" aria-hidden="true" />
          <motion.div
            style={reduceMotion ? undefined : { y: secondContentY }}
            className="relative mx-auto grid min-h-[100svh] max-w-[1380px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-14"
          >
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#3e5ea8] uppercase">
                <span>02</span><span className="h-px w-8 bg-[#0b2a74]/20" /> El método Windward
              </div>
              <h2 className="text-balance text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[0.96] font-medium tracking-[-0.065em]">
                Tú describes la actividad. La IA escribe <span className="font-serif font-normal text-[#1d5fc9] italic">el código.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#3d4f7a] md:text-lg md:leading-8">
                Un flujo de cuatro pasos que repetirás para cada unidad del ciclo escolar. Sin instalar nada, sin cuentas de pago y sin depender de un programador.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {methodSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  style={reduceMotion ? undefined : { x: cardX[index], y: cardY[index], opacity: convergence }}
                  className="relative min-h-[175px] rounded-[24px] border border-[#0b2a74]/10 bg-white/65 p-5 shadow-[0_20px_60px_rgba(18,58,50,0.07)] backdrop-blur-md sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#3e5ea8]">{step.number}</span>
                    {index === 3 ? <ShieldCheck className="h-5 w-5 text-[#1d5fc9]" aria-hidden="true" /> : <ArrowRight className="h-4 w-4 text-[#0b2a74]/30" aria-hidden="true" />}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4a5b85]">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.article>

        <motion.article
          style={reduceMotion ? undefined : { opacity: thirdOpacity, clipPath: thirdClip }}
          className={cn(
            "overflow-hidden bg-[radial-gradient(110%_90%_at_90%_10%,#0a58e0_0%,#0b2a74_45%,#06173f_85%)] text-white",
            reduceMotion ? "relative min-h-[100svh]" : "absolute inset-0",
          )}
        >
          <div className="absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full bg-[#1d6fe0]/25 blur-[120px]" aria-hidden="true" />
          <div className="absolute -right-40 -bottom-40 h-[580px] w-[580px] rounded-full bg-[#22c1e8]/15 blur-[120px]" aria-hidden="true" />
          <motion.div
            style={reduceMotion ? undefined : { y: thirdY }}
            className="relative mx-auto grid min-h-[100svh] max-w-[1380px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-14"
          >
            <div>
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                <span className="text-[#7deeff]">03</span><span className="h-px w-8 bg-white/20" /> El resultado
              </div>
              <h2 className="text-balance text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[0.96] font-medium tracking-[-0.065em]">
                Sales con materiales que tus alumnos usan <span className="font-serif font-normal text-[#7deeff] italic">el lunes.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/58 md:text-lg md:leading-8">
                No terminas con teoría. Terminas con flashcards, un ejercicio de gramática, una actividad de listening y un juego funcionando en tu computadora y en el celular de tus estudiantes.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Flashcards", "Gramática", "Listening", "Juegos"].map((item) => (
                  <span key={item} className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-xs text-white/72">{item}</span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[590px]">
              <div className="absolute -inset-8 rounded-full bg-[#38d4ff]/12 blur-[60px]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#f6f8fd] text-[#12275e] shadow-[0_40px_100px_rgba(0,0,0,0.28)]">
                <div className="flex items-center justify-between border-b border-[#12275e]/10 px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dcefff] text-[#1a4fb0]"><FileText className="h-4 w-4" aria-hidden="true" /></span>
                    <div><p className="text-xs font-bold">unit3_flashcards.html</p><p className="mt-0.5 text-[10px] text-[#12275e]/45">Creado en el taller · 1 archivo</p></div>
                  </div>
                  <span className="rounded-full bg-[#d8ecff] px-3 py-1.5 text-[9px] font-bold tracking-wide text-[#1a4fb0] uppercase">Funciona sin internet</span>
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-[10px] font-bold tracking-[0.16em] text-[#3e5ea8] uppercase">Tu kit de la unidad 3</p>
                  <h3 className="mt-3 font-serif text-2xl italic sm:text-3xl">Around the city.</h3>
                  <div className="mt-6 space-y-3">
                    {[
                      ["01", "Flashcards · 12 tarjetas", "Imagen, palabra, audio y ejemplo. Se voltean al tocar."],
                      ["02", "Gramática · Present simple", "8 oraciones autocorregibles con explicación."],
                      ["03", "Memorama · 8 pares", "Temporizador, intentos y mensaje de victoria."],
                    ].map(([number, title, text]) => (
                      <div key={number} className="flex gap-4 rounded-2xl border border-[#12275e]/8 bg-white p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dcefff] text-[10px] font-bold text-[#1d5fc9]">{number}</span>
                        <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-[#12275e]/55">{text}</p></div>
                        <Check className="ml-auto h-4 w-4 shrink-0 text-[#1d8fe0]" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold text-[#12275e]/45"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> La IA escribió el código. El contenido y la pedagogía son tuyos.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.article>

        {!reduceMotion && (
          <div className="pointer-events-none absolute right-5 bottom-6 z-10 flex items-center gap-3 sm:right-8" aria-hidden="true">
            <span className="text-[9px] font-bold tracking-[0.17em] text-white/40 uppercase mix-blend-difference">El recorrido</span>
            <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20">
              <motion.div className="h-full origin-left rounded-full bg-[#67e8ff]" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

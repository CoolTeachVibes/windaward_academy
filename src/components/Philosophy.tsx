import { motion, useReducedMotion } from "framer-motion";
import { Rocket, Sparkles, Workflow } from "lucide-react";
import { philosophy } from "../content";
import { Reveal, WindwardMark } from "./ui";

const pillars = [
  {
    icon: Sparkles,
    title: "Docentes que crean",
    text: "Pasamos de consumir herramientas a diseñar experiencias de aprendizaje propias, asistidas por IA y guiadas por criterio pedagógico.",
  },
  {
    icon: Workflow,
    title: "Procesos que fluyen",
    text: "Dotamos a personal administrativo y coordinación de herramientas para optimizar y automatizar procesos largos y repetitivos.",
  },
  {
    icon: Rocket,
    title: "Futuro que se construye",
    text: "Cada taller termina con creaciones reales: materiales interactivos, evaluaciones y flujos que se usan desde la siguiente semana.",
  },
];

export default function Philosophy() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="filosofia" className="relative overflow-hidden bg-[#fafbfe] py-24 sm:py-32" aria-labelledby="philosophy-title">
      <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dcefff]/70 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto w-fit"
          >
            <WindwardMark className="h-20 w-20 drop-shadow-[0_18px_40px_rgba(10,88,224,0.35)] sm:h-24 sm:w-24" />
          </motion.div>
          <div className="mt-8 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.19em] text-[#1d5fc9] uppercase">
            <span className="h-px w-7 bg-[#1d5fc9]/45" />Nuestra filosofía<span className="h-px w-7 bg-[#1d5fc9]/45" />
          </div>
          <h2 id="philosophy-title" className="mt-5 text-balance text-[clamp(2.4rem,5.6vw,5.2rem)] leading-[1.0] font-medium tracking-[-0.06em] text-[#0b2a74]">
            Transformando maestros en <em className="bg-gradient-to-r from-[#0a58e0] to-[#1ed8ff] bg-clip-text font-serif font-normal tracking-[-0.025em] text-transparent italic">creadores digitales.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#3d4f7a] md:text-lg md:leading-8">{philosophy.statement}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 0.09} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[26px] border border-[#0b2a74]/9 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(11,42,116,0.1)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0a2d8f] via-[#0a58e0] to-[#1ed8ff] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a58e0] to-[#1ed8ff] text-white shadow-[0_10px_24px_rgba(10,88,224,0.3)]">
                    <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em] text-[#0b2a74]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#4a5b85]">{pillar.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

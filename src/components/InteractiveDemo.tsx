import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Play, Pause, Volume2, X } from "lucide-react";
import { cn } from "../utils/cn";

const vocabulary = [
  { word: "bus", emoji: "🚌" },
  { word: "bridge", emoji: "🌉" },
  { word: "phone booth", emoji: "☎️" },
];

const grammarOptions = [
  { label: "go", correct: false },
  { label: "goes", correct: true },
  { label: "going", correct: false },
];

const listeningOptions = ["library", "café", "airport"];

/** Mockup funcional de los materiales que se crean en el taller. */
export default function InteractiveDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState<number | null>(null);
  const [grammarChoice, setGrammarChoice] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [listeningChoice, setListeningChoice] = useState<string | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPlaying(false), 4200);
    return () => window.clearTimeout(timer);
  }, [playing]);

  const float = (distance = 8) => (reduceMotion ? undefined : { y: [0, -distance, 0] });

  return (
    <div className={cn("relative mx-auto w-full max-w-[600px]", className)} aria-label="Ejemplos de materiales interactivos creados en el taller">
      <div className="absolute inset-10 rounded-full bg-[#1ed8ff]/20 blur-[70px]" aria-hidden="true" />

      {/* Vocabulary game */}
      <motion.div
        animate={float(8)}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[22px] border border-white/60 bg-white/92 p-4 text-[#0b2a74] shadow-[0_30px_80px_rgba(4,16,47,0.35)] backdrop-blur-xl sm:p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex gap-1" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
            <span className="ml-2 text-xs font-bold">Vocabulary Game</span>
          </div>
          <span className="rounded-full bg-[#dcefff] px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#1a4fb0] uppercase">Flashcards</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {vocabulary.map((item, index) => {
            const isFlipped = flipped === index;
            return (
              <button
                key={item.word}
                type="button"
                onClick={() => setFlipped(isFlipped ? null : index)}
                aria-pressed={isFlipped}
                aria-label={`Tarjeta ${item.word}`}
                className="group/card relative aspect-[4/5] [perspective:800px]"
              >
                <motion.span
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 block [transform-style:preserve-3d]"
                >
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-[#eaf3ff] to-[#d6e8ff] text-[#0b2a74] [backface-visibility:hidden]">
                    <span className="text-3xl sm:text-4xl" aria-hidden="true">{item.emoji}</span>
                    <span className="text-[11px] font-bold">{item.word}</span>
                  </span>
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-[#0a58e0] to-[#1ed8ff] px-2 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-[9px] tracking-wide uppercase opacity-70">español</span>
                    <span className="text-[11px] font-bold">{item.word === "bus" ? "autobús" : item.word === "bridge" ? "puente" : "cabina"}</span>
                  </span>
                </motion.span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-[#5b6c93]">Toca una tarjeta para voltearla</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a58e0] px-3 py-1.5 text-[10px] font-bold text-white"><Volume2 className="h-3 w-3" aria-hidden="true" />Check</span>
        </div>
      </motion.div>

      {/* Grammar practice */}
      <motion.div
        animate={float(10)}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="relative -mt-4 ml-auto w-[88%] rounded-[20px] border border-white/60 bg-white/95 p-4 text-[#0b2a74] shadow-[0_24px_60px_rgba(4,16,47,0.3)] backdrop-blur-xl sm:-mt-6 sm:w-[78%]"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Grammar Practice</span>
          <span className="rounded-full bg-[#ece6ff] px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#3b2a8f] uppercase">Gramática</span>
        </div>
        <p className="mt-2 text-[12px] text-[#2c3f72]">
          She <span className="inline-block min-w-12 border-b-2 border-dashed border-[#0a58e0] text-center font-bold text-[#0a58e0]">{grammarChoice ?? "____"}</span> to school every day.
        </p>
        <div className="mt-3 space-y-1.5" role="group" aria-label="Opciones de respuesta">
          {grammarOptions.map((option) => {
            const chosen = grammarChoice === option.label;
            const showResult = grammarChoice !== null;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setGrammarChoice(option.label)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-3 py-1.5 text-left text-[12px] transition-colors",
                  chosen && option.correct && "border-[#1fbf5b] bg-[#e8f9ef] text-[#146c3a]",
                  chosen && !option.correct && "border-[#ff6b5b] bg-[#fff0ee] text-[#9b2d1f]",
                  !chosen && showResult && option.correct && "border-[#1fbf5b]/40 bg-[#f1fbf5]",
                  !chosen && !(showResult && option.correct) && "border-[#0b2a74]/10 hover:bg-[#f3f6fc]",
                )}
              >
                <span className="inline-flex items-center gap-2"><span className={cn("h-3 w-3 rounded-full border", chosen ? "border-current bg-current" : "border-[#0b2a74]/30")} aria-hidden="true" />{option.label}</span>
                {showResult && option.correct && <Check className="h-3.5 w-3.5 text-[#1fbf5b]" aria-hidden="true" />}
                {chosen && !option.correct && <X className="h-3.5 w-3.5 text-[#ff6b5b]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        {grammarChoice && (
          <p className="mt-2 text-[10px] leading-4 text-[#5b6c93]" role="status">
            {grammarChoice === "goes" ? "✅ Correcto: tercera persona del singular en presente simple." : "Casi: con “she” el verbo lleva -es en presente simple."}
          </p>
        )}
      </motion.div>

      {/* Listening */}
      <motion.div
        animate={float(7)}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="relative -mt-5 w-[82%] rounded-[20px] border border-white/60 bg-white/95 p-4 text-[#0b2a74] shadow-[0_24px_60px_rgba(4,16,47,0.3)] backdrop-blur-xl sm:w-[66%]"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Listening Activity</span>
          <span className="rounded-full bg-[#dcf7ec] px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#145c43] uppercase">Listening</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
            aria-label={playing ? "Pausar ejemplo de audio" : "Reproducir ejemplo de audio"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a58e0] text-white shadow-[0_8px_20px_rgba(10,88,224,0.35)]"
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />}
          </button>
          <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, index) => (
              <motion.span
                key={index}
                className="w-[3px] rounded-full bg-[#0a58e0]"
                animate={playing && !reduceMotion ? { height: ["20%", `${35 + ((index * 37) % 60)}%`, "20%"] } : { height: `${18 + ((index * 23) % 50)}%` }}
                transition={{ duration: 0.8 + (index % 4) * 0.15, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
                style={{ height: `${18 + ((index * 23) % 50)}%` }}
              />
            ))}
          </div>
        </div>
        <p className="mt-3 text-[11px] text-[#2c3f72]">Where is she going?</p>
        <div className="mt-1.5 grid gap-1">
          {listeningOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => setListeningChoice(option)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition-colors",
                listeningChoice === option ? (option === "library" ? "bg-[#e8f9ef] text-[#146c3a]" : "bg-[#fff0ee] text-[#9b2d1f]") : "hover:bg-[#f3f6fc]",
              )}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#eaf0fa] text-[10px] font-bold">{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          ))}
        </div>
      </motion.div>

      {/* HTML / CSS chips */}
      <motion.div
        animate={float(6)}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[46%] -right-1 flex flex-col gap-2 sm:right-0"
        aria-hidden="true"
      >
        <span className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6a3d] to-[#e34c26] text-white shadow-[0_14px_30px_rgba(227,76,38,0.35)] sm:h-16 sm:w-16">
          <span className="text-[10px] font-extrabold">HTML</span>
          <span className="font-mono text-[12px] font-bold">&lt;/&gt;</span>
        </span>
        <span className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f7df6] to-[#1446b8] text-white shadow-[0_14px_30px_rgba(20,70,184,0.35)] sm:h-16 sm:w-16">
          <span className="text-[10px] font-extrabold">CSS</span>
          <span className="font-mono text-[12px] font-bold">{"{ }"}</span>
        </span>
      </motion.div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Clipboard, Download, RotateCcw, ShieldCheck, WandSparkles } from "lucide-react";
import { promptObjectives } from "../content";
import { Reveal, SectionHeading, Serif } from "./ui";
import { cn } from "../utils/cn";

const initialValues = {
  objective: "flashcards",
  discipline: "Inglés · Vocabulario de la ciudad (bus, bridge, phone booth…)",
  level: "A2 · Básico alto",
  context: "Estudiantes de secundaria, 13–14 años. Lo usarán en su celular y proyectado en clase. Colores alegres, letra grande.",
};

async function copyText(text: string) {
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
  const successful = document.execCommand("copy");
  textarea.remove();
  if (!successful) throw new Error("No se pudo copiar");
}

export default function PromptStudio() {
  const [values, setValues] = useState(initialValues);
  const [notice, setNotice] = useState<"copied" | "downloaded" | "error" | null>(null);
  const reduceMotion = useReducedMotion();
  const selected = promptObjectives.find((item) => item.id === values.objective) ?? promptObjectives[0];

  const prompt = useMemo(
    () => `Actúa como desarrollador web experto en materiales educativos para idiomas. Crea ${selected.material} en un solo archivo HTML con el CSS y el JavaScript incluidos dentro del mismo archivo, listo para abrir en cualquier navegador sin instalar nada.

CONTENIDO
• Idioma y tema: ${values.discipline.trim() || "[indica idioma y tema, p. ej. Inglés · Comida]"}
• Nivel de los estudiantes: ${values.level}
• Contexto de uso: ${values.context.trim() || "[edad del grupo, dónde lo usarán, estilo visual deseado]"}

FUNCIONAMIENTO
${selected.spec}

REQUISITOS TÉCNICOS
1. Un solo archivo .html, sin librerías externas ni conexión a internet.
2. Diseño responsivo: debe verse bien en celular y proyectado en pantalla grande.
3. Botones grandes, buen contraste y textos legibles; accesible con teclado.
4. Todo el contenido (palabras, oraciones, respuestas) en una lista al inicio del código, claramente comentada, para que yo pueda editarla sin tocar el resto.
5. Sin datos personales, sin seguimiento, sin anuncios.

ENTREGA
• Primero, el código completo en un solo bloque.
• Después, en 5 líneas, explícame cómo guardarlo, abrirlo y qué parte editar para cambiar el contenido.

Si falta información esencial, hazme hasta dos preguntas antes de generar el código.`,
    [values, selected],
  );

  const showNotice = (type: NonNullable<typeof notice>) => {
    setNotice(type);
    window.setTimeout(() => setNotice(null), 3000);
  };

  const handleCopy = async () => {
    try {
      await copyText(prompt);
      showNotice("copied");
    } catch {
      showNotice("error");
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(new Blob([prompt], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `prompt-${values.objective}-html-windward.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showNotice("downloaded");
  };

  return (
    <section id="laboratorio" className="relative overflow-hidden bg-[radial-gradient(90%_70%_at_100%_100%,#0a3fb5_0%,#07194d_55%)] py-24 text-white sm:py-32" aria-labelledby="studio-title">
      <div className="studio-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-[#1d6fe0]/18 blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Prueba una parte del taller"
            title={<span id="studio-title">Tu primer prompt para crear <Serif>material interactivo.</Serif></span>}
            description="Elige el tipo de material, describe tu tema y copia el prompt. Pégalo en tu herramienta de IA favorita y obtendrás un archivo HTML funcional. En el taller aprenderás a refinarlo, personalizarlo y publicarlo."
            inverse
          />
          <Reveal delay={0.15} className="flex items-center gap-2 text-xs text-white/48 lg:pb-2">
            <ShieldCheck className="h-4 w-4 text-[#7deeff]" aria-hidden="true" />
            Se genera en tu navegador. Nada se envía.
          </Reveal>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.045] shadow-[0_35px_100px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal className="border-b border-white/10 p-5 sm:p-8 lg:border-r lg:border-b-0" y={20}>
            <form onSubmit={(event) => { event.preventDefault(); void handleCopy(); }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#67e8ff] text-[#07194d]"><WandSparkles className="h-4 w-4" aria-hidden="true" /></span>
                  <div><h3 className="text-sm font-bold">Constructor de prompt</h3><p className="mt-1 text-[11px] text-white/42">Genera HTML + CSS con tu IA favorita</p></div>
                </div>
                <button
                  type="button"
                  onClick={() => setValues(initialValues)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/8 hover:text-white"
                  aria-label="Restablecer los valores de ejemplo"
                  title="Restablecer"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <fieldset className="mt-8">
                <legend className="text-[10px] font-bold tracking-[0.17em] text-white/50 uppercase">1. ¿Qué material quieres crear?</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {promptObjectives.map((objective) => (
                    <button
                      key={objective.id}
                      type="button"
                      aria-pressed={values.objective === objective.id}
                      onClick={() => setValues((current) => ({ ...current, objective: objective.id }))}
                      className={cn(
                        "relative min-h-12 rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-colors",
                        values.objective === objective.id
                          ? "border-[#7deeff]/35 bg-[#7deeff]/10 text-[#c6f8ff]"
                          : "border-white/9 bg-white/[0.03] text-white/52 hover:bg-white/[0.07] hover:text-white",
                      )}
                    >
                      {values.objective === objective.id && (
                        <motion.span layoutId="selected-objective" className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#7deeff]" transition={{ duration: reduceMotion ? 0 : 0.3 }} />
                      )}
                      {objective.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-bold tracking-[0.17em] text-white/50 uppercase">2. Idioma y tema</span>
                  <input
                    value={values.discipline}
                    onChange={(event) => setValues((current) => ({ ...current, discipline: event.target.value }))}
                    maxLength={90}
                    className="mt-3 h-12 w-full rounded-xl border border-white/10 bg-[#04102f]/45 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#7deeff]/60"
                    placeholder="Ej. Francés · Los alimentos"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold tracking-[0.17em] text-white/50 uppercase">3. Nivel</span>
                  <select
                    value={values.level}
                    onChange={(event) => setValues((current) => ({ ...current, level: event.target.value }))}
                    className="mt-3 h-12 w-full rounded-xl border border-white/10 bg-[#04102f]/45 px-4 text-sm text-white outline-none transition-colors focus:border-[#7deeff]/60"
                  >
                    <option className="bg-[#07194d]">A1 · Principiante</option>
                    <option className="bg-[#07194d]">A2 · Básico alto</option>
                    <option className="bg-[#07194d]">B1 · Intermedio</option>
                    <option className="bg-[#07194d]">B2 · Intermedio alto</option>
                    <option className="bg-[#07194d]">C1 · Avanzado</option>
                    <option className="bg-[#07194d]">Niños · Primaria</option>
                  </select>
                </label>
              </div>

              <label className="mt-6 block">
                <span className="text-[10px] font-bold tracking-[0.17em] text-white/50 uppercase">4. Contexto y estilo</span>
                <textarea
                  value={values.context}
                  onChange={(event) => setValues((current) => ({ ...current, context: event.target.value }))}
                  maxLength={280}
                  rows={4}
                  className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-[#04102f]/45 px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#7deeff]/60"
                  placeholder="Edad del grupo, dónde lo usarán, colores o estilo…"
                />
                <span className="mt-1.5 block text-right text-[10px] text-white/28 tabular-nums">{values.context.length}/280</span>
              </label>
            </form>
          </Reveal>

          <Reveal delay={0.12} className="flex min-w-0 flex-col bg-[#f0f4fb] p-5 text-[#0f2f7c] sm:p-8" y={20}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.17em] text-[#3e5ea8] uppercase">Vista previa en tiempo real</p>
                <p className="mt-1 text-xs text-[#0f2f7c]/48">Edita los campos para adaptar la plantilla</p>
              </div>
              <span className="rounded-full border border-[#0f2f7c]/10 px-3 py-1.5 text-[10px] font-semibold text-[#0f2f7c]/50">{prompt.length} caracteres</span>
            </div>
            <pre className="mt-5 max-h-[480px] min-h-[360px] flex-1 overflow-auto rounded-2xl border border-[#0f2f7c]/9 bg-white p-5 font-sans text-[12px] leading-6 whitespace-pre-wrap text-[#2c3f72] shadow-inner sm:p-6 sm:text-[13px]">{prompt}</pre>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void handleCopy()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0b2a74] px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#123a9a]"
              >
                <Clipboard className="h-4 w-4" aria-hidden="true" /> Copiar plantilla
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b2a74]/15 px-5 text-sm font-bold text-[#0b2a74] transition-colors hover:bg-white"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> Descargar .txt
              </button>
            </div>
            <p className="mt-4 text-[10px] leading-4 text-[#0f2f7c]/60">Esta herramienta construye el prompt con tus datos; no invoca IA. Pégalo en ChatGPT, Gemini, Claude o la herramienta que uses, guarda el resultado como archivo .html y ábrelo en tu navegador.</p>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {notice && (
          <motion.div
            role="status"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-[#0f2f7c] px-5 py-3 text-xs font-semibold whitespace-nowrap text-white shadow-2xl"
          >
            {notice === "error" ? <Clipboard className="h-4 w-4" /> : <Check className="h-4 w-4 text-[#7deeff]" />}
            {notice === "copied" && "Plantilla copiada al portapapeles"}
            {notice === "downloaded" && "Archivo de texto descargado"}
            {notice === "error" && "No se pudo copiar. Selecciona el texto manualmente."}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../config";

const message =
  "Hola, Windward Academy 👋 Me interesa el Taller Intensivo de IA + HTML y CSS para maestros de idiomas (3 y 5 de noviembre). ¿Me comparten los pasos para inscribirme?";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escribir por WhatsApp al ${WHATSAPP_DISPLAY}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed right-4 bottom-4 z-[60] flex h-14 items-center gap-0 rounded-full bg-[#25D366] pr-0 pl-0 text-white shadow-[0_14px_40px_rgba(37,211,102,0.4)] transition-all hover:pr-5 sm:right-6 sm:bottom-6"
        >
          <span className="flex h-14 w-14 items-center justify-center">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100 group-focus-visible:max-w-[200px] group-focus-visible:opacity-100">
            ¡Inscríbete!
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

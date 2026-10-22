import {
  BookOpenCheck,
  Code2,
  Gamepad2,
  Headphones,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const course = {
  name: "IA para crear materiales interactivos con HTML y CSS",
  shortName: "Taller intensivo · HTML y CSS con IA",
  kicker: "Taller intensivo",
  audience: "para maestros de idiomas",
  dates: "3 y 5 de noviembre de 2026",
  schedule: "19:00–21:00 h",
  timezone: "Ciudad de México (UTC−6)",
  duration: "4 horas en vivo",
  modality: "En línea",
  price: 250,
  admissionsEmail: "admisiones@windward.academy",
  whatsappNumber: "524492850638",
  whatsappDisplay: "449 285 0638",
  whatsappUrl: "https://wa.me/524492850638",
  mercadoPagoUrl: "https://link.mercadopago.com.mx/windward",
  clabe: "012 010 01509618820 0",
  clabeRaw: "012010015096188200",
  startISO: "2026-11-04T01:00:00.000Z",
  secondISO: "2026-11-06T01:00:00.000Z",
};

export const whatsappMessages = {
  inscribirme: `Hola, Windward Academy 👋 Quiero inscribirme al Taller Intensivo "IA para crear materiales interactivos con HTML y CSS" del 3 y 5 de noviembre. ¿Me comparten los pasos?`,
  pregunta: `Hola, Windward Academy. Tengo una pregunta sobre el Taller Intensivo "IA para crear materiales interactivos con HTML y CSS" (3 y 5 de noviembre).`,
  proximos: `Hola, Windward Academy. Me gustaría recibir aviso de los próximos cursos de creación digital para docentes.`,
};

export const philosophy = {
  motto: "Transformando maestros en creadores digitales.",
  statement:
    "Capacitamos a docentes para crear el futuro del aprendizaje mediante la inteligencia artificial. Además, dotamos a personal administrativo con herramientas para optimizar y automatizar procesos largos.",
};

export const navLinks = [
  { label: "Filosofía", href: "#filosofia" },
  { label: "Qué crearás", href: "#metodo" },
  { label: "Programa", href: "#programa" },
  { label: "Laboratorio", href: "#laboratorio" },
  { label: "Próximos cursos", href: "#proximos" },
];

export const audiences = [
  "Maestros de inglés y otros idiomas",
  "Docentes de secundaria y bachillerato",
  "Profesores universitarios de lenguas",
  "Academias y centros de idiomas",
];

export const materialTypes: { icon: LucideIcon; label: string; tone: string }[] = [
  { icon: Layers, label: "Flashcards", tone: "bg-[#dcefff] text-[#0b2a74]" },
  { icon: BookOpenCheck, label: "Gramática", tone: "bg-[#ece6ff] text-[#3b2a8f]" },
  { icon: Headphones, label: "Listening", tone: "bg-[#dcf7ec] text-[#145c43]" },
  { icon: Gamepad2, label: "Juegos", tone: "bg-[#fff4cf] text-[#6b4c00]" },
];

export const features = [
  {
    icon: Layers,
    title: "Flashcards de vocabulario",
    description:
      "Tarjetas con imagen, palabra, pronunciación y ejemplo que se voltean al tocarlas. Listas para proyectar o compartir por enlace.",
    example: "Un set temático completo en menos de 20 minutos",
  },
  {
    icon: BookOpenCheck,
    title: "Ejercicios de gramática",
    description:
      "Completar espacios, opción múltiple y ordenar oraciones con retroalimentación inmediata y explicación de la respuesta.",
    example: "Autocorregibles, sin plataformas de pago",
  },
  {
    icon: Headphones,
    title: "Actividades de listening",
    description:
      "Audio generado o grabado por ti, con preguntas de comprensión, transcripción oculta y control de velocidad.",
    example: "Compatibles con celular y proyector",
  },
  {
    icon: Gamepad2,
    title: "Juegos de práctica",
    description:
      "Memoramas, sopas de letras y retos contra el reloj que convierten la repetición en motivación real.",
    example: "Con puntaje, niveles y temporizador",
  },
  {
    icon: Sparkles,
    title: "IA que escribe el código por ti",
    description:
      "Aprendes a describir lo que necesitas con precisión pedagógica para que la IA genere el HTML y CSS. Tú diriges; la IA construye.",
    example: "No necesitas saber programar",
  },
  {
    icon: Code2,
    title: "Entiende y ajusta lo esencial",
    description:
      "Lo justo de HTML y CSS para cambiar colores, textos, imágenes y nivel de dificultad sin depender de nadie.",
    example: "Edita tus materiales con confianza",
  },
];

export const sessions = [
  {
    number: "01",
    date: "Martes 3 de noviembre",
    title: "De la idea al primer material interactivo",
    summary:
      "Entiende cómo funciona una página HTML y CSS, aprende a pedirle a la IA exactamente lo que tu clase necesita y publica tu primer set de flashcards.",
    deliverable: "Te llevas un set de flashcards y un ejercicio de gramática funcionando.",
    agenda: [
      ["19:00", "Qué es HTML y CSS en 15 minutos (sin tecnicismos)"],
      ["19:15", "Anatomía de un prompt para materiales de idiomas"],
      ["19:40", "Laboratorio: flashcards de vocabulario con imagen y audio"],
      ["20:15", "Laboratorio: ejercicio de gramática autocorregible"],
      ["20:45", "Cómo guardar, abrir y compartir tus materiales"],
    ],
  },
  {
    number: "02",
    date: "Jueves 5 de noviembre",
    title: "Listening, juegos y tu kit personal",
    summary:
      "Crea actividades de comprensión auditiva y juegos de práctica, aprende a ajustar el diseño y arma un kit reutilizable para todo el ciclo.",
    deliverable: "Te llevas una actividad de listening, un juego y tu kit de prompts reutilizables.",
    agenda: [
      ["19:00", "Laboratorio: actividad de listening con preguntas"],
      ["19:35", "Laboratorio: juego de práctica con puntaje y tiempo"],
      ["20:10", "Personaliza colores, tipografía e imágenes con CSS"],
      ["20:35", "Buenas prácticas: derechos de imagen, audio y datos"],
      ["20:50", "Tu kit de prompts y próximos pasos"],
    ],
  },
];

export const outcomes = [
  {
    value: "01",
    title: "Cuatro materiales listos para usar",
    text: "Flashcards, ejercicio de gramática, actividad de listening y un juego, creados con tu propio contenido.",
  },
  {
    value: "02",
    title: "Un kit de prompts reutilizables",
    text: "Plantillas probadas para generar nuevos materiales en minutos, para cualquier tema o nivel.",
  },
  {
    value: "03",
    title: "Lo esencial de HTML y CSS",
    text: "Suficiente para editar, personalizar y arreglar tus materiales sin depender de nadie.",
  },
  {
    value: "04",
    title: "Material de apoyo incluido",
    text: "Guías paso a paso, ejemplos descargables y grabaciones durante 30 días.",
  },
];

export const testimonials = [
  {
    quote:
      "Siempre pensé que crear algo interactivo requería un programador. En la primera sesión ya tenía mis flashcards de vocabulario funcionando en el celular de mis alumnos.",
    name: "Mariana G.",
    role: "Maestra de inglés, secundaria",
    initials: "MG",
  },
  {
    quote:
      "Mis ejercicios de gramática por fin se corrigen solos y explican la respuesta. Recuperé horas de revisión cada semana.",
    name: "Diego R.",
    role: "Profesor de francés, bachillerato",
    initials: "DR",
  },
  {
    quote:
      "El juego contra el reloj cambió la energía del grupo. Y lo mejor: ahora sé cómo pedirle a la IA una versión nueva para cada unidad.",
    name: "Sofía L.",
    role: "Coordinadora de academia de idiomas",
    initials: "SL",
  },
];

export const faqs = [
  {
    question: "¿Necesito saber programar?",
    answer:
      "No. La IA genera el código HTML y CSS; tú aprendes a dirigirla con instrucciones pedagógicas claras y a entender lo esencial para ajustar textos, colores e imágenes. Si nunca has visto una línea de código, este taller es para ti.",
  },
  {
    question: "¿Para qué idiomas sirve?",
    answer:
      "Para cualquiera. Los ejemplos se trabajan en inglés, pero el método aplica igual a francés, alemán, italiano, portugués, español como lengua extranjera o lenguas originarias. Tú eliges el idioma y el nivel de tus materiales.",
  },
  {
    question: "¿Qué incluye el precio de lanzamiento de $250 MXN?",
    answer:
      "Las dos sesiones en vivo (3 y 5 de noviembre), el material de apoyo con guías y ejemplos descargables, el kit de prompts reutilizables, acceso a las grabaciones por 30 días y constancia de participación. Es un pago único por persona.",
  },
  {
    question: "¿Cómo me inscribo?",
    answer:
      "Escríbenos por WhatsApp al 449 285 0638 o usa el formulario de esta página. Paga por Mercado Pago (link.mercadopago.com.mx/windward) o transferencia SPEI a la CLABE 012 010 01509618820 0, envía tu comprobante por WhatsApp y recibirás el enlace de acceso.",
  },
  {
    question: "¿Qué necesito para participar?",
    answer:
      "Una computadora (no celular) con navegador actualizado, conexión estable y acceso gratuito a una herramienta de IA generativa. Te enviaremos una guía de preparación al confirmar tu lugar.",
  },
  {
    question: "¿Las sesiones quedan grabadas?",
    answer:
      "Sí. Las personas inscritas reciben acceso a las grabaciones durante 30 días. Recomendamos asistir en vivo para construir tus materiales con acompañamiento y resolver dudas al momento.",
  },
  {
    question: "¿Habrá más cursos?",
    answer:
      "Sí. Este es el primer taller de una serie dedicada a la creación digital para docentes y personal educativo. Escríbenos por WhatsApp para recibir aviso de los próximos.",
  },
];

export const upcomingCourses = [
  {
    tag: "Docentes",
    title: "Presentaciones y videos educativos con IA",
    text: "Diseña clases visuales, videos explicativos y avatares narradores sin software complejo.",
    status: "Próximamente",
  },
  {
    tag: "Docentes",
    title: "Evaluaciones y rúbricas interactivas",
    text: "Crea exámenes autocorregibles, rúbricas vivas y retroalimentación personalizada con IA.",
    status: "Próximamente",
  },
  {
    tag: "Administrativos",
    title: "Automatiza procesos escolares con IA",
    text: "Reportes, comunicados, listas y seguimientos que hoy toman horas, resueltos en minutos.",
    status: "Próximamente",
  },
  {
    tag: "Docentes",
    title: "Tu sitio web de clase en un día",
    text: "Publica tus materiales interactivos en una página propia, con enlace para alumnos y familias.",
    status: "En preparación",
  },
];

export const promptObjectives = [
  {
    id: "flashcards",
    label: "Flashcards",
    material: "un set de 12 flashcards de vocabulario",
    spec: "Cada tarjeta muestra la palabra en el idioma meta al frente y, al hacer clic, se voltea para mostrar traducción, ejemplo de uso y un emoji o imagen representativa. Incluye botones Anterior / Siguiente y un contador de progreso.",
  },
  {
    id: "gramatica",
    label: "Gramática",
    material: "un ejercicio de gramática de 8 oraciones para completar",
    spec: "Cada oración tiene un espacio con tres opciones. Al elegir, marca en verde la correcta o en rojo la incorrecta y muestra una explicación breve. Al final presenta el puntaje y un botón para reiniciar.",
  },
  {
    id: "listening",
    label: "Listening",
    material: "una actividad de comprensión auditiva",
    spec: "Incluye un reproductor de audio (usa la etiqueta <audio> con una ruta que yo reemplazaré), 5 preguntas de opción múltiple sobre el audio, una transcripción oculta que se muestra con un botón, y retroalimentación al revisar.",
  },
  {
    id: "juego",
    label: "Juego",
    material: "un memorama de pares palabra–imagen con 8 pares",
    spec: "Las cartas se voltean al hacer clic; si coinciden, permanecen abiertas. Incluye temporizador, contador de intentos, mensaje de victoria y botón para volver a jugar.",
  },
];

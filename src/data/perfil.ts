// Contenido APROBABLE del documento "Insumos para la página web" (v1.0, 15/08/2026).
// Los campos marcados VERIFICAR en el brief se exponen aquí con su advertencia
// para que el equipo confirme antes de publicar (ver sección "Campos pendientes").

export const candidato = {
  nombrePublico: "José Luis Sandoval Luque",
  cargo: "Alcaldía Provincial de Nasca",
  organizacionPolitica: "Fuerza Popular — Lista N.º 1", // VERIFICAR estado vigente en JNE
  ambito: "Provincia de Nasca: Nasca, Vista Alegre, Changuillo, El Ingenio y Marcona",
  profesion: "Abogado",
  lemaPrincipal: "Agua para Nasca. Trabajo para su gente.",
  lemaComplementario: "Honradez, salud y educación.",
  fechaElectoral: "Domingo 4 de octubre de 2026",
};

export const biografias = {
  corta:
    "José Luis Sandoval Luque es abogado, nacido y residente en Nasca. Ha desarrollado experiencia jurídica en el sector privado formal y como asistente legal municipal. Representa una nueva generación comprometida con el agua, el trabajo, la transparencia y el futuro de toda la provincia.",
  media:
    "José Luis Sandoval Luque es abogado y nasqueño. Su experiencia profesional reúne el trabajo jurídico en una empresa privada formal y el servicio como asistente legal en la Municipalidad Provincial de Nasca. Esa trayectoria le permitió conocer procedimientos administrativos y las necesidades que los vecinos expresan ante la gestión local, siempre desde una función técnica de apoyo. Hoy representa una propuesta de renovación generacional enfocada en resolver problemas concretos: agua y saneamiento, trabajo y economía local, turismo, seguridad ciudadana y transparencia. Su compromiso es escuchar a los cinco distritos y promover soluciones responsables, con competencias claras y coordinación entre instituciones.",
  extendida:
    "José Luis Sandoval Luque es abogado, nacido y residente en Nasca. Su vínculo con la provincia se expresa en una trayectoria profesional desarrollada entre el sector privado formal y la experiencia jurídica municipal. Trabajó como asistente legal en la Municipalidad Provincial de Nasca, una función técnica de apoyo que le permitió comprender los procedimientos de la administración pública sin atribuirse decisiones que correspondían a las autoridades. También ha ejercido como abogado en una empresa formal y acumuló experiencia previa en estudios jurídicos. Su propuesta se presenta como una renovación generacional con prioridades concretas. El eje principal es el Plan Agua para Nasca, acompañado por acciones para impulsar el trabajo y la economía local, fortalecer el turismo, mejorar la seguridad ciudadana y rendir cuentas con transparencia. La mirada provincial comprende a Nasca, Vista Alegre, Changuillo, El Ingenio y Marcona. La campaña plantea escuchar a vecinos, agricultores, comerciantes, emprendedores, trabajadores, jóvenes y organizaciones sociales; convertir sus necesidades en proyectos viables; y explicar con honestidad qué puede ejecutar la municipalidad y qué requiere coordinación con otras entidades. Su lema resume esa orientación: “Agua para Nasca. Trabajo para su gente”.",
};

export const experiencia = [
  {
    periodo: "2021–2026",
    titulo: "Abogado en empresa privada formal",
    texto: "Experiencia jurídica en una empresa privada formal.",
    estado: "VERIFICAR denominación y fechas",
  },
  {
    periodo: "2023–2024",
    titulo: "Asistente legal municipal",
    texto: "Experiencia técnica de apoyo jurídico en la Municipalidad Provincial de Nasca.",
    estado: "VERIFICAR fechas y vínculo",
  },
  {
    periodo: "2019–2021",
    titulo: "Prácticas en estudios jurídicos privados",
    texto: "Formación práctica en el sector legal privado.",
    estado: "VERIFICAR nombres si se publican",
  },
  {
    periodo: "2025",
    titulo: "Título profesional de abogado",
    texto: "Abogado formado en la Universidad de San Martín de Porres.",
    estado: "VERIFICAR grado/título oficial",
  },
];

export const mensaje = {
  presentacion:
    "Soy José Luis Sandoval Luque, abogado y nasqueño. Conozco la gestión municipal desde una función técnica y sé que los problemas no se resuelven con discursos, sino con planificación, transparencia y trabajo conjunto. Mi prioridad es clara: agua para Nasca y oportunidades para su gente, escuchando por igual a los cinco distritos.",
  breves: [
    "Agua para Nasca. Trabajo para su gente.",
    "Una nueva generación para resolver problemas de siempre.",
    "Cinco distritos, una sola provincia.",
    "Propuestas claras, competencias claras y cuentas claras.",
    "Escuchar, planificar, gestionar y rendir cuentas.",
  ],
};

export const bloqueConfianza = [
  "Abogado",
  "Nacido y residente en Nasca",
  "Experiencia jurídica pública y privada",
];

export type EjeSlug =
  | "agua-saneamiento"
  | "trabajo-economia"
  | "turismo"
  | "seguridad"
  | "transparencia";

export const ejes: {
  slug: EjeSlug;
  nombre: string;
  resumen: string;
  bullets: string[];
}[] = [
  {
    slug: "agua-saneamiento",
    nombre: "Agua y saneamiento",
    resumen:
      "El Plan Agua para Nasca ordena las acciones urgentes y de mediano plazo para mejorar el abastecimiento y el saneamiento.",
    bullets: [
      "Auditar la situación de Emapavigs, pozos y redes; publicar hallazgos y prioridades.",
      "Programar mantenimiento y reposición en puntos críticos para reducir fugas.",
      "Gestionar el destrabe de proyectos de tratamiento de aguas residuales y nuevas fuentes de agua.",
    ],
  },
  {
    slug: "trabajo-economia",
    nombre: "Trabajo y economía local",
    resumen: "Impulsar oportunidades de trabajo y formalización para la gente de los cinco distritos.",
    bullets: [
      "Promover capacitación y formalización para comerciantes, gastronomía, servicios y pequeños negocios.",
      "Articular oportunidades de empleo local con inversión, turismo y proveedores de la provincia.",
      "Simplificar trámites municipales dentro del marco legal y publicar plazos de atención.",
    ],
  },
  {
    slug: "turismo",
    nombre: "Turismo",
    resumen: "Poner en valor el patrimonio y la oferta turística de la provincia con seguridad y coordinación.",
    bullets: [
      "Mejorar señalización, accesos y puesta en valor en coordinación con Cultura y el sector turismo.",
      "Instalar una mesa de seguridad turística con operadores, Policía y autoridades competentes.",
      "Conectar la oferta cultural con gastronomía, artesanía y emprendimientos locales.",
    ],
  },
  {
    slug: "seguridad",
    nombre: "Seguridad ciudadana",
    resumen: "Fortalecer el Serenazgo y la coordinación con la Policía Nacional con protocolos medibles.",
    bullets: [
      "Fortalecer Serenazgo con capacitación, equipamiento y protocolos medibles.",
      "Priorizar cámaras y patrullaje integrado en puntos críticos sustentados por información.",
      "Coordinar permanentemente con la Policía Nacional mediante el COPROSEC.",
    ],
  },
  {
    slug: "transparencia",
    nombre: "Transparencia y gestión",
    resumen: "Rendir cuentas de forma clara y periódica a los cinco distritos de la provincia.",
    bullets: [
      "Publicar mensualmente la ejecución presupuestal y el avance de proyectos en lenguaje ciudadano.",
      "Realizar rendiciones de cuentas trimestrales y descentralizadas en los cinco distritos.",
      "Habilitar un registro público de compromisos, responsables, fechas y estado.",
    ],
  },
];

export const planAguaResumen =
  "El Plan Agua para Nasca propone ordenar las acciones urgentes y de mediano plazo para mejorar el abastecimiento y el saneamiento. Incluye diagnóstico público, reducción de pérdidas, gestión de proyectos, nuevas fuentes de agua, tratamiento de aguas residuales y coordinación con las entidades competentes. Cada medida deberá contar con sustento técnico, presupuesto, cronograma y seguimiento ciudadano.";

export const planAguaComponentes = [
  {
    componente: "Diagnóstico y transparencia",
    texto: "Auditar la situación de Emapavigs, pozos y redes; publicar hallazgos y prioridades.",
    condicion: "Precisar alcance legal y fuente.",
  },
  {
    componente: "Reducción de pérdidas",
    texto: "Programar mantenimiento y reposición en puntos críticos para reducir fugas.",
    condicion: "Requiere línea base y coordinación.",
  },
  {
    componente: "Lagunas de oxidación",
    texto: "Gestionar el destrabe y culminación del proyecto de 14 lagunas para tratamiento de aguas residuales.",
    condicion: "VERIFICAR nombre, expediente, monto y entidad.",
  },
  {
    componente: "Galerías filtrantes",
    texto: "Gestionar la culminación y puesta en servicio del proyecto Santa Catalina.",
    condicion: "VERIFICAR estado y competencia.",
  },
  {
    componente: "Nuevos pozos",
    texto: "Gestionar autorizaciones, estudios y perforación donde sea técnica y ambientalmente viable.",
    condicion: "No prometer cantidad sin estudio/ANA.",
  },
  {
    componente: "Energía solar",
    texto: "Evaluar la incorporación progresiva de energía solar para reducir costos operativos de pozos.",
    condicion: "Publicar como evaluación/proyecto.",
  },
  {
    componente: "Emapavigs",
    texto: "Promover una reestructuración de emergencia con metas de continuidad, calidad y transparencia.",
    condicion: "Validación legal, SUNASS/OTASS.",
  },
  {
    componente: "Régimen OTASS",
    texto: "Evaluar una salida técnica, gradual y responsable del RAT, garantizando continuidad del servicio.",
    condicion: "No presentarlo como decisión municipal unilateral.",
  },
  {
    componente: "Agricultura",
    texto: "Instalar una mesa técnica provincial y gestionar cofinanciamiento para riego tecnificado de pequeños productores.",
    condicion: "Definir aliados, criterios y fondos.",
  },
];

export const faqs = [
  {
    pregunta: "¿Quién es José Luis Sandoval Luque?",
    respuesta:
      "Es abogado, nacido y residente en Nasca, con experiencia jurídica en el sector privado formal y como asistente legal municipal. Su trayectoria exacta debe enlazarse a la hoja de vida oficial del JNE.",
  },
  {
    pregunta: "¿Cuál es su principal prioridad?",
    respuesta:
      "El agua y el saneamiento, mediante un plan por etapas que combine diagnóstico, mantenimiento, proyectos, nuevas fuentes y coordinación con las entidades competentes.",
  },
  {
    pregunta: "¿La municipalidad puede resolver sola el problema del agua?",
    respuesta:
      "No. La municipalidad puede liderar, gestionar, fiscalizar, coordinar y cofinanciar según la competencia. Varias decisiones corresponden también a Emapavigs, ANA, SUNASS, OTASS, Gobierno Regional y Gobierno Nacional.",
  },
  {
    pregunta: "¿Qué propone para el empleo?",
    respuesta:
      "Facilitar la formalización, promover capacitación y articular oportunidades con turismo, comercio, agricultura, servicios e inversión responsable.",
  },
  {
    pregunta: "¿Cómo se atenderá a los cinco distritos?",
    respuesta:
      "Con agenda territorial, prioridades validadas, rendición de cuentas descentralizada y seguimiento público de compromisos.",
  },
  {
    pregunta: "¿Dónde puedo revisar información oficial?",
    respuesta: "En los portales del JNE y la ONPE. El sitio debe enlazar siempre a la fuente vigente.",
  },
  {
    pregunta: "¿Cómo puedo participar?",
    respuesta:
      "Mediante los canales oficiales de la campaña, enviando propuestas, asistiendo a actividades o registrándose como voluntario con consentimiento informado.",
  },
];

export const fuentes = [
  {
    entidad: "Equipo de campaña",
    titulo: "Plan Estratégico de Campaña — José Luis Sandoval Luque (versión 06.08.2026)",
    detalle: "Base principal de identidad, trayectoria y ejes programáticos; documento interno de campaña.",
    vigencia: "Interno, requiere validación antes de publicación",
  },
  {
    entidad: "ONPE",
    titulo: "Elecciones Regionales y Municipales 2026",
    detalle: "Información oficial del proceso electoral.",
    vigencia: "Consultado el 15 de agosto de 2026",
  },
  {
    entidad: "JNE",
    titulo: "Cronograma, reglamentos, candidaturas y hojas de vida oficiales",
    detalle: "Fuente oficial para verificar estado de la candidatura, lista y hoja de vida.",
    vigencia: "Consultado el 15 de agosto de 2026",
  },
];

// Datos que el equipo de campaña debe confirmar por escrito antes del
// lanzamiento (sección 13 del brief de insumos). No publicar hasta entonces.
export const pendientes = {
  dominioOficial: "[PENDIENTE: dominio oficial]",
  correoContacto: "[PENDIENTE: correo de contacto]",
  whatsapp: "[PENDIENTE: WhatsApp autorizado]",
  redes: {
    facebook: "https://www.facebook.com/profile.php?id=61588426972242",
    instagram: "[PENDIENTE: URL Instagram oficial]",
    tiktok: "[PENDIENTE: URL TikTok oficial]",
    youtube: "[PENDIENTE: URL YouTube oficial]",
  },
  direccionLocal: "[PENDIENTE: dirección de local de campaña, si corresponde]",
};

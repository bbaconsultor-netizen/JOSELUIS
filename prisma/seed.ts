import { PrismaClient, Eje } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "bbaconsultor@gmail.com";

async function main() {
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: { email: ADMIN_EMAIL, name: "Administrador de campaña", role: "admin" },
  });

  const distritos = [
    {
      nombre: "Nasca",
      slug: "nasca",
      introduccion: "Capital provincial y centro de servicios, turismo y actividad comercial.",
      necesidades: "Agua y saneamiento; seguridad; orden urbano; turismo; simplificación de trámites.",
      prioridades: "Agua y saneamiento; seguridad; orden urbano; turismo; simplificación de trámites.",
      fechaRevision: "15 de agosto de 2026",
    },
    {
      nombre: "Vista Alegre",
      slug: "vista-alegre",
      introduccion: "Distrito integrado a la dinámica urbana y productiva de la provincia.",
      necesidades: "Agua y saneamiento; seguridad; servicios; conectividad y oportunidades locales.",
      prioridades: "Agua y saneamiento; seguridad; servicios; conectividad y oportunidades locales.",
      fechaRevision: "15 de agosto de 2026",
    },
    {
      nombre: "Changuillo",
      slug: "changuillo",
      introduccion: "Territorio con comunidades y actividad agrícola que requieren presencia provincial sostenida.",
      necesidades: "Agua para agricultura; riego; conectividad; servicios y apoyo productivo.",
      prioridades: "Agua para agricultura; riego; conectividad; servicios y apoyo productivo.",
      fechaRevision: "15 de agosto de 2026",
    },
    {
      nombre: "El Ingenio",
      slug: "el-ingenio",
      introduccion: "Distrito con patrimonio, agricultura y desafíos de acceso a servicios.",
      necesidades: "Agua; riego; turismo cultural; conectividad y atención descentralizada.",
      prioridades: "Agua; riego; turismo cultural; conectividad y atención descentralizada.",
      fechaRevision: "15 de agosto de 2026",
    },
    {
      nombre: "Marcona",
      slug: "marcona",
      introduccion: "Polo productivo y costero con empleo, servicios y actividad minera formal.",
      necesidades: "Empleo local; seguridad; servicios; ambiente; diversificación y diálogo productivo.",
      prioridades: "Empleo local; seguridad; servicios; ambiente; diversificación y diálogo productivo.",
      fechaRevision: "15 de agosto de 2026",
    },
  ];

  for (const d of distritos) {
    await prisma.distrito.upsert({
      where: { slug: d.slug },
      update: {},
      create: { ...d, status: "PUBLICADO" },
    });
  }

  const propuestas: {
    titulo: string;
    slug: string;
    eje: Eje;
    resumen: string;
    problema: string;
    accion: string;
    competencia: string;
    etapas: string;
    fuente: string;
    responsable: string;
  }[] = [
    {
      titulo: "Diagnóstico y transparencia del agua",
      slug: "diagnostico-transparencia-agua",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Auditar la situación de Emapavigs, pozos y redes; publicar hallazgos y prioridades.",
      problema: "La falta de información pública sobre el estado real del servicio de agua dificulta priorizar soluciones.",
      accion: "Auditar la situación de Emapavigs, pozos y redes, y publicar los hallazgos y prioridades resultantes.",
      competencia: "Gestionar y coordinar con Emapavigs y SUNASS. Precisar alcance legal y fuente antes de publicar cifras.",
      etapas: "Diagnóstico técnico → publicación de hallazgos → priorización pública.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Reducción de pérdidas de agua",
      slug: "reduccion-perdidas-agua",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Programar mantenimiento y reposición en puntos críticos para reducir fugas.",
      problema: "Las fugas en puntos críticos de la red reducen la disponibilidad efectiva de agua para la población.",
      accion: "Programar mantenimiento y reposición en los puntos críticos de la red identificados en el diagnóstico.",
      competencia: "Requiere línea base técnica y coordinación con Emapavigs.",
      etapas: "Línea base → priorización de puntos críticos → mantenimiento y reposición.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Lagunas de oxidación",
      slug: "lagunas-de-oxidacion",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Gestionar el destrabe y culminación del proyecto de 14 lagunas de tratamiento de aguas residuales.",
      problema: "El proyecto de tratamiento de aguas residuales se encuentra sin culminar, afectando el saneamiento provincial.",
      accion: "Gestionar el destrabe administrativo y técnico para culminar el proyecto de 14 lagunas de oxidación.",
      competencia: "VERIFICAR nombre, expediente, monto y entidad responsable antes de publicar detalles.",
      etapas: "Revisión de expediente → destrabe administrativo → culminación de obra.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Galerías filtrantes — proyecto Santa Catalina",
      slug: "galerias-filtrantes-santa-catalina",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Gestionar la culminación y puesta en servicio del proyecto Santa Catalina.",
      problema: "El proyecto de galerías filtrantes Santa Catalina no se encuentra en servicio.",
      accion: "Gestionar la culminación y puesta en servicio del proyecto ante la entidad competente.",
      competencia: "VERIFICAR estado actual y competencia institucional antes de publicar.",
      etapas: "Revisión de estado → gestión ante entidad competente → puesta en servicio.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Formalización y capacitación para negocios locales",
      slug: "formalizacion-capacitacion-negocios",
      eje: "TRABAJO_ECONOMIA",
      resumen: "Promover capacitación y formalización para comerciantes, gastronomía, servicios y pequeños negocios.",
      problema: "La informalidad limita el crecimiento de comerciantes, gastronomía y pequeños negocios de la provincia.",
      accion: "Promover programas de capacitación y formalización dirigidos a comerciantes, gastronomía, servicios y pequeños negocios.",
      competencia: "Municipalidad en coordinación con entidades de formalización.",
      etapas: "Diagnóstico de necesidades → programa de capacitación → acompañamiento a la formalización.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Simplificación de trámites municipales",
      slug: "simplificacion-tramites-municipales",
      eje: "TRABAJO_ECONOMIA",
      resumen: "Simplificar trámites municipales dentro del marco legal y publicar plazos de atención.",
      problema: "Los trámites municipales lentos o poco claros dificultan la actividad económica local.",
      accion: "Simplificar trámites municipales dentro del marco legal vigente y publicar los plazos de atención.",
      competencia: "Gestión directa de la municipalidad.",
      etapas: "Revisión de trámites → simplificación → publicación de plazos.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Mesa de seguridad turística",
      slug: "mesa-seguridad-turistica",
      eje: "TURISMO",
      resumen: "Instalar una mesa de seguridad turística con operadores, Policía y autoridades competentes.",
      problema: "La actividad turística requiere coordinación permanente de seguridad entre actores públicos y privados.",
      accion: "Instalar una mesa de seguridad turística que reúna a operadores, Policía Nacional y autoridades competentes.",
      competencia: "Coordinar con Policía Nacional, Cultura y sector turismo.",
      etapas: "Convocatoria de actores → instalación de la mesa → protocolos conjuntos.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Fortalecimiento del Serenazgo",
      slug: "fortalecimiento-serenazgo",
      eje: "SEGURIDAD",
      resumen: "Fortalecer Serenazgo con capacitación, equipamiento y protocolos medibles.",
      problema: "El Serenazgo requiere mayor capacitación, equipamiento y protocolos de actuación medibles.",
      accion: "Fortalecer al Serenazgo con capacitación, equipamiento y protocolos medibles de desempeño.",
      competencia: "Gestión directa de la municipalidad, coordinación con COPROSEC y Policía Nacional.",
      etapas: "Diagnóstico de capacidades → equipamiento y capacitación → protocolos medibles.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
    {
      titulo: "Registro público de compromisos",
      slug: "registro-publico-compromisos",
      eje: "TRANSPARENCIA",
      resumen: "Habilitar un registro público de compromisos, responsables, fechas y estado.",
      problema: "La ciudadanía necesita una forma clara de dar seguimiento a los compromisos de gestión.",
      accion: "Habilitar un registro público donde consten compromisos, responsables, fechas y estado de avance.",
      competencia: "Gestión directa de la municipalidad.",
      etapas: "Diseño del registro → carga inicial de compromisos → actualización periódica.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
    },
  ];

  for (const p of propuestas) {
    await prisma.propuesta.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, status: "PUBLICADO", publishedAt: new Date() },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

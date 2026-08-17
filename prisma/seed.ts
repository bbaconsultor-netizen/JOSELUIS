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
    imagen?: string;
    imagenIlustrativa?: boolean;
    status?: "PUBLICADO" | "EN_VERIFICACION";
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
      titulo: "Turismo y trabajo para nuestra provincia",
      slug: "turismo-y-trabajo-nasca",
      eje: "TURISMO",
      resumen:
        "Nasca posee un patrimonio admirado en todo el mundo. Buscamos protegerlo y convertir el turismo en más empleo y oportunidades para familias y emprendedores.",
      problema:
        "Nasca posee un patrimonio arqueológico y cultural admirado en todo el mundo, pero necesita protección, puesta en valor y mejores condiciones para que el turismo se traduzca en más empleo y oportunidades para las familias y emprendedores de la provincia.",
      accion:
        "Gestionar e impulsar el nuevo aeropuerto de Nasca ante las entidades competentes.\nPromover la puesta en valor de Cahuachi, Chauchilla, los acueductos y otros sitios arqueológicos.\nImpulsar la creación de la Unidad Ejecutora Nasca para fortalecer la investigación, conservación y administración de nuestro patrimonio.\nGestionar la implementación del Plan de Gestión de las Líneas y Geoglifos de Nasca y Palpa.\nPromover un moderno Centro de Interpretación con tecnología y experiencias educativas inmersivas.\nCrear circuitos turísticos que integren patrimonio, naturaleza, gastronomía y cultura para que los visitantes permanezcan más días.",
      competencia:
        "La Municipalidad ejecutará las intervenciones dentro de sus competencias y gestionará los proyectos mayores en coordinación con el Ministerio de Cultura, MTC, SBN, Gobierno Regional, sector privado y demás entidades responsables.",
      etapas:
        "Gestión ante entidades competentes → puesta en valor del patrimonio → circuitos turísticos y generación de empleo.",
      fuente: "Material de campaña — propuesta de turismo y trabajo (aportada por el equipo de campaña).",
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
      titulo: "Seguridad ciudadana: protección inteligente para Nasca",
      slug: "seguridad-inteligente-drones-camaras",
      eje: "SEGURIDAD",
      resumen:
        "No podemos hablar de trabajo o turismo si nuestros vecinos no pueden caminar tranquilos por sus calles. Proponemos tecnología, un Serenazgo fortalecido y coordinación permanente con la PNP.",
      problema:
        "Los problemas de siempre necesitan soluciones de una nueva generación: la inseguridad afecta la vida diaria de los vecinos y limita el desarrollo del trabajo y el turismo en la provincia.",
      accion:
        "Instalar cámaras de videovigilancia y evaluar la implementación de drones de patrullaje aéreo con inteligencia artificial, priorizando los puntos críticos de los cinco distritos según mapas del delito e información verificable.\nFortalecer el Serenazgo con capacitación continua y equipamiento adecuado (radios, chalecos), con protocolos de actuación medibles.\nMantener coordinación estratégica y permanente con la Policía Nacional del Perú a través del Comité Provincial de Seguridad Ciudadana (COPROSEC).",
      competencia:
        "Gestión directa de la municipalidad en equipamiento y protocolos de Serenazgo; coordinación con la Policía Nacional del Perú a través del COPROSEC. El uso de tecnología con reconocimiento facial debe evaluarse conforme al marco legal de protección de datos personales antes de su implementación.",
      etapas: "Diagnóstico con mapas del delito → instalación de cámaras y evaluación de drones → protocolos conjuntos con Serenazgo y PNP.",
      fuente: "Material de campaña — propuesta de seguridad ciudadana (aportada por el equipo de campaña).",
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
    {
      titulo: "Electrificación solar de pozos",
      slug: "electrificacion-solar-pozos",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Evaluar la incorporación progresiva de energía solar para reducir costos operativos de pozos.",
      problema: "El costo energético de operar los pozos afecta la sostenibilidad del servicio de agua.",
      accion: "Evaluar la incorporación progresiva de paneles solares para reducir costos operativos de pozos, donde sea técnica y económicamente viable.",
      competencia: "Evaluación y gestión municipal, en coordinación con la entidad prestadora del servicio.",
      etapas: "Evaluación técnica y económica → proyecto piloto → incorporación progresiva.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
      imagen: "/images/propuestas/electrificacion-pozos.webp",
      imagenIlustrativa: true,
    },
    {
      titulo: "Riego tecnificado para pequeños productores",
      slug: "riego-tecnificado-agricultores",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Instalar una mesa técnica provincial y gestionar cofinanciamiento para riego tecnificado de pequeños productores.",
      problema: "Los pequeños productores agrícolas enfrentan pérdidas de agua por sistemas de riego poco eficientes.",
      accion: "Instalar una mesa técnica provincial y gestionar cofinanciamiento para proyectos de riego tecnificado dirigidos a pequeños productores.",
      competencia: "Gestionar y cofinanciar en coordinación con aliados técnicos y financieros. Definir aliados, criterios y fondos.",
      etapas: "Instalación de mesa técnica → identificación de aliados y fondos → proyectos piloto de riego tecnificado.",
      fuente: "Plan Estratégico de Campaña — José Luis Sandoval Luque (v. 06.08.2026)",
      responsable: "Equipo programático",
      imagen: "/images/propuestas/canales-riego.webp",
      imagenIlustrativa: true,
    },
    {
      titulo: "Defensas ribereñas y mantenimiento de caminos rurales",
      slug: "defensas-riberenas-caminos-rurales",
      eje: "AGUA_SANEAMIENTO",
      resumen: "Construir defensas ribereñas definitivas, con estudios y expedientes técnicos, para proteger cultivos, viviendas y caminos ante huaicos y desbordes.",
      problema: "Los caminos rurales y las riberas de los cursos de agua requieren protección permanente ante huaicos y desbordes que afectan cultivos, viviendas y caminos.",
      accion: "Construir defensas ribereñas definitivas, con estudios y expedientes técnicos, y mejorar los caminos vecinales para facilitar el traslado y la comercialización de la producción.",
      competencia: "La Municipalidad ejecutará dentro de sus competencias y gestionará las obras mayores con la ANA, el Gobierno Regional y demás entidades responsables.",
      etapas: "Estudios y expedientes técnicos → gestión ante entidades competentes → ejecución de obras.",
      fuente: "Material de campaña — propuesta de agua y obras para agricultores (aportada por el equipo de campaña).",
      responsable: "Equipo programático",
      imagen: "/images/propuestas/defensas-riberenas.webp",
      imagenIlustrativa: true,
    },
    {
      titulo: "Agua y obras para nuestros agricultores",
      slug: "agua-y-obras-agricultores",
      eje: "AGUA_SANEAMIENTO",
      resumen:
        "El campo de Nasca necesita soluciones permanentes, no reparaciones improvisadas. Represas, canales, electrificación de pozos y defensas ribereñas para que la agricultura vuelva a crecer.",
      problema:
        "El campo de Nasca necesita soluciones permanentes, no reparaciones improvisadas: la falta de infraestructura de agua y de protección ante huaicos limita la productividad agrícola de la provincia.",
      accion:
        "Represar los ríos Aja, Tierras Blancas, Trancas y El Ingenio para asegurar disponibilidad de agua para el campo.\nRehabilitar tomas y bocatomas para asegurar una distribución eficiente del agua.\nLimpiar, reparar y revestir canales de riego para reducir filtraciones y pérdidas.\nElectrificar pozos agrícolas, impulsando sistemas de energía solar donde sean técnicamente viables.\nConstruir defensas ribereñas definitivas, con estudios y expedientes técnicos, para proteger cultivos, viviendas y caminos ante huaicos y desbordes.\nMejorar caminos vecinales para facilitar el traslado y la comercialización de la producción.\nGestionar el acceso de los productores a programas de mejoramiento de la productividad como Procompite, Agrorural y Agroideas, entre otros.",
      competencia:
        "La Municipalidad ejecutará las intervenciones dentro de sus competencias y gestionará las obras mayores en coordinación con la ANA, MIDAGRI, Gobierno Regional, juntas de usuarios y demás entidades responsables.",
      etapas: "Estudios y expedientes técnicos → gestión ante entidades competentes → ejecución de obras de agua, protección y caminos.",
      fuente: "Material de campaña — propuesta de agua y obras para agricultores (aportada por el equipo de campaña).",
      responsable: "Equipo programático",
      imagen: "/images/propuestas/agua-obras-agricultores.webp",
      imagenIlustrativa: true,
    },
  ];

  for (const p of propuestas) {
    const { status, ...rest } = p;
    const resolvedStatus = status ?? "PUBLICADO";
    const existing = await prisma.propuesta.findUnique({ where: { slug: p.slug } });
    await prisma.propuesta.upsert({
      where: { slug: p.slug },
      update: {
        ...rest,
        status: resolvedStatus,
        publishedAt:
          resolvedStatus === "PUBLICADO" ? existing?.publishedAt || new Date() : existing?.publishedAt ?? null,
      },
      create: {
        ...rest,
        status: resolvedStatus,
        publishedAt: resolvedStatus === "PUBLICADO" ? new Date() : null,
      },
    });
  }

  const videos = [
    { titulo: "Una nueva generación para Nasca", youtubeId: "z4i8R316y4E" },
    { titulo: "Una nueva generación para Nasca", youtubeId: "Tkcq248qtes" },
    { titulo: "¡Gracias, Cajuca!", youtubeId: "0LbZny8PzZI" },
  ];

  for (const v of videos) {
    const existing = await prisma.video.findFirst({ where: { youtubeId: v.youtubeId } });
    if (!existing) {
      await prisma.video.create({
        data: { ...v, status: "PUBLICADO", publishedAt: new Date() },
      });
    }
  }

  await prisma.noticia.upsert({
    where: { slug: "inauguracion-de-base-jiron-italia" },
    update: {},
    create: {
      titular: "José Luis Sandoval inauguró base de campaña en Jirón Italia",
      slug: "inauguracion-de-base-jiron-italia",
      bajada:
        "Vecinos de Nasca acompañaron la apertura de un nuevo espacio de campaña, donde el candidato reafirmó sus ejes: honradez, salud, educación y agua para la provincia.",
      cuerpo:
        "El jueves 13 de agosto, José Luis Sandoval Luque encabezó la inauguración de una nueva base de campaña en Jirón Italia, Nasca, con la participación de vecinos y simpatizantes.\n\nDurante la actividad, el candidato reiteró los ejes centrales de su propuesta: honradez, salud y educación, con el Plan Agua para Nasca como prioridad. \"Trabajo para su gente\" fue el mensaje central de la jornada.\n\nEste tipo de encuentros forma parte de la agenda territorial de la campaña en los cinco distritos de la provincia.",
      distrito: "Nasca",
      autor: "Equipo de campaña",
      foto: "/images/noticia-inauguracion-base.webp",
      pieDeFoto: "Jirón Italia, Nasca — 13 de agosto de 2026.",
      status: "PUBLICADO",
      publishedAt: new Date("2026-08-13T18:00:00-05:00"),
    },
  });
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

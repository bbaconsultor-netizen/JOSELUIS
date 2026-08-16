import { z } from "zod";

export const contentStatusValues = [
  "BORRADOR",
  "EN_VERIFICACION",
  "APROBADO",
  "PUBLICADO",
  "DESACTUALIZADO",
] as const;

export const ejeValues = [
  "AGUA_SANEAMIENTO",
  "TRABAJO_ECONOMIA",
  "TURISMO",
  "SEGURIDAD",
  "TRANSPARENCIA",
] as const;

export const propuestaSchema = z.object({
  titulo: z.string().min(3, "El título es muy corto"),
  slug: z.string().min(3, "El slug es muy corto"),
  eje: z.enum(ejeValues),
  resumen: z.string().min(10, "El resumen es muy corto").max(280, "Máximo 45 palabras aprox."),
  problema: z.string().min(10, "Describe el problema"),
  accion: z.string().min(10, "Describe la acción propuesta"),
  competencia: z.string().min(3, "Indica la competencia institucional"),
  etapas: z.string().min(3, "Indica las etapas"),
  fuente: z.string().min(3, "Indica la fuente"),
  responsable: z.string().min(2, "Indica el responsable"),
  imagen: z.string().optional().or(z.literal("")),
  imagenIlustrativa: z.boolean().optional(),
  status: z.enum(contentStatusValues),
});

export const distritoSchema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  slug: z.string().min(2, "El slug es muy corto"),
  introduccion: z.string().min(10, "La introducción es muy corta"),
  necesidades: z.string().min(3, "Indica las necesidades escuchadas"),
  prioridades: z.string().min(3, "Indica las prioridades"),
  fotografia: z.string().url().optional().or(z.literal("")),
  fechaRevision: z.string().min(3, "Indica la fecha de revisión"),
  status: z.enum(contentStatusValues),
});

export const eventoSchema = z.object({
  titulo: z.string().min(3, "El título es muy corto"),
  fecha: z.string().min(3, "Indica fecha y hora"),
  lugar: z.string().min(3, "Indica el lugar"),
  referencia: z.string().optional().or(z.literal("")),
  mapaUrl: z.string().url().optional().or(z.literal("")),
  contacto: z.string().optional().or(z.literal("")),
  status: z.enum(contentStatusValues),
});

export const noticiaSchema = z.object({
  titular: z.string().min(3, "El titular es muy corto"),
  slug: z.string().min(3, "El slug es muy corto"),
  bajada: z.string().min(10, "La bajada es muy corta"),
  cuerpo: z.string().min(10, "El cuerpo es muy corto"),
  distrito: z.string().optional().or(z.literal("")),
  autor: z.string().min(2, "Indica el autor"),
  foto: z.string().url().optional().or(z.literal("")),
  pieDeFoto: z.string().optional().or(z.literal("")),
  status: z.enum(contentStatusValues),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Indica tu nombre"),
  email: z.string().email("Correo inválido"),
  phone: z.string().optional().or(z.literal("")),
  distrito: z.string().optional().or(z.literal("")),
  tipo: z.enum(["PROPUESTA", "VOLUNTARIADO", "CONSULTA_PRENSA", "OTRO"]),
  message: z.string().min(10, "Cuéntanos un poco más"),
  consentimiento: z.literal(true, {
    message: "Debes aceptar el uso de tus datos para continuar",
  }),
});

export type PropuestaInput = z.infer<typeof propuestaSchema>;
export type DistritoInput = z.infer<typeof distritoSchema>;
export type EventoInput = z.infer<typeof eventoSchema>;
export type NoticiaInput = z.infer<typeof noticiaSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

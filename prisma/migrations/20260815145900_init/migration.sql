-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('BORRADOR', 'EN_VERIFICACION', 'APROBADO', 'PUBLICADO', 'DESACTUALIZADO');

-- CreateEnum
CREATE TYPE "Eje" AS ENUM ('AGUA_SANEAMIENTO', 'TRABAJO_ECONOMIA', 'TURISMO', 'SEGURIDAD', 'TRANSPARENCIA');

-- CreateEnum
CREATE TYPE "LeadTipo" AS ENUM ('PROPUESTA', 'VOLUNTARIADO', 'CONSULTA_PRENSA', 'OTRO');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NUEVO', 'CONTACTADO', 'EN_PROCESO', 'CERRADO');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propuesta" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "eje" "Eje" NOT NULL,
    "resumen" TEXT NOT NULL,
    "problema" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "competencia" TEXT NOT NULL,
    "etapas" TEXT NOT NULL,
    "fuente" TEXT NOT NULL,
    "responsable" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'BORRADOR',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Propuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distrito" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "introduccion" TEXT NOT NULL,
    "necesidades" TEXT NOT NULL,
    "prioridades" TEXT NOT NULL,
    "fotografia" TEXT,
    "fechaRevision" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'BORRADOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "lugar" TEXT NOT NULL,
    "referencia" TEXT,
    "mapaUrl" TEXT,
    "contacto" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'BORRADOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" TEXT NOT NULL,
    "titular" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bajada" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "distrito" TEXT,
    "autor" TEXT NOT NULL,
    "foto" TEXT,
    "pieDeFoto" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'BORRADOR',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "distrito" TEXT,
    "tipo" "LeadTipo" NOT NULL DEFAULT 'OTRO',
    "message" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NUEVO',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Propuesta_slug_key" ON "Propuesta"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Distrito_slug_key" ON "Distrito"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Noticia_slug_key" ON "Noticia"("slug");

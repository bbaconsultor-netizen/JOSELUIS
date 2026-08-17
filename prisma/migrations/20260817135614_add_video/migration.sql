-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "descripcion" TEXT,
    "distrito" TEXT,
    "fecha" TIMESTAMP(3),
    "status" "ContentStatus" NOT NULL DEFAULT 'BORRADOR',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

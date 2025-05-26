-- CreateTable
CREATE TABLE "Manga" (
    "id" TEXT NOT NULL,
    "sourceMangaId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "title" TEXT[],
    "anilistId" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "sourceChapterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT,
    "sourceMangaId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manga_sourceId_sourceMangaId_key" ON "Manga"("sourceId", "sourceMangaId");

-- CreateIndex
CREATE INDEX "Chapter_sourceId_sourceMangaId_idx" ON "Chapter"("sourceId", "sourceMangaId");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_sourceId_sourceChapterId_key" ON "Chapter"("sourceId", "sourceChapterId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_sourceMangaId_sourceId_fkey" FOREIGN KEY ("sourceMangaId", "sourceId") REFERENCES "Manga"("sourceMangaId", "sourceId") ON DELETE CASCADE ON UPDATE CASCADE;

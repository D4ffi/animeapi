-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('AIRING', 'FINISHED', 'UPCOMING', 'CANCELED');

-- CreateEnum
CREATE TYPE "AnimeSeason" AS ENUM ('WINTER', 'SPRING', 'SUMMER', 'FALL');

-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "japaneseTitle" TEXT,
    "description" TEXT,
    "genres" TEXT[],
    "episodes" INTEGER,
    "status" "AnimeStatus" NOT NULL DEFAULT 'UPCOMING',
    "releaseYear" INTEGER,
    "season" "AnimeSeason",
    "rating" DOUBLE PRECISION,
    "coverImage" TEXT,
    "bannerImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "japaneseName" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

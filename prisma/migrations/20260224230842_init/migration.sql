-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('SUCCESS', 'PENDING', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "langueId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "population" INTEGER NOT NULL,
    "superficie" DECIMAL(65,30) NOT NULL,
    "localisation" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Langue" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Langue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeContenu" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "TypeContenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeMedia" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "TypeMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contenu" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "texte" TEXT,
    "statut" "Statut" NOT NULL DEFAULT 'PENDING',
    "parentId" INTEGER,
    "regionId" INTEGER NOT NULL,
    "langueId" INTEGER NOT NULL,
    "auteurId" INTEGER NOT NULL,
    "typeContenuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "chemin" TEXT NOT NULL,
    "description" TEXT,
    "typemediaId" INTEGER NOT NULL,
    "contenuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id" SERIAL NOT NULL,
    "texte" TEXT,
    "note" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "contenuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parler" (
    "regionId" INTEGER NOT NULL,
    "langueId" INTEGER NOT NULL,

    CONSTRAINT "Parler_pkey" PRIMARY KEY ("regionId","langueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TypeContenu_nom_key" ON "TypeContenu"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "TypeMedia_nom_key" ON "TypeMedia"("nom");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_langueId_fkey" FOREIGN KEY ("langueId") REFERENCES "Langue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contenu" ADD CONSTRAINT "Contenu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Contenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contenu" ADD CONSTRAINT "Contenu_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contenu" ADD CONSTRAINT "Contenu_langueId_fkey" FOREIGN KEY ("langueId") REFERENCES "Langue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contenu" ADD CONSTRAINT "Contenu_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contenu" ADD CONSTRAINT "Contenu_typeContenuId_fkey" FOREIGN KEY ("typeContenuId") REFERENCES "TypeContenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_typemediaId_fkey" FOREIGN KEY ("typemediaId") REFERENCES "TypeMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_contenuId_fkey" FOREIGN KEY ("contenuId") REFERENCES "Contenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_contenuId_fkey" FOREIGN KEY ("contenuId") REFERENCES "Contenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parler" ADD CONSTRAINT "Parler_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parler" ADD CONSTRAINT "Parler_langueId_fkey" FOREIGN KEY ("langueId") REFERENCES "Langue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

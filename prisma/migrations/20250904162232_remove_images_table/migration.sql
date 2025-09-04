/*
  Warnings:

  - The primary key for the `product_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image_id` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[path]` on the table `product_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."product_images" DROP CONSTRAINT "product_images_image_id_fkey";

-- AlterTable
ALTER TABLE "public"."product_images" DROP CONSTRAINT "product_images_pkey",
DROP COLUMN "image_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" VARCHAR(150),
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "path" VARCHAR(255) NOT NULL,
ADD COLUMN     "title" VARCHAR(150),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "product_images_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."images";

-- CreateIndex
CREATE UNIQUE INDEX "product_images_path_key" ON "public"."product_images"("path");

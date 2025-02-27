-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "title" VARCHAR(150),
    "description" VARCHAR(150),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,3) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "product_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("product_id","image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_path_key" ON "images"("path");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_name_idx" ON "products"("name");

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

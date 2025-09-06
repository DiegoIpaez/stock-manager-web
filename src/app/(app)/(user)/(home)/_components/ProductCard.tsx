"use client";
import Image from "next/image";
import { Product, ProductImage } from "@prisma/client";
import { currencyFormatter } from "@/utils/formatters/currency.formmater";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";

type ProductCardProps = Product & {
  products_images: ProductImage[];
};

export default function ProductCard({
  deleted,
  description,
  disabled,
  name,
  price,
  stock,
  products_images,
}: Partial<ProductCardProps>) {
  const imageSrc =
    name && products_images?.[0]?.path
      ? products_images?.[0]?.path
      : '/static/images/default-product.png';

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl truncate">{name}</CardTitle>
          {disabled && <Badge variant="destructive">Desactivado</Badge>}
          {deleted && <Badge variant="destructive">Eliminado</Badge>}
        </div>
        {description && (
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-center p-2">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-md overflow-hidden">
              <Image
                src={imageSrc}
                alt={name || "imagen por defecto"}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {price && (
            <div className="text-2xl font-bold">
              $ {currencyFormatter(Number(price))}
            </div>
          )}
          {stock !== undefined && (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-1">Stock:</span>
              <Badge variant={stock > 0 ? "default" : "outline"}>
                {stock > 0 ? stock : "Sin stock"}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="cursor-not-allowed">
          Ver detalles
        </Button>
        <Button
          disabled={disabled || deleted || !stock || stock <= 0}
          size="sm"
          className="cursor-not-allowed"
        >
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import { DEFAULT_PAGINATION, UPLOAD_DIRECTORIES } from "@/constants";
import { uploadFile } from "@/utils/uploadFile.util";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { getPaginatedProducts } from "@/lib/prisma/repositories/products.repository";

const { PAGE, PAGE_SIZE } = DEFAULT_PAGINATION;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const deleted = JSON.parse(searchParams.get("deleted") ?? "false");

  try {
    const paginationResponse = await getPaginatedProducts({
      page: page ? Number(page) : PAGE,
      limit: limit ? Number(limit) : PAGE_SIZE,
      deleted,
    });

    return NextResponse.json(paginationResponse, { status: 200 });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request: req });
  }
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") && Number(formData.get("price"));
    const stock = formData.get("stock") && Number(formData.get("stock"));
    const images = formData.getAll("images") as File[] | null;

    if (!name || !description || !price || !stock) {
      throw new ApiError({
        status: 400,
        message: "Missing required fields",
      });
    }
    const createQuery: Prisma.ProductCreateArgs = {
      data: {
        name,
        description,
        price,
        stock,
      },
      include: {
        products_images: true,
      },
    };

    if (images) {
      const productPaths = [];
      for (const image of images) {
        const path = await uploadFile(image, UPLOAD_DIRECTORIES.PRODUCTS);
        productPaths.push(path);
      }
      const productsImages = productPaths.map((path) => ({ path }));
      createQuery.data.products_images = {
        createMany: { data: productsImages },
      };
    }

    const newProduct = await prisma.product.create(createQuery);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request: req });
  }
}

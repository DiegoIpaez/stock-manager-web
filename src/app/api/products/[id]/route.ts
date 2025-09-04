import { NextRequest, NextResponse } from "next/server";
import type { NextParams } from "@/types";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { updateProductById } from "@/lib/prisma/repositories/products.repository";

export async function DELETE(request: NextRequest, { params }: NextParams) {
  try {
    const { id } = await params;
    if (!id) {
      throw new ApiError({
        status: 400,
        message: "product_id is required",
      });
    }

    const deletedProduct = await updateProductById(Number(id), {
      deleted: true,
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

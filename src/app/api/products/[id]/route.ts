import { NextRequest, NextResponse } from "next/server";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { updateProductById } from "@/lib/prisma/repositories/products.repository";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) throw new ApiError(400, "product_id is required");

    const deletedProduct = await updateProductById(Number(id), {
      deleted: true,
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error as ApiError);
  }
}

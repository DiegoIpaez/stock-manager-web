import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_PAGINATION } from "@/constants";
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
    return apiErrorHandler(error as ApiError);
  }
}

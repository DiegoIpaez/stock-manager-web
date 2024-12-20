import { NextRequest, NextResponse } from "next/server";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import { getPaginatedUsers } from "@/lib/prisma/repositories/users.repository";
import { DEFAULT_PAGINATION } from "@/constants";

const { PAGE, PAGE_SIZE } = DEFAULT_PAGINATION;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const uid = req.headers.get("uid");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const deleted = JSON.parse(searchParams.get("deleted") ?? "false");

  try {
    const paginationResponse = await getPaginatedUsers({
      page: page ? Number(page) : PAGE,
      limit: limit ? Number(limit) : PAGE_SIZE,
      deleted,
      id: Number(uid),
    });

    return NextResponse.json(paginationResponse, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error as ApiError);
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const deleted = JSON.parse(searchParams.get("deleted") ?? "false");

  try {
    const paginationResponse = await getPaginatedUsers({
      page: page ? Number(page) : PAGE,
      limit: limit ? Number(limit) : PAGE_SIZE,
      deleted,
    });

    return NextResponse.json(paginationResponse, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error as ApiError);
  }
}

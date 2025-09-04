import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import type { NextParams } from "@/types";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import {
  getUserByFilter,
  updateUserById,
} from "@/lib/prisma/repositories/users.repository";

export async function GET(req: NextRequest, { params }: NextParams) {
  try {
    const { id } = await params;
    if (!id)
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "user_id is required",
      });

    const foundUser = await getUserByFilter({
      id: parseInt(id, 10),
      deleted: false,
      disabled: false,
    });

    if (!foundUser)
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    return NextResponse.json(foundUser);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: req,
    });
  }
}

export async function PUT(req: NextRequest, { params }: NextParams) {
  try {
    const { id } = await params;
    const data = await req.json();
    const updatedUser = await updateUserById(Number(id), data);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: req,
    });
  }
}

export async function DELETE(req: NextRequest, { params }: NextParams) {
  try {
    const { id } = await params;
    const updatedUser = await updateUserById(Number(id), { deleted: true });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request: req,
    });
  }
}

import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import {
  getUserByFilter,
  updateUserById,
} from "@/lib/prisma/repositories/users.repository";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "user_id is required");

    const foundUser = await getUserByFilter({
      id: parseInt(id, 10),
      deleted: false,
      disabled: false,
    });

    if (!foundUser) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    return NextResponse.json(foundUser);
  } catch (error) {
    return apiErrorHandler(error as ApiError);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await req.json();
    const updatedUser = await updateUserById(Number(id), data);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return apiErrorHandler(error as ApiError);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const updatedUser = await updateUserById(Number(id), { deleted: true });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return apiErrorHandler(error as ApiError);
  }
}

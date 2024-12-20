import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { CONFIG } from "@/constants";

type ResponseError = {
  message: string;
  statusCode: number;
  stack?: string;
};

const statusMessages: Record<number, string> = httpStatus;

export class ApiError extends Error {
  public readonly stack?: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode?: number,
    message?: string,
    isOperational?: boolean,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    this.isOperational = isOperational ?? true;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this);
  }
}

export default function apiErrorHandler(err: ApiError) {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  if (!message) {
    message = statusMessages[statusCode];
  }

  const error: ResponseError = {
    message,
    statusCode,
  };

  if (err?.stack && CONFIG.NODE_ENV === "development") {
    error.stack = err?.stack;
  }

  return NextResponse.json({ error }, { status: statusCode });
}

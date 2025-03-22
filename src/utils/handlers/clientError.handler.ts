/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { showToastError } from "../showToast.util";
import { ExternalToast } from "sonner";

interface ErrorHandlerOptions {
  logToConsole?: boolean;
  showToast?: boolean;
  messagePrefix?: string;
  defaultMessage?: string;
  toastOptions?: Partial<ExternalToast>;
}

function normalizeError(error: unknown): Error {
  if (error instanceof AxiosError) {
    return {
      name: "AxiosError",
      message: error.response?.data?.error?.message || error.message,
      stack: error.response?.data?.error?.stack || error.stack,
    };
  }
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);

  if (error && typeof error === "object") {
    if ("message" in error && typeof (error as any).message === "string") {
      return new Error((error as any).message);
    }
    return new Error(JSON.stringify(error));
  }

  return new Error("Unknown error");
}

/**
 * Handles client-side errors with configurable options
 * @param error - The captured error
 * @param callback - Optional function to execute after handling the error
 * @param options - Configuration options for the error handler
 */
export default function clientErrorHandler(
  error: unknown,
  callback = () => {},
  {
    logToConsole = true,
    showToast = true,
    messagePrefix = "Error: ",
    defaultMessage = "Unknown error",
    toastOptions = { duration: 4000 },
  }: ErrorHandlerOptions = {}
): void {
  const normalizedError = normalizeError(error);

  if (logToConsole) console.error(normalizedError);
  if (showToast) {
    const displayMessage = normalizedError.message || defaultMessage;
    showToastError(`${messagePrefix}${displayMessage}`, toastOptions);
  }

  callback();
}

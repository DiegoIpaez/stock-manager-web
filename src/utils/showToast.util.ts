import { toast, type ExternalToast } from "sonner";

const DEFAULT_TOAST_OPTIONS: Partial<ExternalToast> = {
  position: "top-center",
  duration: 1500,
  dismissible: true,
  richColors: true,
};

/**
 * Displays a toast notification with a specified type and message.
 *
 * @param {"error" | "success" | "warning" | "info"} type - The type of toast notification to display.
 * @param {string} message - The message to display in the toast notification.
 * @param {Partial<ExternalToast>} options - Additional options to customize the toast notification.
 */
const showToast = (
  type: "error" | "success" | "warning" | "info",
  message: string,
  options: Partial<ExternalToast>
) => {
  toast[type](message, {
    ...DEFAULT_TOAST_OPTIONS,
    ...options,
  });
};

export const showToastError = (message = "Ocurrió un error", options = {}) =>
  showToast("error", message, options);

export const showToastSuccess = (message = "Operación exitosa", options = {}) =>
  showToast("success", message, options);

export const showToastWarning = (message = "Advertencia", options = {}) =>
  showToast("warning", message, options);

export const showToastInfo = (message = "Información", options = {}) =>
  showToast("info", message, options);

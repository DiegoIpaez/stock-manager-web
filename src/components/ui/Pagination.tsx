"use client";
import clsx from "clsx";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange = () => {},
}: {
  currentPage?: number | null;
  totalPages?: number | null;
  onPageChange?: (page: number) => void;
}) {
  const handlePrevious = () => {
    if (currentPage && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage && totalPages && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        type="button"
        onClick={() => handlePrevious()}
        disabled={currentPage === 1}
        className={clsx(
          "px-3 py-1 rounded-md text-white",
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-gray-600"
        )}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages ?? 0 }, (_, index) => index + 1).map(
        (number) => (
          <button
            key={number}
            type="button"
            onClick={() => onPageChange(number)}
            className={clsx(
              "px-3 py-1 rounded-md text-white",
              currentPage === number
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-gray-600"
            )}
          >
            {number}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => handleNext()}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-3 py-1 rounded-md text-white",
          currentPage === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-gray-600"
        )}
      >
        Siguiente
      </button>
    </div>
  );
}

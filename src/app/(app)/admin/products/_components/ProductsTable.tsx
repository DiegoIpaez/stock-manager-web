"use client";
import { Product } from "@prisma/client";
import { Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { formatDateToDDMMYYYY } from "@/utils/formatters/date.formatter";
import { currencyFormatter } from "@/utils/formatters/currency.formmater";
import { showToastSuccess } from "@/utils/showToast.util";
import { PaginationResponse } from "@/utils/formatters/pagination.formatter";
import Table from "@/components/ui/table/Table";
import Pagination from "@/components/ui/Pagination";
import DisabledRow from "@/components/ui/table/rows/DisabledRow";
import {
  getAllProductsByParams,
  removeProductById,
} from "@/services/products.service";
import clientErrorHandler from "@/utils/handlers/clientError.handler";

export default function ProductsTable() {
  const router = useRouter();
  const [data, setData] = useState<Partial<PaginationResponse<Product>>>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const data = await getAllProductsByParams({ page });
      setData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();

    return () => {
      setIsLoading(true);
      setData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, router]);

  async function handleRemoveProductById(id: unknown) {
    try {
      await removeProductById(id ?? "");
      showToastSuccess("Product deleted successfully!");
      await fetchProducts();
    } catch (error: Error | unknown) {
      clientErrorHandler(error);
    }
  }

  return (
    <Fragment>
      <Table
        columns={[
          { key: "name", title: "Product name" },
          {
            key: "price",
            title: "Price",
            render: (row) => `$${currencyFormatter(Number(row?.price ?? 0))}`,
          },
          { key: "stock", title: "Stock" },
          {
            key: "disabled",
            title: "Active",
            className: "text-center",
            rowClassName: "flex justify-center",
            render: (row) => <DisabledRow disabled={row?.disabled} />,
          },
          {
            key: "created_at",
            title: "Created at",
            render: (row) =>
              formatDateToDDMMYYYY(
                row?.created_at ? new Date(row.created_at).toISOString() : ""
              ),
          },
          {
            key: "actions",
            title: "Actions",
            render: (row) => (
              <div className="flex gap-1">
                <button className="bg-warning rounded-full p-[0.3rem]">
                  <Pen size={20} />
                </button>
                <button className="bg-danger hover:bg-danger-dark rounded-full p-[0.3rem]">
                  <Trash
                    size={20}
                    color="white"
                    onClick={() => handleRemoveProductById(row?.id ?? 0)}
                  />
                </button>
              </div>
            ),
          },
        ]}
        data={data?.data}
        loading={isLoading}
      />
      <Pagination {...data} onPageChange={(value) => setPage(value)} />
    </Fragment>
  );
}

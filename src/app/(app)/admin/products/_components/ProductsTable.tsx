"use client";
import { Product } from "@prisma/client";
import { Pen, Plus, Trash } from "lucide-react";
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
import Popconfirm from "@/components/ui/Popconfirm";
import CreateProductModal from "./modals/CreateProductModal";
import { Button } from "@/components/ui/shadcn/button";

function ActionColumn({
  row,
  onRefresh,
}: {
  row: Product;
  onRefresh: () => Promise<void>;
}) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  async function handleRemoveProductById(id: unknown) {
    try {
      setIsSubmitLoading(true);
      await removeProductById(id ?? "");
      showToastSuccess("Product deleted successfully!");
      await onRefresh();
    } catch (error: Error | unknown) {
      clientErrorHandler(error);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  return (
    <div className="flex gap-1">
      <button className="bg-warning rounded-full p-[0.3rem] d-none">
        <Pen size={20} />
      </button>
      <Popconfirm
        trigger={
          <button className="bg-danger hover:bg-danger-dark rounded-full p-[0.3rem]">
            <Trash size={20} color="white" />
          </button>
        }
        content={<p>Are you sure you want to delete this product?</p>}
        onOk={() => handleRemoveProductById(row?.id ?? 0)}
        loading={isSubmitLoading}
      />
    </div>
  );
}

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

  return (
    <Fragment>
      <div className="flex flex-1 justify-end">
        <CreateProductModal onRefresh={fetchProducts}>
          <Button
            variant="outline"
            className="mb-2 bg-success hover:bg-success hover:opacity-90"
          >
            Create New Product <Plus />
          </Button>
        </CreateProductModal>
      </div>
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
              <ActionColumn row={row} onRefresh={fetchProducts} />
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

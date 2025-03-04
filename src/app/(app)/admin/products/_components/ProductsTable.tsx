"use client";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { PaginationResponse } from "@/utils/formatters/pagination.formatter";
import { formatDateToDDMMYYYY } from "@/utils/formatters/date.formatter";
import Table from "@/components/ui/table/Table";
import Pagination from "@/components/ui/Pagination";
import DisabledRow from "@/components/ui/table/rows/DisabledRow";
import { getAllProductsByParams } from "@/services/products.service";
import { currencyFormatter } from "@/utils/formatters/currency.formmater";

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
      alert("Hubo un error al cargar los datos");
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
      <Table
        columns={[
          { key: "name", title: "Nombre" },
          {
            key: "price",
            title: "Precio",
            render: (row) => `$${currencyFormatter(Number(row?.price ?? 0))}`,
          },
          { key: "stock", title: "Stock" },
          {
            key: "disabled",
            title: "Activo",
            className: "text-center",
            rowClassName: "flex justify-center",
            render: (row) => <DisabledRow disabled={row?.disabled} />,
          },
          {
            key: "created_at",
            title: "Fecha de creación",
            render: (row) =>
              formatDateToDDMMYYYY(
                row?.created_at ? new Date(row.created_at).toISOString() : ""
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

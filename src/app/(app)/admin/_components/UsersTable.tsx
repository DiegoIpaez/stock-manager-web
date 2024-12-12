"use client";
import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import { PaginationResponse } from "@/utils/formatters/pagination.formatter";
import { formatDateToDDMMYYYY } from "@/utils/formatters/date.formatter";

export default function UsersTable() {
  const router = useRouter();
  const [data, setData] = useState<Partial<PaginationResponse<User>>>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/users", {
          params: {
            page,
          },
        });

        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();

    return () => {
      setIsLoading(true);
      setData({});
    };
  }, [page, router]);

  return (
    <Table
      columns={[
        { key: "id", title: "ID" },
        { key: "first_name", title: "Nombre" },
        { key: "last_name", title: "Apellido" },
        { key: "email", title: "Email" },
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
      title="Usuarios"
      loading={isLoading}
      pagination={{
        ...data,
        onPageChange: (value) => {
          setPage(value);
        },
      }}
    />
  );
}

"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  deleteUserById,
  disabledUserById,
  getAllUsersByParams,
} from "@/services/users.service";
import { PaginationResponse } from "@/utils/formatters/pagination.formatter";
import { formatDateToDDMMYYYY } from "@/utils/formatters/date.formatter";
import Table from "@/components/ui/table/Table";
import ActionRow from "@/components/ui/table/rows/ActionRow";
import Pagination from "@/components/ui/Pagination";
import DisabledRow from "@/components/ui/table/rows/DisabledRow";

export default function UsersTable() {
  const router = useRouter();
  const [data, setData] = useState<Partial<PaginationResponse<User>>>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const data = await getAllUsersByParams({ page });
      setData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Hubo un error al cargar los datos");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();

    return () => {
      setIsLoading(true);
      setData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, router]);

  const handleOnDelete = async (id: number) => {
    await deleteUserById(id);
    alert("Se ha eliminado el usuario correctamente!");
    await fetchUsers();
  };

  const handleOnDisabled = async (id: number, disabled: boolean) => {
    await disabledUserById(id, disabled);
    alert(
      `Se ha ${
        disabled ? "deshabilitado" : "habilitado"
      } el usuario correctamente!`
    );
    await fetchUsers();
  };

  return (
    <Fragment>
      <Table
        columns={[
          { key: "email", title: "Email" },
          { key: "first_name", title: "Nombre" },
          { key: "last_name", title: "Apellido" },
          {
            key: "disabled",
            title: "Habilitado",
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
          {
            key: "actions",
            title: "Accionés",
            render: (row) => (
              <ActionRow
                allowEdit={false}
                disabledRecord={row?.disabled}
                handleOnDelete={() => handleOnDelete(row?.id)}
                handleOnDisabled={() =>
                  handleOnDisabled(row?.id, !row?.disabled)
                }
              />
            ),
          },
        ]}
        data={data?.data}
        title="Usuarios"
        loading={isLoading}
      />
      <Pagination {...data} onPageChange={(value) => setPage(value)} />
    </Fragment>
  );
}

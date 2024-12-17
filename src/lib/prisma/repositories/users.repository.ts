import { Prisma, User } from "@prisma/client";
import { paginationFormatter } from "@/utils/formatters/pagination.formatter";
import prisma from "../client";
import { DEFAULT_PAGINATION } from "@/constants";

const { PAGE, PAGE_SIZE } = DEFAULT_PAGINATION;

export async function getPaginatedUsers({
  page = PAGE,
  limit = PAGE_SIZE,
  deleted = false,
  id,
}: {
  page: number;
  limit: number;
  deleted: boolean;
  id?: number;
}) {
  const whereClause: Prisma.UserWhereInput = { deleted };
  if (id) whereClause.id = { not: id };

  const totalRecords = await prisma.user.count({ where: whereClause });

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: whereClause,
    orderBy: {
      last_login: {
        sort: Prisma.SortOrder.desc,
        nulls: Prisma.NullsOrder.last,
      },
    },
  });

  const paginationResponse = paginationFormatter<User>({
    data: users,
    page,
    limit,
    totalRecords,
  });

  return paginationResponse;
}

export async function getUserByFilter(filter: Prisma.UserWhereUniqueInput) {
  return await prisma.user.findUnique({ where: filter });
}

export async function updateUserById(id: number, data: Prisma.UserUpdateInput) {
  const updatedUser = await prisma.user.update({ where: { id }, data });
  return updatedUser;
}

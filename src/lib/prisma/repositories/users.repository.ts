import { Prisma, User } from "@prisma/client";
import { paginationFormatter } from "@/utils/formatters/pagination.formatter";
import prisma from "../client";
import { DEFAULT_PAGINATION } from "@/constants";

const { PAGE, PAGE_SIZE } = DEFAULT_PAGINATION;

export async function getPaginatedUsers({
  page = PAGE,
  limit = PAGE_SIZE,
  deleted = false,
}) {
  const whereClause: Prisma.UserWhereInput = {};
  if (deleted) whereClause.deleted = deleted;

  const totalRecords = await prisma.user.count({ where: whereClause });

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: whereClause,
    orderBy: {
      updated_at: "desc",
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

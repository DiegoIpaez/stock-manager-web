import { Prisma, Product } from "@prisma/client";
import { DEFAULT_PAGINATION } from "@/constants";
import { paginationFormatter } from "@/utils/formatters/pagination.formatter";
import prisma from "../client";

const { PAGE, PAGE_SIZE } = DEFAULT_PAGINATION;

export async function getPaginatedProducts({
  page = PAGE,
  limit = PAGE_SIZE,
  deleted = false,
}: {
  page: number;
  limit: number;
  deleted: boolean;
}) {
  const whereClause: Prisma.ProductWhereInput = { deleted };

  const totalRecords = await prisma.product.count({ where: whereClause });
  const products = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: whereClause,
  });

  const paginationResponse = paginationFormatter<Product>({
    data: products,
    page,
    limit,
    totalRecords,
  });

  return paginationResponse;
}

export async function updateProductById(
  id: number,
  data: Prisma.ProductUpdateInput
) {
  const updatedUser = await prisma.product.update({ where: { id }, data });
  return updatedUser;
}

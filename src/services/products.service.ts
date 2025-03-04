/* eslint-disable @typescript-eslint/no-explicit-any */
import clientAxios from "@/utils/clientAxios.util";

export async function getAllProductsByParams(params: unknown) {
  const { data } = await clientAxios.get("products", { params });
  return data;
}

export async function removeProductById(id: any) {
  const { data } = await clientAxios.delete(`products/${id}`);
  return data;
}

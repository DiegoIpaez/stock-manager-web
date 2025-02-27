import clientAxios from "@/utils/clientAxios.util";

export async function getAllProductsByParams(params: unknown) {
  const { data } = await clientAxios.get("products", { params });
  return data;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import clientAxios from "@/utils/clientAxios.util";
import { CONFIG } from "@/constants";

export async function createProduct(payloadRaw: any) {
  const formData = new FormData();
  formData.append("name", payloadRaw?.name);
  formData.append("stock", payloadRaw?.stock);
  formData.append("price", payloadRaw?.price);
  formData.append("description", payloadRaw?.description);

  Object.keys(payloadRaw?.images || {}).forEach((key) => {
    formData.append("images", payloadRaw.images[key]);
  });

  const endpoint = `${CONFIG.BASE_URL}/api/products`;
  const { data } = await axios.post(endpoint, formData);

  return data;
}

export async function getAllProductsByParams(params: unknown) {
  const { data } = await clientAxios.get("products", { params });
  return data;
}

export async function removeProductById(id: any) {
  const { data } = await clientAxios.delete(`products/${id}`);
  return data;
}

import clientAxios from "@/utils/clientAxios.util";

export async function getAllUsersByParams(params: unknown) {
  const { data } = await clientAxios.get("users", { params });
  return data;
}

export async function deleteUserById(id: number) {
  const { data } = await clientAxios.delete(`/users/${id}`);
  return data;
}

export async function disabledUserById(id: number, disabled: boolean) {
  const { data } = await clientAxios.put(`/users/${id}`, { disabled });
  return data;
}

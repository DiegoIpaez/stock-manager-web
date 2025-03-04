import { Metadata } from "next";
import ProductsTable from "./_components/ProductsTable";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  return (
    <div className="mx-10">
      <ProductsTable />
    </div>
  );
}

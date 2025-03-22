import { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import ProductsTable from "./_components/ProductsTable";
import CreateProductModal from "./_components/modals/CreateProductModal";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <div className="mx-10">
      <div className="flex flex-1 justify-end">
        <CreateProductModal>
          <Button
            variant="outline"
            className="mb-2 bg-success hover:bg-success hover:opacity-90"
          >
            Create New Product <Plus />
          </Button>
        </CreateProductModal>
      </div>
      <ProductsTable />
    </div>
  );
}

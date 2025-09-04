"use client";
import { Loader } from "lucide-react";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllProductsByParams } from "@/services/products.service";
import { PaginationResponse } from "@/utils/formatters/pagination.formatter";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "./ProductCard";

export default function CardList() {
  const [data, setData] = useState<Partial<PaginationResponse<Product>>>({});
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setisLoading(true);
        const data = await getAllProductsByParams({ page });

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setisLoading(false);
      }
    };

    fetchProducts();
    return () => {
      setData({});
    };
  }, [page]);

  return isLoading ? (
    <div className="flex justify-center mt-20">
      <Loader size={50} className="animate-spin" />
    </div>
  ) : (
    <div>
      <div className="flex justify-center gap-5 mb-10">
        {data?.data &&
          data?.data.length > 0 &&
          data?.data?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
      <div className="mb-10">
        <Pagination {...data} onPageChange={(value) => setPage(value)} />
      </div>
    </div>
  );
}

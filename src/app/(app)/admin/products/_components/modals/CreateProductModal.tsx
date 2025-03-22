"use client";
import { z } from "zod";
import { useState } from "react";
import { File, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { createProduct } from "@/services/products.service";
import { useRouter } from "next/navigation";
import clientErrorHandler from "@/utils/handlers/clientError.handler";
import { showToastSuccess } from "@/utils/showToast.util";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  price: z.coerce.number().min(0, {
    message: "Price must be at least 1.",
  }),
  stock: z.coerce.number().min(0, {
    message: "Stock must be at least 0.",
  }),
  disabled: z.boolean(),
  images: z.any(),
});

export default function CreateProductModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      disabled: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmit(true);
    try {
      await createProduct(values);
      showToastSuccess("Product created successfully!");
      router.refresh();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input min={0} type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input min={0} type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="images"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          {...fieldProps}
                          placeholder="Picture"
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            onChange(event.target.files && event.target.files)
                          }
                        />
                        {value && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {Array.from(value).map((file: any) => (
                              <div
                                key={file?.name}
                                className="bg-primary flex flex-1 p-3 rounded text-sm gap-2 text-white"
                              >
                                <File size={17} />
                                {file?.name} - {file?.size} bytes
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Button
                  disabled={isSubmit}
                  type="submit"
                  className="bg-success hover:bg-success hover:opacity-90"
                >
                  {isSubmit && <Loader2 className="mr-2 animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

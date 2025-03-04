import clsx from "clsx";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const ADMIN_MENU = [
  {
    id: 1,
    name: "Users",
    href: "/admin",
  },
  {
    id: 2,
    name: "Products",
    href: "/admin/products",
  },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex gap-2 mx-10 px-1 py-1 bg-white rounded my-5 shadow">
        {ADMIN_MENU.map((item) => (
          <Link
            className={clsx("bg-primary p-1 flex-1 rounded text-center text-white")}
            href={item.href}
            key={item.id}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}

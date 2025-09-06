import { Metadata } from "next";
import UsersTable from "./_components/UsersTable";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  return (
    <div className="mx-10">
      <UsersTable />
    </div>
  );
}

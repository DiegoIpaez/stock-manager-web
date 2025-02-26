import Link from "next/link";
import Logout from "./Logout";
import AdminLink from "./AdminLink";

export default function Navbar() {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold">SM</div>
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link href="/" className="hover:underline p-1">
            Home
          </Link>
          <Link href="/profile" className="hover:underline p-1">
            Profile
          </Link>
          <AdminLink />
          <Logout />
        </nav>
      </div>
    </header>
  );
}

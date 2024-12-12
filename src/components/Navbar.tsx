import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold">SM</div>
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline p-1">
            Inicio
          </Link>
          <Link href="/admin" className="hover:underline p-1">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-danger">404</h1>
        <p className="mt-4 text-lg">
          ¡Vaya! La página que buscas no se encontró.
        </p>
        <Link
          href={"/"}
          className="mt-6 inline-block px-6 py-3 text-white bg-primary rounded-xl hover:bg-primary-dark"
        >
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
}

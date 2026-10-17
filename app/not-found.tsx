import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NoEncontrado() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-6xl font-black text-azul">404</p>
        <h1 className="mt-4 text-2xl font-extrabold">No encontramos esta página</h1>
        <p className="mt-2 text-lg text-gris-texto">
          Puede que el enlace esté mal escrito o que el evento ya no esté disponible.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-md bg-azul px-6 text-lg font-bold text-white hover:bg-azul-oscuro"
        >
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}

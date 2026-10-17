import type { Metadata } from "next";
import FormularioLogin from "@/components/login/FormularioLogin";
import { buscarEvento } from "@/data/events";

export const metadata: Metadata = { title: "Iniciar sesión" };

/** Solo se aceptan rutas internas ("/algo"), nunca URLs externas. */
function rutaSegura(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  if (!valor.startsWith("/") || valor.startsWith("//")) return null;
  return valor;
}

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const siguiente = rutaSegura(next);

  // Si venía de "Comprar boletas", mostramos el nombre del evento.
  const slug = siguiente?.match(/^\/evento\/([^/]+)/)?.[1];
  const evento = slug ? buscarEvento(slug) : undefined;

  return (
    // Sin navbar ni footer: en el login solo se ve el cuadro.
    <main className="flex flex-1 items-center justify-center bg-gris-claro px-4 pt-10 pb-16 sm:pt-14 sm:pb-20">
      <FormularioLogin
        siguiente={siguiente}
        eventoPendiente={evento ? `${evento.artista} · ${evento.gira}` : null}
      />
    </main>
  );
}

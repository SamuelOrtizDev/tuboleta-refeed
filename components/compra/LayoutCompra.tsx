"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HeaderCompra from "@/components/layout/HeaderCompra";
import Stepper from "./Stepper";
import ResumenCompra from "./ResumenCompra";
import { useCompra } from "@/context/CompraContext";
import { buscarEvento, buscarLocalidad } from "@/data/events";

type Paso = 1 | 2 | 3 | 4;

type Props = {
  paso: Paso;
  /** Slug del evento (pasos 1 y 2, vienen en la URL). */
  slug?: string;
  titulo: string;
  subtitulo?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Revisa qué le falta a la compra para estar en este paso.
 * Devuelve la ruta a la que hay que ir, o null si todo está bien.
 */
function useRedireccion(paso: Paso, slug?: string): string | null {
  const { usuario, compra, orden } = useCompra();
  const ruta = slug ? `/evento/${slug}/compra` : null;

  if (paso === 4) return orden ? null : "/";
  if (!usuario) {
    const siguiente = paso <= 2 && ruta ? ruta : compra ? `/evento/${compra.slug}/compra` : "/";
    return `/login?next=${encodeURIComponent(siguiente)}`;
  }
  if (paso === 1) return null; // La compra se inicia aquí mismo si hace falta.

  if (paso === 2) {
    if (orden) return "/confirmacion"; // Ya pagada: no se pueden cambiar los asientos.
    if (!compra || compra.slug !== slug || !compra.localidadId) return ruta;
    return null;
  }

  // Paso 3: pago. Si ya se pagó, se muestra la confirmación (evita pagar dos veces).
  if (orden) return "/confirmacion";
  if (!compra) return "/";
  const evento = buscarEvento(compra.slug);
  if (!evento || !buscarLocalidad(evento, compra.localidadId)) return `/evento/${compra.slug}/compra`;
  if (compra.asientos.length !== compra.cantidad) return `/evento/${compra.slug}/compra/asientos`;
  return null;
}

/**
 * Estructura común de los pasos de compra: header simple, indicador de pasos,
 * título, contenido y resumen siempre visible. Texto base de 18px.
 */
export default function LayoutCompra({ paso, slug, titulo, subtitulo, children }: Props) {
  const router = useRouter();
  const { listo, compra, orden, iniciarCompra } = useCompra();
  const redireccion = useRedireccion(paso, slug);

  // En el paso 1 la compra se crea (o se reinicia si era de otro evento o ya se pagó).
  const faltaIniciar = paso === 1 && !!slug && (compra?.slug !== slug || !!orden);

  useEffect(() => {
    if (!listo) return;
    if (redireccion) router.replace(redireccion);
    else if (faltaIniciar && slug) iniciarCompra(slug);
  }, [listo, redireccion, faltaIniciar, slug, router, iniciarCompra]);

  // Al terminar el pago se redirige a la confirmación: el paso de pago sigue
  // visible (con el cargador encima) mientras llega la nueva página.
  const yendoAConfirmacion = paso === 3 && redireccion === "/confirmacion";
  const preparado = listo && (!redireccion || yendoAConfirmacion) && !faltaIniciar;

  return (
    <>
      <HeaderCompra />
      <Stepper actual={paso} />
      <main className="flex-1 bg-[#f7f8fa] pb-16 text-lg text-tinta">
        {!preparado ? (
          <p className="mx-auto max-w-7xl px-4 py-24 text-center text-gris-texto" role="status">
            Cargando tu compra…
          </p>
        ) : (
          <div
            className={`mx-auto grid gap-8 px-4 pt-8 lg:pt-12 ${
              // El pago y la confirmación son formularios y textos: van más angostos y con más aire.
              // Boletas y asientos necesitan el ancho completo para tarjetas y mapa.
              paso >= 3
                ? "max-w-6xl lg:grid-cols-[1fr_340px] lg:gap-14"
                : "max-w-7xl lg:grid-cols-[1fr_360px]"
            }`}
          >
            <div className="min-w-0">
              <h1 className="text-[30px] leading-tight font-extrabold sm:text-[34px]">{titulo}</h1>
              {subtitulo && <p className="mt-2 text-lg text-gris-texto">{subtitulo}</p>}
              <div className="mt-5 lg:hidden print:hidden">
                <ResumenCompra variante="compacto" deOrden={paso === 4} />
              </div>
              <div className="mt-8">{children}</div>
            </div>
            <aside className="hidden lg:block print:hidden">
              <div className="sticky top-6">
                <ResumenCompra deOrden={paso === 4} />
              </div>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderEvento from "@/components/layout/HeaderEvento";
import Footer from "@/components/layout/Footer";
import PosterEvento from "@/components/ui/PosterEvento";
import SubnavEvento from "@/components/evento/SubnavEvento";
import FichaEvento from "@/components/evento/FichaEvento";
import BotonComprar from "@/components/evento/BotonComprar";
import {
  ComoComprar,
  ComoLlegar,
  ElEvento,
  EtapasDeVenta,
  LocalidadYPrecios,
  TenEnCuenta,
} from "@/components/evento/SeccionesInfo";
import { buscarEvento, eventos, precioDesde, tituloDetalle } from "@/data/events";
import { formatearPrecio } from "@/lib/formato";

export function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/evento/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const evento = buscarEvento(slug);
  return { title: evento ? tituloDetalle(evento) : "Evento no encontrado" };
}

/** Detalle del evento con el estilo crema y marino de web.tuboleta.com. */
export default async function DetalleEvento({ params }: PageProps<"/evento/[slug]">) {
  const { slug } = await params;
  const evento = buscarEvento(slug);
  if (!evento) notFound();

  return (
    <>
      <HeaderEvento />
      <PosterEvento
        evento={evento}
        variante="banner"
        className="aspect-[16/7] w-full sm:aspect-[4/1]"
      />
      <SubnavEvento slug={evento.slug} />

      <main className="flex-1 bg-crema pb-28 sm:pb-24">
        <div className="mx-auto max-w-[1160px] px-4">
          <h1 className="pt-10 font-display text-[36px] leading-tight font-bold text-marino sm:text-[46px]">
            {tituloDetalle(evento)}
          </h1>
          <FichaEvento evento={evento} />

          <ComoComprar evento={evento} />
          <EtapasDeVenta evento={evento} />
          <LocalidadYPrecios evento={evento} />
          <ElEvento evento={evento} />
          <ComoLlegar evento={evento} />
          <TenEnCuenta evento={evento} />

          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-marino px-6 py-10 text-center text-white">
            <p className="font-display text-2xl font-bold sm:text-3xl">
              ¿Listo para vivir {evento.artista}?
            </p>
            <p className="text-lg text-white/85">
              Boletas desde {formatearPrecio(precioDesde(evento))}
            </p>
            <BotonComprar slug={evento.slug} tamano="grande" />
          </div>
        </div>
      </main>

      {/* En móvil el botón de compra queda fijo abajo, sobre la franja de aviso. */}
      <div className="fixed inset-x-0 bottom-8 z-40 border-t border-crema-borde bg-crema-claro p-3 sm:hidden">
        <BotonComprar slug={evento.slug} tamano="grande" className="w-full" />
      </div>

      <Footer variante="marino" />
    </>
  );
}

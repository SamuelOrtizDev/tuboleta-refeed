import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PasoAsientos from "@/components/compra/PasoAsientos";
import { buscarEvento, eventos } from "@/data/events";

export const metadata: Metadata = { title: "Elige tus asientos" };

export function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export default async function CompraAsientosPage({
  params,
}: PageProps<"/evento/[slug]/compra/asientos">) {
  const { slug } = await params;
  if (!buscarEvento(slug)) notFound();
  return <PasoAsientos slug={slug} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PasoBoletas from "@/components/compra/PasoBoletas";
import { buscarEvento, eventos } from "@/data/events";

export const metadata: Metadata = { title: "Elige tus boletas" };

export function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export default async function CompraBoletasPage({
  params,
}: PageProps<"/evento/[slug]/compra">) {
  const { slug } = await params;
  if (!buscarEvento(slug)) notFound();
  return <PasoBoletas slug={slug} />;
}

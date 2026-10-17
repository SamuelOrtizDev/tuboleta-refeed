"use client";

import { useRouter } from "next/navigation";
import { useCompra } from "@/context/CompraContext";
import { IconoBoleta } from "@/components/ui/Iconos";

type Props = {
  slug: string;
  tamano?: "normal" | "grande";
  className?: string;
};

/**
 * "Comprar boletas". Sin sesión lleva al login y luego vuelve a la compra.
 * Con sesión inicia (o retoma) la compra del evento.
 */
export default function BotonComprar({ slug, tamano = "normal", className = "" }: Props) {
  const { usuario, iniciarCompra } = useCompra();
  const router = useRouter();
  const destino = `/evento/${slug}/compra`;

  function comprar() {
    if (!usuario) {
      router.push(`/login?next=${encodeURIComponent(destino)}`);
      return;
    }
    iniciarCompra(slug);
    router.push(destino);
  }

  const medidas =
    tamano === "grande"
      ? "min-h-14 px-8 text-lg gap-3"
      : "min-h-11 px-5 text-[15px] gap-2";

  return (
    <button
      type="button"
      onClick={comprar}
      className={`inline-flex items-center justify-center rounded-[4px] bg-ladrillo font-bold whitespace-nowrap text-white transition-colors hover:bg-ladrillo-oscuro ${medidas} ${className}`}
    >
      <IconoBoleta className={tamano === "grande" ? "text-2xl" : "text-xl"} />
      Comprar boletas
    </button>
  );
}

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "primario" | "secundario" | "exito";

const base =
  "inline-flex min-h-14 items-center justify-center gap-3 rounded-lg px-6 text-lg font-bold transition-colors text-center";

const variantes: Record<Variante, string> = {
  primario: "bg-azul text-white hover:bg-azul-oscuro",
  secundario: "border-2 border-tinta/25 bg-white text-tinta hover:border-tinta/60 hover:bg-gris-claro",
  exito: "bg-exito text-white hover:bg-[#186330]",
};

/** Clase usada cuando la acción aún no se puede hacer (se ve apagada pero sigue respondiendo). */
const apagado = "bg-[#9aa7b2] text-white hover:bg-[#8a97a2]";

type PropsBoton = ComponentProps<"button"> & {
  variante?: Variante;
  /** Se ve apagado, pero sigue recibiendo clics para poder explicar qué falta. */
  apagadoVisual?: boolean;
  icono?: ReactNode;
  iconoFinal?: ReactNode;
};

/** Botón grande (mínimo 56px de alto) para el proceso de compra. */
export function Boton({
  variante = "primario",
  apagadoVisual = false,
  icono,
  iconoFinal,
  className = "",
  children,
  ...props
}: PropsBoton) {
  return (
    <button
      type="button"
      aria-disabled={apagadoVisual || undefined}
      className={`${base} ${apagadoVisual ? apagado : variantes[variante]} ${className}`}
      {...props}
    >
      {icono}
      <span>{children}</span>
      {iconoFinal}
    </button>
  );
}

type PropsEnlace = ComponentProps<typeof Link> & {
  variante?: Variante;
  icono?: ReactNode;
};

/** Enlace con apariencia de botón grande. */
export function BotonEnlace({
  variante = "secundario",
  icono,
  className = "",
  children,
  ...props
}: PropsEnlace) {
  return (
    <Link className={`${base} ${variantes[variante]} ${className}`} {...props}>
      {icono}
      <span>{children}</span>
    </Link>
  );
}

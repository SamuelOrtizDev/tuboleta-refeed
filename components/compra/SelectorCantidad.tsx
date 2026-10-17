"use client";

import { IconoMas, IconoMenos } from "@/components/ui/Iconos";

type Props = {
  valor: number;
  maximo: number;
  onCambiar: (n: number) => void;
  deshabilitado?: boolean;
};

/** Botones − y + grandes (64px) con el número en el centro. */
export default function SelectorCantidad({ valor, maximo, onCambiar, deshabilitado = false }: Props) {
  const puedeBajar = !deshabilitado && valor > 1;
  const puedeSubir = !deshabilitado && valor < maximo;

  const boton =
    "flex h-16 w-16 items-center justify-center rounded-full border-2 text-3xl transition-colors disabled:cursor-not-allowed disabled:border-gris-borde disabled:bg-gris-claro disabled:text-gris-borde";

  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => onCambiar(valor - 1)}
        disabled={!puedeBajar}
        aria-label="Quitar una boleta"
        className={`${boton} border-azul bg-white text-azul hover:bg-azul-claro`}
      >
        <IconoMenos strokeWidth={3} />
      </button>
      <output
        aria-live="polite"
        aria-label={`${valor} ${valor === 1 ? "boleta" : "boletas"}`}
        className={`flex w-24 flex-col items-center leading-none ${deshabilitado ? "text-gris-borde" : ""}`}
      >
        <span className="text-5xl font-extrabold">{valor}</span>
        <span className="mt-1 text-base font-semibold text-gris-texto">
          {valor === 1 ? "boleta" : "boletas"}
        </span>
      </output>
      <button
        type="button"
        onClick={() => onCambiar(valor + 1)}
        disabled={!puedeSubir}
        aria-label="Agregar una boleta"
        className={`${boton} border-azul bg-azul text-white hover:bg-azul-oscuro`}
      >
        <IconoMas strokeWidth={3} />
      </button>
    </div>
  );
}

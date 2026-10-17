"use client";

import type { ComponentProps } from "react";
import { IconoAlerta } from "@/components/ui/Iconos";

type Props = Omit<ComponentProps<"input">, "onChange"> & {
  id: string;
  etiqueta: string;
  valor: string;
  onCambiar: (valor: string) => void;
  error?: string;
  ayuda?: string;
};

/**
 * Campo de texto grande (56px de alto, letra de 18px) con etiqueta visible,
 * ayuda y mensaje de error. Sin autocompletar: nada se guarda en el navegador.
 */
export default function Campo({ id, etiqueta, valor, onCambiar, error, ayuda, className = "", ...props }: Props) {
  const descripcion = [error && `${id}-error`, ayuda && `${id}-ayuda`].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-lg font-semibold">
        {etiqueta}
      </label>
      <input
        id={id}
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        autoComplete="off"
        spellCheck={false}
        aria-invalid={!!error}
        aria-describedby={descripcion || undefined}
        className={`h-14 w-full rounded-lg border-2 bg-white px-4 text-lg outline-none focus:border-azul ${error ? "border-ladrillo" : "border-gris-borde"}`}
        {...props}
      />
      {ayuda && !error && (
        <p id={`${id}-ayuda`} className="mt-1.5 text-base text-gris-texto">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-2 text-base font-semibold text-ladrillo">
          <IconoAlerta className="shrink-0 text-lg" />
          {error}
        </p>
      )}
    </div>
  );
}

type PropsSelect = Omit<ComponentProps<"select">, "onChange"> & {
  id: string;
  etiqueta: string;
  valor: string;
  onCambiar: (valor: string) => void;
  opciones: string[];
  error?: string;
  vacio?: string;
};

export function Selector({ id, etiqueta, valor, onCambiar, opciones, error, vacio, className = "", ...props }: PropsSelect) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-lg font-semibold">
        {etiqueta}
      </label>
      <select
        id={id}
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-14 w-full rounded-lg border-2 bg-white px-3 text-lg outline-none focus:border-azul ${error ? "border-ladrillo" : "border-gris-borde"}`}
        {...props}
      >
        {vacio && <option value="">{vacio}</option>}
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-2 text-base font-semibold text-ladrillo">
          <IconoAlerta className="shrink-0 text-lg" />
          {error}
        </p>
      )}
    </div>
  );
}

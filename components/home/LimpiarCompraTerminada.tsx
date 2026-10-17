"use client";

import { useEffect } from "react";
import { useCompra } from "@/context/CompraContext";

/**
 * Al volver a la home después de una compra pagada, se borra esa compra (la
 * sesión se conserva). Así el siguiente recorrido del video empieza limpio.
 */
export default function LimpiarCompraTerminada() {
  const { listo, orden, terminarCompra } = useCompra();
  useEffect(() => {
    if (listo && orden) terminarCompra();
  }, [listo, orden, terminarCompra]);
  return null;
}

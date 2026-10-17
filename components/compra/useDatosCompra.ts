"use client";

import { useCompra } from "@/context/CompraContext";
import { buscarEvento, buscarLocalidad, precioTotal } from "@/data/events";

/**
 * Datos derivados de la compra en curso (o de la orden ya pagada, si `deOrden`).
 * Calcula precios y totales para que todos los pasos muestren lo mismo.
 */
export function useDatosCompra({ deOrden = false } = {}) {
  const ctx = useCompra();
  const compra = deOrden ? (ctx.orden?.compra ?? null) : ctx.compra;
  const evento = compra ? buscarEvento(compra.slug) : undefined;
  const localidad = evento ? buscarLocalidad(evento, compra?.localidadId) : undefined;
  const cantidad = compra?.cantidad ?? 0;

  return {
    compra,
    evento,
    localidad,
    cantidad,
    asientos: compra?.asientos ?? [],
    precioUnitario: localidad ? precioTotal(localidad) : 0,
    subtotal: localidad ? localidad.precio * cantidad : 0,
    servicio: localidad ? localidad.servicio * cantidad : 0,
    total: localidad ? precioTotal(localidad) * cantidad : 0,
  };
}

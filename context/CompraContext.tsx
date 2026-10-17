"use client";

/**
 * Estado del flujo simulado: usuario "logueado", compra en curso y orden final.
 *
 * - Se persiste en sessionStorage para que un refresh durante la grabación no
 *   rompa el flujo. Se borra al cerrar la pestaña.
 * - Se lee con useSyncExternalStore: en el servidor y durante la hidratación se
 *   usa el estado vacío, y justo después React pasa al estado guardado. Así no
 *   hay diferencias de hidratación. `listo` indica que ya se leyó el estado real.
 * - Nunca se guarda la contraseña ni datos de pago.
 */

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type Usuario = { nombre: string; correo: string };

export type Compra = {
  slug: string;
  localidadId: string | null;
  cantidad: number;
  /** Identificadores de asiento, por ejemplo "C-5" (fila C, asiento 5). */
  asientos: string[];
};

export type Orden = {
  numero: string;
  /** Fecha ISO en que se "pagó". */
  fecha: string;
  metodoPago: string;
  compra: Compra;
  total: number;
};

type Estado = {
  usuario: Usuario | null;
  compra: Compra | null;
  orden: Orden | null;
};

const CLAVE = "tuboleta-prototipo";
const INICIAL: Estado = { usuario: null, compra: null, orden: null };
export const CANTIDAD_MAXIMA = 6;

/* ---------- Almacén externo respaldado por sessionStorage ---------- */

let estado: Estado = INICIAL;
let cargado = false;
const oyentes = new Set<() => void>();

function leer(): Estado {
  if (!cargado && typeof window !== "undefined") {
    cargado = true;
    try {
      const guardado = window.sessionStorage.getItem(CLAVE);
      if (guardado) estado = { ...INICIAL, ...(JSON.parse(guardado) as Partial<Estado>) };
    } catch {
      estado = INICIAL;
    }
  }
  return estado;
}

function escribir(cambio: (actual: Estado) => Estado) {
  estado = cambio(leer());
  try {
    window.sessionStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    // Sin sessionStorage (modo privado estricto): el flujo sigue en memoria.
  }
  oyentes.forEach((f) => f());
}

function suscribir(f: () => void) {
  oyentes.add(f);
  return () => oyentes.delete(f);
}

const sinSuscripcion = () => () => {};

/* ---------- Acciones ---------- */

/** "carmen.lopez@correo.com" → "Carmen" */
function nombreDesdeCorreo(correo: string): string {
  const local = correo.split("@")[0] ?? "";
  const primera = local.split(/[._\-+\d\s]+/).find(Boolean) ?? "";
  if (!primera) return "Usuario";
  return primera.charAt(0).toUpperCase() + primera.slice(1).toLowerCase();
}

const acciones = {
  iniciarSesion(correo: string) {
    const limpio = correo.trim();
    escribir((e) => ({ ...e, usuario: { nombre: nombreDesdeCorreo(limpio), correo: limpio } }));
  },
  cerrarSesion() {
    escribir(() => INICIAL);
  },
  /**
   * Empieza (o retoma) la compra de un evento. Si era otro evento, o si la
   * compra anterior ya se pagó, empieza una nueva desde cero.
   */
  iniciarCompra(slug: string) {
    escribir((e) =>
      e.compra?.slug === slug && !e.orden
        ? e
        : { ...e, orden: null, compra: { slug, localidadId: null, cantidad: 1, asientos: [] } },
    );
  },
  elegirLocalidad(localidadId: string) {
    escribir((e) =>
      e.compra && e.compra.localidadId !== localidadId
        ? { ...e, compra: { ...e.compra, localidadId, asientos: [] } }
        : e,
    );
  },
  cambiarCantidad(cantidad: number) {
    escribir((e) => {
      if (!e.compra) return e;
      const n = Math.max(1, Math.min(CANTIDAD_MAXIMA, cantidad));
      // Si baja la cantidad, se conservan los primeros asientos elegidos.
      return { ...e, compra: { ...e.compra, cantidad: n, asientos: e.compra.asientos.slice(0, n) } };
    });
  },
  /** Marca o desmarca un asiento. Devuelve false si ya estaban todos elegidos. */
  alternarAsiento(id: string): boolean {
    const compra = leer().compra;
    if (!compra) return false;
    if (compra.asientos.includes(id)) {
      escribir((e) => ({
        ...e,
        compra: { ...compra, asientos: compra.asientos.filter((a) => a !== id) },
      }));
      return true;
    }
    if (compra.asientos.length >= compra.cantidad) return false;
    escribir((e) => ({ ...e, compra: { ...compra, asientos: [...compra.asientos, id] } }));
    return true;
  },
  /** Crea la orden ficticia a partir de la compra en curso. */
  confirmarPago(metodoPago: string, total: number) {
    escribir((e) => {
      if (!e.compra) return e;
      const ahora = new Date();
      const sufijo = (ahora.getTime() % 90000) + 10000;
      return {
        ...e,
        orden: {
          numero: `TB-${ahora.getFullYear()}-${sufijo}`,
          fecha: ahora.toISOString(),
          metodoPago,
          compra: e.compra,
          total,
        },
      };
    });
  },
  /** Termina el flujo: borra compra y orden, conserva la sesión. */
  terminarCompra() {
    escribir((e) => ({ ...e, compra: null, orden: null }));
  },
};

/* ---------- Contexto ---------- */

type Valor = Estado & typeof acciones & { listo: boolean };

const CompraContext = createContext<Valor | null>(null);

export function CompraProvider({ children }: { children: React.ReactNode }) {
  const actual = useSyncExternalStore(suscribir, leer, () => INICIAL);
  const listo = useSyncExternalStore(
    sinSuscripcion,
    () => true,
    () => false,
  );

  const valor = useMemo<Valor>(() => ({ ...actual, ...acciones, listo }), [actual, listo]);
  return <CompraContext.Provider value={valor}>{children}</CompraContext.Provider>;
}

export function useCompra(): Valor {
  const valor = useContext(CompraContext);
  if (!valor) throw new Error("useCompra debe usarse dentro de <CompraProvider>");
  return valor;
}

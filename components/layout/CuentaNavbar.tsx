"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCompra } from "@/context/CompraContext";
import { IconoFlechaAbajo, IconoUsuario } from "@/components/ui/Iconos";

type Props = {
  /**
   * "azul": navbar del sitio (texto blanco, sin borde).
   * "marino": header del detalle (botón con borde, como "Mi cuenta" en el original).
   * "compra": header simple del proceso de compra.
   */
  variante?: "azul" | "marino" | "compra";
};

/**
 * Sin sesión muestra "Iniciar sesión". Con sesión muestra "Hola, [nombre]" y un
 * menú con "Cerrar sesión". Mientras se lee la sesión queda invisible (mismo
 * tamaño) para que no parpadee.
 */
export default function CuentaNavbar({ variante = "azul" }: Props) {
  const { usuario, listo, cerrarSesion } = useCompra();
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const alClic = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    const alTecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("mousedown", alClic);
    document.addEventListener("keydown", alTecla);
    return () => {
      document.removeEventListener("mousedown", alClic);
      document.removeEventListener("keydown", alTecla);
    };
  }, [abierto]);

  const estilos = {
    azul: "text-[17px] font-semibold text-white hover:underline underline-offset-4",
    marino:
      "rounded-[4px] border border-white/40 px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10",
    compra: "text-lg font-semibold text-white hover:underline underline-offset-4",
  }[variante];

  const oculto = listo ? "" : "invisible";

  if (!usuario) {
    return (
      <Link
        href="/login"
        className={`flex items-center gap-2 whitespace-nowrap ${estilos} ${oculto}`}
      >
        <IconoUsuario className="text-2xl" />
        <span className={variante === "azul" ? "sr-only sm:not-sr-only" : ""}>
          {variante === "marino" ? "Mi cuenta" : "Iniciar sesión"}
        </span>
      </Link>
    );
  }

  return (
    <div ref={contenedor} className={`relative ${oculto}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        className={`flex items-center gap-2 whitespace-nowrap ${estilos}`}
      >
        <IconoUsuario className="text-2xl" />
        <span className={variante === "azul" ? "sr-only sm:not-sr-only" : ""}>
          Hola, {usuario.nombre}
        </span>
        <IconoFlechaAbajo className="text-base" />
      </button>

      {abierto && (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-md bg-white text-tinta shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        >
          <div className="border-b border-gris-borde px-4 py-3">
            <p className="font-bold">{usuario.nombre}</p>
            <p className="truncate text-sm text-gris-texto">{usuario.correo}</p>
          </div>
          {["Mis compras", "Mis datos", "Mis bonos"].map((t) => (
            <a
              key={t}
              href="#"
              role="menuitem"
              className="block px-4 py-3 text-[15px] font-medium hover:bg-gris-claro"
            >
              {t}
            </a>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setAbierto(false);
              cerrarSesion();
              router.push("/");
            }}
            className="block w-full border-t border-gris-borde px-4 py-3 text-left text-[15px] font-semibold text-ladrillo hover:bg-gris-claro"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

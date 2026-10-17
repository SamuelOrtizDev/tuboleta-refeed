"use client";

import Link from "next/link";
import Form from "next/form";
import { useState } from "react";
import Wordmark from "./Wordmark";
import CuentaNavbar from "./CuentaNavbar";
import {
  IconoBuscar,
  IconoCerrar,
  IconoFiltros,
  IconoFlechaAbajo,
  IconoMenu,
} from "@/components/ui/Iconos";

const categorias = [
  { nombre: "Conciertos", href: "/?categoria=conciertos#proximos" },
  { nombre: "Teatro", href: "/?categoria=teatro#proximos" },
  { nombre: "Deportes", href: "/?categoria=deportes#proximos" },
  { nombre: "Familiares", href: "/?categoria=familiares#proximos" },
  { nombre: "Ventas a empresas", href: "#" },
];

const enlacesDerecha = [
  { nombre: "Bono Regalo", href: "#" },
  { nombre: "Pásala", href: "#" },
  { nombre: "Contáctanos", href: "#" },
];

/** Navbar azul de dos filas, igual a la del sitio original. */
export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-azul text-white">
      {/* Fila 1: logo, buscador, cuenta */}
      <div className="mx-auto flex max-w-[1340px] items-center gap-4 px-4 pt-5 pb-3 lg:gap-10 lg:px-6 lg:pt-6">
        <Wordmark size={42} />

        <Form
          action="/"
          scroll={false}
          className="hidden h-12 flex-1 overflow-hidden rounded-[4px] bg-white text-tinta md:flex"
          role="search"
        >
          <label htmlFor="buscar-eventos" className="sr-only">
            Buscar por artista o evento
          </label>
          <input
            id="buscar-eventos"
            name="q"
            type="search"
            placeholder="Buscar por artista, evento..."
            autoComplete="off"
            className="min-w-0 flex-1 px-4 text-[17px] font-semibold placeholder:text-tinta outline-none"
          />
          <button
            type="button"
            className="flex items-center gap-2 border-l border-gris-borde px-5 font-semibold text-azul hover:bg-azul-claro"
          >
            <IconoFiltros className="text-xl" />
            Filtros
          </button>
          <button
            type="submit"
            aria-label="Buscar"
            className="flex w-14 items-center justify-center bg-amarillo text-tinta hover:bg-amarillo-oscuro"
          >
            <IconoBuscar className="text-2xl" />
          </button>
        </Form>

        <div className="ml-auto flex items-center gap-6 md:ml-0">
          <CuentaNavbar />
          <span
            aria-hidden="true"
            className="hidden flex-col items-end leading-none font-extrabold lg:flex"
          >
            <span className="text-[10px] tracking-tight">Tuboleta</span>
            <span className="-mt-0.5 rounded-sm bg-amarillo px-1.5 py-0.5 text-[15px] text-azul">
              pass
            </span>
          </span>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded md:hidden"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((v) => !v)}
          >
            {menuAbierto ? (
              <IconoCerrar className="text-2xl" />
            ) : (
              <IconoMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Buscador en móvil */}
      <div className="px-4 pb-3 md:hidden">
        <Form
          action="/"
          scroll={false}
          className="flex h-11 overflow-hidden rounded-[4px] bg-white text-tinta"
          role="search"
        >
          <label htmlFor="buscar-eventos-movil" className="sr-only">
            Buscar por artista o evento
          </label>
          <input
            id="buscar-eventos-movil"
            name="q"
            type="search"
            placeholder="Buscar por artista, evento..."
            autoComplete="off"
            className="min-w-0 flex-1 px-3 font-semibold placeholder:text-tinta outline-none"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="flex w-12 items-center justify-center bg-amarillo"
          >
            <IconoBuscar className="text-xl" />
          </button>
        </Form>
      </div>

      {/* Fila 2: categorías */}
      <nav
        aria-label="Categorías"
        className={`mx-auto max-w-[1340px] px-4 lg:px-6 ${menuAbierto ? "block" : "hidden"} md:block`}
      >
        <div className="flex flex-col gap-1 pb-4 md:flex-row md:items-center md:justify-between md:gap-0 md:pt-2 md:pb-5">
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-8">
            {categorias.map((c) => (
              <li key={c.nombre}>
                <Link
                  href={c.href}
                  onClick={() => setMenuAbierto(false)}
                  className="block py-1.5 text-[17px] font-semibold hover:underline underline-offset-4"
                >
                  {c.nombre}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="flex items-center gap-1 py-1.5 text-[17px] font-semibold hover:underline underline-offset-4"
              >
                Más <IconoFlechaAbajo className="text-base" />
              </button>
            </li>
          </ul>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-8">
            {enlacesDerecha.map((e) => (
              <li key={e.nombre}>
                <a
                  href={e.href}
                  className="block py-1.5 text-[17px] font-semibold hover:underline underline-offset-4"
                >
                  {e.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconoFlechaDer, IconoFlechaIzq } from "@/components/ui/Iconos";
import { SLUG_EVENTO_VIDEO } from "@/data/events";

type Slide = {
  id: string;
  href: string;
  fondo: string;
  contenido: React.ReactNode;
};

const slides: Slide[] = [
  {
    id: "dias-estelares",
    href: "#",
    fondo:
      "radial-gradient(circle at 35% 120%, rgba(255,120,0,.55) 0%, rgba(0,0,0,0) 45%), radial-gradient(circle at 70% -20%, rgba(0,109,183,.7) 0%, rgba(0,0,0,0) 50%), #0b1022",
    contenido: (
      <>
        <p className="font-display text-2xl leading-none font-black text-amarillo italic md:text-4xl">
          DÍAS
          <br className="hidden md:block" /> ESTELARES
        </p>
        <p className="hidden text-xl font-extrabold text-white md:block lg:text-3xl">
          Del <span className="text-amarillo">15</span> al{" "}
          <span className="text-amarillo">20</span> de{" "}
          <span className="text-amarillo">octubre</span> de 2026
        </p>
        <p className="flex items-center gap-2 text-white">
          <span className="text-lg font-bold text-amarillo md:text-2xl">Hasta</span>
          <span className="font-display text-4xl leading-none font-black text-amarillo md:text-6xl">
            50%
          </span>
          <span className="hidden text-[11px] leading-tight font-semibold uppercase sm:inline md:text-sm">
            Dcto. en eventos
            <br />
            seleccionados*
          </span>
        </p>
      </>
    ),
  },
  {
    id: "preventa",
    href: `/evento/${SLUG_EVENTO_VIDEO}`,
    fondo: "linear-gradient(110deg, #7a1f3d 0%, #b33412 50%, #f2a541 100%)",
    contenido: (
      <>
        <p className="font-display text-lg font-bold tracking-[0.2em] text-amarillo uppercase md:text-xl">
          Ya a la venta
        </p>
        <p className="font-display text-2xl font-black text-white uppercase md:text-5xl">
          Valentina Ríos
        </p>
        <p className="hidden text-right text-lg font-bold text-white md:block lg:text-2xl">
          21 de noviembre · Bogotá
          <span className="block text-base font-semibold text-amarillo">
            Compra tus boletas aquí →
          </span>
        </p>
      </>
    ),
  },
  {
    id: "bono",
    href: "#",
    fondo: "linear-gradient(100deg, #006db7 0%, #00548d 60%, #23253a 100%)",
    contenido: (
      <>
        <p className="font-display text-2xl font-black text-amarillo md:text-5xl">Bono Regalo</p>
        <p className="hidden text-xl font-semibold text-white md:block lg:text-2xl">
          Regala experiencias inolvidables en esta Navidad
        </p>
        <span className="rounded-full bg-amarillo px-4 py-2 text-sm font-bold text-tinta md:text-base">
          Conoce más
        </span>
      </>
    ),
  },
];

/** Carrusel de banners promocionales ficticios dentro del contenedor gris. */
export default function BannerPromo() {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return;
    const id = window.setInterval(() => setActual((i) => (i + 1) % slides.length), 8000);
    return () => window.clearInterval(id);
  }, [pausado]);

  const ir = (i: number) => setActual((i + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Promociones"
      className="bg-gris-claro p-3 md:p-3.5"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div className="relative h-[120px] overflow-hidden md:h-[128px]">
        {slides.map((s, i) => (
          <Link
            key={s.id}
            href={s.href}
            aria-hidden={i !== actual}
            tabIndex={i === actual ? 0 : -1}
            className={`absolute inset-0 flex items-center justify-between gap-4 px-5 transition-opacity duration-700 md:gap-6 md:px-16 ${i === actual ? "opacity-100" : "pointer-events-none opacity-0"}`}
            style={{ background: s.fondo }}
          >
            {s.contenido}
          </Link>
        ))}

        <button
          type="button"
          aria-label="Promoción anterior"
          onClick={() => ir(actual - 1)}
          className="absolute top-1/2 left-2 hidden h-9 w-9 md:flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-tinta shadow hover:bg-white"
        >
          <IconoFlechaIzq className="text-xl" />
        </button>
        <button
          type="button"
          aria-label="Promoción siguiente"
          onClick={() => ir(actual + 1)}
          className="absolute top-1/2 right-2 hidden h-9 w-9 md:flex -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-tinta shadow hover:bg-white"
        >
          <IconoFlechaDer className="text-xl" />
        </button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir a la promoción ${i + 1}`}
              aria-current={i === actual}
              onClick={() => ir(i)}
              className={`h-2.5 rounded-full transition-all ${i === actual ? "w-6 bg-amarillo" : "w-2.5 bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

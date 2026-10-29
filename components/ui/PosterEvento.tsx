import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Evento } from "@/data/events";
import { partesFecha } from "@/lib/formato";

type Props = {
  evento: Evento;
  /** "afiche" llena su contenedor (tarjetas). "banner" es el hero ancho del detalle. */
  variante?: "afiche" | "banner";
  className?: string;
};

/**
 * Afiche del evento. Por defecto se dibuja solo con CSS: gradientes, formas
 * decorativas y tipografía grande. Si el evento trae `poster.imagen`, usa esa
 * foto local (carpeta public/). No usa imágenes externas.
 * Los tamaños de letra usan unidades del contenedor (cqw) para escalar.
 */
export default function PosterEvento({ evento, variante = "afiche", className = "" }: Props) {
  const { poster } = evento;
  const f = partesFecha(evento.fecha);
  const fechaCorta = `${f.dia} ${f.mesCorto.toUpperCase()}`;

  if (poster.imagen) {
    return (
      <PosterConFoto
        evento={evento}
        variante={variante}
        className={className}
        fechaCorta={fechaCorta}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Afiche de ${evento.artista}, ${evento.gira}`}
      className={`relative isolate overflow-hidden [container-type:inline-size] ${className}`}
      style={{ background: poster.fondo, color: poster.texto }}
    >
      <Decoracion estilo={poster.estilo} acento={poster.acento} />

      {variante === "afiche" ? (
        <div className="relative flex h-full flex-col justify-between p-[7cqw]">
          <span
            className="self-start font-display font-bold uppercase tracking-[0.18em]"
            style={{ fontSize: "4.2cqw", color: poster.acento }}
          >
            {evento.gira}
          </span>
          <div>
            <Nombre texto={evento.artista} estilo={poster.estilo} tamano={12.5} />
            <p
              className="mt-[3cqw] font-display font-extrabold uppercase"
              style={{ fontSize: "6.5cqw", color: poster.acento }}
            >
              {fechaCorta}
              <span className="font-semibold opacity-90" style={{ fontSize: "4.6cqw" }}>
                {" "}
                · {evento.ciudad}
              </span>
            </p>
            <p
              className="font-semibold uppercase tracking-wider opacity-80"
              style={{ fontSize: "3.6cqw" }}
            >
              {evento.lugar}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex h-full max-w-[1500px] items-center justify-between gap-[3cqw] px-[5cqw] py-[3cqw]">
          <div className="max-w-[60%]">
            <span
              className="font-display font-bold uppercase tracking-[0.2em]"
              style={{ fontSize: "1.6cqw", color: poster.acento }}
            >
              {evento.gira}
            </span>
            <Nombre texto={evento.artista} estilo={poster.estilo} tamano={7} />
          </div>
          <div className="text-right">
            <p
              className="font-display leading-none font-black uppercase"
              style={{ fontSize: "7cqw", color: poster.acento }}
            >
              {fechaCorta}
            </p>
            <p
              className="mt-[1cqw] font-display leading-none font-extrabold uppercase"
              style={{ fontSize: "3.2cqw" }}
            >
              {evento.lugar}
            </p>
            <p
              className="mt-[0.6cqw] font-display leading-none font-extrabold uppercase"
              style={{ fontSize: "3.2cqw" }}
            >
              {evento.ciudad}, Colombia
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Afiche para eventos con foto del artista.
 * - "afiche": la foto llena el recuadro y un degradado oscuro abajo deja leer el texto.
 * - "banner": fondo de color del evento, texto a la izquierda y la foto enmarcada a la
 *   derecha, a un tamaño moderado para que no se vea borrosa.
 */
function PosterConFoto({
  evento,
  variante,
  className,
  fechaCorta,
}: {
  evento: Evento;
  variante: "afiche" | "banner";
  className: string;
  fechaCorta: string;
}) {
  const { poster } = evento;
  const imagen = poster.imagen!;

  if (variante === "afiche") {
    return (
      <div
        role="img"
        aria-label={`Afiche de ${evento.artista}, ${evento.gira}`}
        className={`relative isolate overflow-hidden [container-type:inline-size] ${className}`}
        style={{ background: poster.fondo, color: poster.texto }}
      >
        <Image
          src={imagen.src}
          alt=""
          fill
          loading="eager"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: imagen.posicion ?? "center" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(18,10,30,0.92) 0%, rgba(18,10,30,0.6) 36%, rgba(18,10,30,0) 62%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-[7cqw]">
          <span
            className="self-start rounded-[1cqw] px-[2.4cqw] py-[1cqw] font-display font-bold uppercase tracking-[0.16em]"
            style={{ fontSize: "4cqw", background: "#e25856", color: "#ffffff" }}
          >
            {evento.gira}
          </span>
          <div>
            <p
              className="font-display font-black uppercase"
              style={{ fontSize: "12.5cqw", lineHeight: 0.95, letterSpacing: "-0.01em" }}
            >
              {evento.artista}
            </p>
            <p
              className="mt-[3cqw] font-display font-extrabold uppercase"
              style={{ fontSize: "6.5cqw", color: poster.acento }}
            >
              {fechaCorta}
              <span className="font-semibold text-white/90" style={{ fontSize: "4.6cqw" }}>
                {" "}
                · {evento.ciudad}
              </span>
            </p>
            <p
              className="font-semibold uppercase tracking-wider text-white/80"
              style={{ fontSize: "3.6cqw" }}
            >
              {evento.lugar}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Afiche de ${evento.artista}, ${evento.gira}`}
      className={`relative isolate overflow-hidden [container-type:inline-size] ${className}`}
      style={{ background: poster.fondo, color: poster.texto }}
    >
      <Decoracion estilo={poster.estilo} acento={poster.acento} />
      <div className="relative mx-auto flex h-full max-w-[1500px] items-center justify-between gap-[4cqw] px-[5cqw] py-[3cqw]">
        <div className="max-w-[58%]">
          <span
            className="inline-block rounded-[0.5cqw] bg-white/95 px-[1.2cqw] py-[0.4cqw] font-display font-bold uppercase tracking-[0.2em]"
            style={{ fontSize: "1.5cqw", color: "#e25856" }}
          >
            {evento.gira}
          </span>
          <p
            className="mt-[1.2cqw] font-display font-black uppercase"
            style={{ fontSize: "5.6cqw", lineHeight: 0.95, textShadow: "0 0.3cqw 0 rgba(0,0,0,0.18)" }}
          >
            {evento.artista}
          </p>
          <p
            className="mt-[1.6cqw] font-display leading-none font-black uppercase"
            style={{ fontSize: "3.4cqw", color: poster.acento }}
          >
            {fechaCorta}
          </p>
          <p
            className="mt-[0.8cqw] font-display leading-tight font-extrabold uppercase"
            style={{ fontSize: "1.7cqw" }}
          >
            {evento.lugar} · {evento.ciudad}, Colombia
          </p>
        </div>
        <div className="relative aspect-[744/510] h-[86%] shrink-0 rotate-[1.5deg] overflow-hidden rounded-[1.2cqw] shadow-[0_1.2cqw_3cqw_rgba(0,0,0,0.35)] ring-[0.5cqw] ring-white">
          <Image
            src={imagen.src}
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 1024px) 40vw, 50vw"
            className="object-cover"
            style={{ objectPosition: imagen.posicion ?? "center" }}
          />
        </div>
      </div>
    </div>
  );
}

function Nombre({
  texto,
  estilo,
  tamano,
}: {
  texto: string;
  estilo: Evento["poster"]["estilo"];
  tamano: number;
}) {
  const largo = texto.length > 18 ? 0.72 : texto.length > 13 ? 0.85 : 1;
  const base: CSSProperties = { fontSize: `${tamano * largo}cqw`, lineHeight: 0.95 };

  if (estilo === "elegante" || estilo === "clasico") {
    return (
      <p className="font-serif italic" style={{ ...base, fontWeight: 600 }}>
        {texto}
      </p>
    );
  }
  return (
    <p
      className="font-display font-black uppercase"
      style={{ ...base, letterSpacing: "-0.02em", textShadow: "0 0.4cqw 0 rgba(0,0,0,0.18)" }}
    >
      {texto}
    </p>
  );
}

/** Formas de fondo según el estilo del afiche. */
function Decoracion({ estilo, acento }: { estilo: Evento["poster"]["estilo"]; acento: string }) {
  const capas: Record<Evento["poster"]["estilo"], ReactNode> = {
    neon: (
      <>
        <div
          className="absolute -top-[20%] -right-[20%] h-[70%] w-[70%] rounded-full opacity-40 blur-2xl"
          style={{ background: acento }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "8cqw 8cqw",
          }}
        />
      </>
    ),
    elegante: (
      <>
        <div
          className="absolute inset-[4cqw] rounded-[2cqw] border-[0.6cqw]"
          style={{ borderColor: acento }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[45%] w-[90%] -translate-x-1/2 rounded-t-full opacity-25 blur-xl"
          style={{ background: acento }}
        />
      </>
    ),
    retro: (
      <div
        className="absolute -right-[30%] -bottom-[30%] h-[120%] w-[120%] opacity-25"
        style={{
          background: `repeating-conic-gradient(from 0deg, ${acento} 0deg 8deg, transparent 8deg 20deg)`,
          borderRadius: "50%",
        }}
      />
    ),
    festival: (
      <>
        <div
          className="absolute top-[8%] right-[6%] h-[30%] w-[30%] rounded-full opacity-80"
          style={{ background: acento }}
        />
        <div className="absolute -bottom-[15%] -left-[10%] h-[50%] w-[50%] rounded-full bg-white/20" />
        <div className="absolute top-[45%] right-[-8%] h-[22%] w-[22%] rounded-full bg-white/25" />
      </>
    ),
    deporte: (
      <>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 6cqw, transparent 6cqw 12cqw)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.8cqw] border-white/40" />
      </>
    ),
    clasico: (
      <>
        <div className="absolute -top-[25%] -right-[25%] h-[80%] w-[80%] rounded-full border-[0.6cqw] border-current opacity-20" />
        <div className="absolute -top-[15%] -right-[15%] h-[60%] w-[60%] rounded-full border-[0.6cqw] border-current opacity-20" />
        <div className="absolute -top-[5%] -right-[5%] h-[40%] w-[40%] rounded-full border-[0.6cqw] border-current opacity-20" />
      </>
    ),
    circo: (
      <>
        <div
          className="absolute top-0 left-1/2 h-[60%] w-[140%] -translate-x-1/2 opacity-35"
          style={{
            background: `repeating-conic-gradient(from 160deg at 50% 0%, ${acento} 0deg 10deg, #ffffff 10deg 20deg)`,
            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
          }}
        />
        <div className="absolute top-[12%] left-[12%] h-[3cqw] w-[3cqw] rounded-full bg-white/80" />
        <div className="absolute top-[22%] right-[18%] h-[2cqw] w-[2cqw] rounded-full bg-white/80" />
      </>
    ),
  };
  return <div aria-hidden="true" className="absolute inset-0 -z-10">{capas[estilo]}</div>;
}

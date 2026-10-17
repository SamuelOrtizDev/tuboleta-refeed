import Link from "next/link";

type Props = {
  /** Alto de la letra en px. */
  size?: number;
  className?: string;
  href?: string | null;
  /** "claro" (blanco, sobre fondos oscuros) o "azul" (sobre fondos claros). */
  tono?: "claro" | "azul";
};

/**
 * Wordmark "Tuboleta" construido con texto. La "o" es un círculo amarillo
 * con una estrella, como en la marca original, dibujado a mano en SVG.
 */
export default function Wordmark({
  size = 40,
  className = "",
  href = "/",
  tono = "claro",
}: Props) {
  const contenido = (
    <span
      className={`inline-flex items-baseline font-extrabold leading-none tracking-[-0.04em] select-none ${tono === "azul" ? "text-azul" : "text-white"} ${className}`}
      style={{ fontSize: size }}
    >
      Tub
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-[0.02em] self-center"
        style={{ width: size * 0.6, height: size * 0.6, marginTop: size * 0.12 }}
      >
        <circle cx="12" cy="12" r="11" fill="#ffc400" />
        <path
          d="M12 5.2l1.9 4.1 4.5.5-3.4 3 1 4.4L12 15l-4 2.2 1-4.4-3.4-3 4.5-.5z"
          fill="#ffffff"
        />
      </svg>
      leta
      <span className="sr-only"> (inicio)</span>
    </span>
  );

  if (href === null) return contenido;
  return (
    <Link href={href} aria-label="Tuboleta, ir al inicio" className="inline-flex">
      {contenido}
    </Link>
  );
}

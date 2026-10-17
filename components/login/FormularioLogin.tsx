"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCompra } from "@/context/CompraContext";
import Wordmark from "@/components/layout/Wordmark";
import { IconoAlerta, IconoBoleta } from "@/components/ui/Iconos";

type Props = {
  /** Ruta a la que se vuelve después de iniciar sesión (ya validada). */
  siguiente: string | null;
  /** Nombre del evento si el usuario venía a comprar. */
  eventoPendiente: string | null;
};

/**
 * Formulario simulado: acepta cualquier correo y contraseña. Solo guarda el
 * correo y un nombre para mostrar. La contraseña nunca se lee ni se guarda.
 */
export default function FormularioLogin({ siguiente, eventoPendiente }: Props) {
  const { iniciarSesion, usuario, listo } = useCompra();
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [errores, setErrores] = useState<{ correo?: string; clave?: string }>({});
  const clave = useRef<HTMLInputElement>(null);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const faltan = {
      correo: correo.trim() ? undefined : "Escribe tu correo electrónico.",
      clave: clave.current?.value ? undefined : "Escribe tu contraseña.",
    };
    setErrores(faltan);
    if (faltan.correo || faltan.clave) return;

    iniciarSesion(correo);
    if (clave.current) clave.current.value = "";
    router.push(siguiente ?? "/");
  }

  return (
    <div className="w-full max-w-[480px] rounded-lg bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:p-10">
      <Wordmark size={34} tono="azul" />
      <h1 className="mt-8 text-3xl font-extrabold text-tinta">Iniciar sesión</h1>
      <p className="mt-2 text-lg text-gris-texto">Ingresa a tu cuenta Tuboleta.</p>

      {eventoPendiente && (
        <div className="mt-6 flex gap-3 rounded-md border border-azul/30 bg-azul-claro p-4 text-[17px] text-tinta">
          <IconoBoleta className="mt-0.5 shrink-0 text-2xl text-azul" />
          <p>
            Para comprar tus boletas de <strong>{eventoPendiente}</strong>, primero inicia
            sesión.
          </p>
        </div>
      )}

      {listo && usuario && !eventoPendiente && (
        <p className="mt-6 rounded-md bg-gris-claro p-4 text-[15px]">
          Ya iniciaste sesión como <strong>{usuario.correo}</strong>. Puedes entrar con otra
          cuenta si quieres.
        </p>
      )}

      <form onSubmit={enviar} noValidate className="mt-8 flex flex-col gap-6">
        <div>
          <label htmlFor="correo" className="mb-2 block text-lg font-semibold">
            Correo electrónico
          </label>
          <input
            id="correo"
            type="text"
            inputMode="email"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={!!errores.correo}
            aria-describedby={errores.correo ? "error-correo" : undefined}
            className={`h-14 w-full rounded-md border-2 px-4 text-lg outline-none focus:border-azul ${errores.correo ? "border-ladrillo" : "border-gris-borde"}`}
          />
          {errores.correo && <Error id="error-correo" texto={errores.correo} />}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="clave" className="block text-lg font-semibold">
              Contraseña
            </label>
            <button
              type="button"
              onClick={() => setMostrarClave((v) => !v)}
              className="text-[15px] font-semibold text-azul underline underline-offset-2"
            >
              {mostrarClave ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {/*
            Es type="text" con máscara CSS a propósito: así el navegador no ofrece
            guardar la contraseña durante la grabación. El valor no se guarda.
          */}
          <input
            id="clave"
            ref={clave}
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Tu contraseña"
            aria-invalid={!!errores.clave}
            aria-describedby={errores.clave ? "error-clave" : undefined}
            className={`h-14 w-full rounded-md border-2 px-4 text-lg outline-none focus:border-azul ${mostrarClave ? "" : "[-webkit-text-security:disc]"} ${errores.clave ? "border-ladrillo" : "border-gris-borde"}`}
          />
          {errores.clave && <Error id="error-clave" texto={errores.clave} />}
        </div>

        <div className="flex items-center justify-between gap-4 text-[15px]">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-azul" />
            Recordarme
          </label>
          <a href="#" className="font-semibold text-azul underline underline-offset-2">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button
          type="submit"
          className="h-14 w-full rounded-md bg-azul text-lg font-bold text-white transition-colors hover:bg-azul-oscuro"
        >
          Iniciar sesión
        </button>
      </form>

      <p className="mt-6 text-center text-[17px]">
        ¿No tienes cuenta?{" "}
        <a href="#" className="font-bold text-azul underline underline-offset-2">
          Regístrate
        </a>
      </p>

      <p className="mt-4 text-center">
        <Link
          href={siguiente?.startsWith("/evento/") ? siguiente.replace(/\/compra.*$/, "") : "/"}
          className="inline-flex min-h-12 items-center text-[17px] font-semibold text-gris-texto underline underline-offset-2"
        >
          {siguiente?.startsWith("/evento/") ? "Volver al evento" : "Volver al inicio"}
        </Link>
      </p>
    </div>
  );
}

function Error({ id, texto }: { id: string; texto: string }) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-2 font-semibold text-ladrillo">
      <IconoAlerta className="shrink-0 text-lg" />
      {texto}
    </p>
  );
}

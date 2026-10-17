import { IconoCandado } from "@/components/ui/Iconos";

/** Pantalla de espera mientras se "procesa" el pago simulado. */
export default function LoaderPago({ total }: { total: string }) {
  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/95 px-6 backdrop-blur-sm"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="h-20 w-20 animate-spin rounded-full border-8 border-azul/20 border-t-azul"
        />
        <p className="mt-8 text-[28px] font-extrabold">Procesando tu pago…</p>
        <p className="mt-2 text-xl text-gris-texto">Estamos confirmando el pago de {total}.</p>
        <p className="mt-6 flex items-center gap-2 text-lg font-semibold text-tinta">
          <IconoCandado className="text-xl" /> Por favor no cierres esta ventana.
        </p>
      </div>
    </div>
  );
}

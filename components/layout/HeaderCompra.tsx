import Wordmark from "./Wordmark";
import CuentaNavbar from "./CuentaNavbar";
import { IconoCandado } from "@/components/ui/Iconos";

/** Header simple del proceso de compra: sin buscador ni enlaces que distraigan. */
export default function HeaderCompra() {
  return (
    <header className="bg-azul text-white print:hidden">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-5">
          <Wordmark size={32} />
          <span className="hidden items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[15px] font-semibold sm:flex">
            <IconoCandado className="text-lg" /> Compra segura
          </span>
        </div>
        <CuentaNavbar variante="compra" />
      </div>
    </header>
  );
}

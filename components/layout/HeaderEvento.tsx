import Wordmark from "./Wordmark";
import CuentaNavbar from "./CuentaNavbar";

/** Header azul marino del detalle de evento, como en web.tuboleta.com. */
export default function HeaderEvento() {
  return (
    <header className="bg-marino">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-4">
        <Wordmark size={26} />
        <CuentaNavbar variante="marino" />
      </div>
    </header>
  );
}

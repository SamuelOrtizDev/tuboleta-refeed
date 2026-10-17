/** Franja fija y delgada que aclara que el sitio es un prototipo. Siempre visible. */
export default function AvisoPrototipo() {
  return (
    <div
      role="note"
      className="fixed inset-x-0 bottom-0 z-50 flex h-8 items-center justify-center bg-tinta/90 px-4 text-center text-xs font-medium text-white backdrop-blur-sm"
    >
      Prototipo académico – no es el sitio oficial de TuBoleta
    </div>
  );
}

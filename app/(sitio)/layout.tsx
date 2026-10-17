import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/** Páginas del sitio principal: navbar azul arriba y footer abajo. */
export default function SitioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

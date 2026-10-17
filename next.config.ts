import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactivados a propósito: con cacheComponents Next mantiene páginas ocultas
  // vivas al navegar (Activity), lo que puede mostrar estados viejos al usar
  // "Atrás" durante la grabación del video. Este prototipo no necesita caché.
  cacheComponents: false,
  // Oculta el botón flotante de Next en desarrollo para que no salga en el video.
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

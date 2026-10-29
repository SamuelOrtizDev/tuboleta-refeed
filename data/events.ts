/**
 * Eventos del prototipo. Casi todos los artistas, giras y escenarios son
 * inventados y solo las ciudades son reales. La excepción es el evento de
 * Juan Gabriel, pedido a partir de una imagen de referencia.
 * Precios en pesos colombianos (enteros).
 */

export type Categoria = "conciertos" | "teatro" | "deportes" | "familiares";

export type EstiloPoster =
  | "neon"
  | "elegante"
  | "retro"
  | "festival"
  | "deporte"
  | "clasico"
  | "circo";

export type Poster = {
  /** Fondo CSS (gradientes). */
  fondo: string;
  /** Color del texto principal. */
  texto: string;
  /** Color de acento (fecha, detalles). */
  acento: string;
  estilo: EstiloPoster;
  /** Foto opcional del artista (ruta dentro de public/). Si existe, el afiche la usa. */
  imagen?: {
    src: string;
    /** object-position CSS para encuadrar la cara, por ejemplo "40% 25%". */
    posicion?: string;
  };
};

export type Localidad = {
  id: string;
  nombre: string;
  /** Color de la localidad en el mapa y la tabla. */
  color: string;
  /** Precio base por boleta. */
  precio: number;
  /** Cargo por servicio por boleta. */
  servicio: number;
  /** Capacidad total que se muestra en la tabla del detalle. */
  aforo: number;
  /** Secciones del recinto, como en la tabla original ("101–109"). */
  secciones?: string[];
  /** Cuadrícula del mapa de asientos de la compra. */
  filas: number;
  asientosPorFila: number;
  agotada?: boolean;
};

export type Evento = {
  slug: string;
  artista: string;
  gira: string;
  categoria: Categoria;
  ciudad: string;
  lugar: string;
  direccion: string;
  /** "AAAA-MM-DD" */
  fecha: string;
  /** "HH:MM" en 24 horas */
  hora: string;
  apertura: string;
  edadMinima: string;
  descripcion: string[];
  poster: Poster;
  /** Aparece en el mosaico "Destacados". "grande" ocupa la tarjeta principal. */
  destacado?: "grande" | "normal";
  localidades: Localidad[];
};

export const NOMBRES_CATEGORIA: Record<Categoria, string> = {
  conciertos: "Conciertos",
  teatro: "Teatro",
  deportes: "Deportes",
  familiares: "Familiares",
};

/** Paleta de localidades tomada del detalle de evento original. */
const C = {
  ladrillo: "#b33412",
  teal: "#089e98",
  marino: "#23253a",
  purpura: "#4b5080",
  naranja: "#c8892a",
  amarillo: "#e4c95f",
  cafe: "#7a2e14",
  grisVerde: "#6f8a87",
};

export const eventos: Evento[] = [
  {
    slug: "valentina-rios-gira-raices",
    artista: "Valentina Ríos",
    gira: "Gira Raíces 2026",
    categoria: "conciertos",
    ciudad: "Bogotá",
    lugar: "Arena El Dorado",
    direccion: "Avenida Calle 26 # 68-50, Bogotá",
    fecha: "2026-11-21",
    hora: "20:00",
    apertura: "18:00",
    edadMinima: "Todas las edades",
    descripcion: [
      "Valentina Ríos regresa a Bogotá con la Gira Raíces 2026, un recorrido por las canciones que la convirtieron en una de las voces más queridas del país.",
      "Una noche de baladas, boleros y música colombiana con banda en vivo, cuerdas y una puesta en escena pensada para cantar de principio a fin.",
    ],
    poster: {
      fondo:
        "radial-gradient(circle at 75% 30%, #f6b26b 0%, rgba(246,178,107,0) 45%), linear-gradient(135deg, #7a1f3d 0%, #b33412 55%, #f2a541 100%)",
      texto: "#fff8ec",
      acento: "#ffd27a",
      estilo: "retro",
    },
    destacado: "normal",
    localidades: [
      {
        id: "platea-vip",
        nombre: "Platea VIP",
        color: C.ladrillo,
        precio: 380000,
        servicio: 68400,
        aforo: 420,
        secciones: ["101–103"],
        filas: 5,
        asientosPorFila: 10,
      },
      {
        id: "preferencial",
        nombre: "Preferencial",
        color: C.teal,
        precio: 250000,
        servicio: 45000,
        aforo: 1350,
        secciones: ["201–203", "204–206"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "general",
        nombre: "General",
        color: C.purpura,
        precio: 180000,
        servicio: 32400,
        aforo: 2800,
        secciones: ["301–306"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "balcon",
        nombre: "Balcón",
        color: C.naranja,
        precio: 120000,
        servicio: 21600,
        aforo: 1600,
        secciones: ["401–410"],
        filas: 6,
        asientosPorFila: 10,
      },
    ],
  },
  {
    // Evento pedido a partir de referencias/juan gabriel.jpeg. Usa la foto del
    // afiche (recortada, sin los textos ni logos originales) en public/eventos/.
    slug: "juan-gabriel-en-concierto",
    artista: "Juan Gabriel",
    gira: "En concierto",
    categoria: "conciertos",
    ciudad: "Cali",
    lugar: "Centro Cultural de Cali",
    direccion: "Carrera 5 # 6-05, Cali",
    fecha: "2026-12-12",
    hora: "20:00",
    apertura: "18:30",
    edadMinima: "Todas las edades",
    descripcion: [
      "Revive la magia del Divo de Juárez en una noche dedicada a Juan Gabriel: su concierto proyectado en pantalla gigante, con sonido envolvente y mariachi en vivo acompañando cada canción.",
      "«Querida», «Amor eterno», «Hasta que te conocí», «Te lo pido por favor» y «El Noa Noa», entre muchos otros éxitos, para cantar de principio a fin.",
    ],
    poster: {
      fondo: "linear-gradient(135deg, #e25856 0%, #e25856 46%, #6dbce3 46%, #6dbce3 100%)",
      texto: "#ffffff",
      acento: "#f6e27a",
      estilo: "retro",
      imagen: { src: "/eventos/juan-gabriel.jpg", posicion: "40% 25%" },
    },
    destacado: "normal",
    localidades: [
      {
        id: "platea-preferencial",
        nombre: "Platea preferencial",
        color: C.ladrillo,
        precio: 220000,
        servicio: 39600,
        aforo: 320,
        secciones: ["Filas A–F"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "platea-general",
        nombre: "Platea general",
        color: C.teal,
        precio: 150000,
        servicio: 27000,
        aforo: 540,
        secciones: ["Filas G–P"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "balcon",
        nombre: "Balcón",
        color: C.purpura,
        precio: 90000,
        servicio: 16200,
        aforo: 280,
        filas: 5,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "los-del-puerto-salsa-sinfonica",
    artista: "Los del Puerto",
    gira: "Salsa Sinfónica",
    categoria: "conciertos",
    ciudad: "Cali",
    lugar: "Coliseo del Pacífico",
    direccion: "Calle 5 # 38-20, Cali",
    fecha: "2026-12-05",
    hora: "20:30",
    apertura: "18:30",
    edadMinima: "12 años",
    descripcion: [
      "La orquesta más emblemática del Pacífico se une a una filarmónica de 60 músicos para reinterpretar sus clásicos de salsa.",
      "Un encuentro entre la salsa brava y la música sinfónica que promete una noche histórica en Cali.",
    ],
    poster: {
      fondo:
        "radial-gradient(ellipse at 50% 110%, rgba(214,175,85,0.45) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0d0d10 0%, #1d1b16 100%)",
      texto: "#f3e6c4",
      acento: "#d6af55",
      estilo: "elegante",
    },
    destacado: "grande",
    localidades: [
      {
        id: "palco",
        nombre: "Palco Oro",
        color: C.amarillo,
        precio: 420000,
        servicio: 75600,
        aforo: 200,
        filas: 4,
        asientosPorFila: 8,
        agotada: true,
      },
      {
        id: "platea",
        nombre: "Platea",
        color: C.marino,
        precio: 290000,
        servicio: 52200,
        aforo: 1800,
        secciones: ["101–109"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "tribuna",
        nombre: "Tribuna",
        color: C.teal,
        precio: 160000,
        servicio: 28800,
        aforo: 3200,
        secciones: ["201–212"],
        filas: 6,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "mateo-lumen-tour-eterno",
    artista: "Mateo Lumen",
    gira: "Tour Eterno 2026",
    categoria: "conciertos",
    ciudad: "Bogotá",
    lugar: "Arena El Dorado",
    direccion: "Avenida Calle 26 # 68-50, Bogotá",
    fecha: "2026-11-28",
    hora: "21:00",
    apertura: "19:00",
    edadMinima: "14 años",
    descripcion: [
      "El cantautor Mateo Lumen presenta Tour Eterno, su gira más ambiciosa, con un repertorio de éxitos y canciones de su nuevo álbum.",
      "Producción de luces, pantallas gigantes y una banda de diez músicos en escena.",
    ],
    poster: {
      fondo: "linear-gradient(160deg, #e9e4dc 0%, #c9c1b4 60%, #8f877b 100%)",
      texto: "#2a2723",
      acento: "#5b544a",
      estilo: "clasico",
    },
    destacado: "normal",
    localidades: [
      {
        id: "tribuna-fan",
        nombre: "Tribuna Fan",
        color: C.ladrillo,
        precio: 580000,
        servicio: 117400,
        aforo: 115,
        filas: 4,
        asientosPorFila: 10,
      },
      {
        id: "platea",
        nombre: "Platea",
        color: C.marino,
        precio: 395000,
        servicio: 80000,
        aforo: 2190,
        secciones: ["101–109"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "piso-3",
        nombre: "Piso 3",
        color: C.naranja,
        precio: 250000,
        servicio: 50600,
        aforo: 1116,
        secciones: ["302/303", "313/314"],
        filas: 6,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "banda-del-trueno-medellin",
    artista: "Banda del Trueno",
    gira: "Pop Rock Tour",
    categoria: "conciertos",
    ciudad: "Medellín",
    lugar: "Arena Norte",
    direccion: "Carrera 70 # 48-30, Medellín",
    fecha: "2027-02-12",
    hora: "20:00",
    apertura: "18:00",
    edadMinima: "13 años",
    descripcion: [
      "La Banda del Trueno llega a Medellín con su Pop Rock Tour: guitarras, coros multitudinarios y los himnos que marcaron a una generación.",
    ],
    poster: {
      fondo:
        "linear-gradient(200deg, #1aa39a 0%, #1aa39a 24%, #e5c35a 24%, #e5c35a 100%)",
      texto: "#b12a14",
      acento: "#23253a",
      estilo: "clasico",
    },
    destacado: "normal",
    localidades: [
      {
        id: "platea",
        nombre: "Platea",
        color: C.marino,
        precio: 395000,
        servicio: 80000,
        aforo: 2190,
        secciones: ["101–109"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "piso-3",
        nombre: "Piso 3",
        color: C.amarillo,
        precio: 280000,
        servicio: 56700,
        aforo: 2028,
        secciones: ["304–306", "310–312"],
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "vista-parcial",
        nombre: "Piso 3 · vista parcial",
        color: C.grisVerde,
        precio: 180000,
        servicio: 36500,
        aforo: 378,
        secciones: ["301", "315"],
        filas: 5,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "kalima-crew-el-remate",
    artista: "Kalima Crew",
    gira: "El Remate 2026",
    categoria: "conciertos",
    ciudad: "Bogotá",
    lugar: "Arena El Dorado",
    direccion: "Avenida Calle 26 # 68-50, Bogotá",
    fecha: "2026-12-18",
    hora: "19:00",
    apertura: "17:00",
    edadMinima: "16 años",
    descripcion: [
      "Kalima Crew cierra el año con El Remate, la fiesta de hip hop más grande de la capital, con invitados sorpresa.",
    ],
    poster: {
      fondo: "linear-gradient(150deg, #e2382f 0%, #c21f3a 50%, #1f4fbf 100%)",
      texto: "#ffffff",
      acento: "#ffd400",
      estilo: "neon",
    },
    destacado: "normal",
    localidades: [
      {
        id: "general",
        nombre: "General de pie",
        color: C.ladrillo,
        precio: 150000,
        servicio: 27000,
        aforo: 6000,
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "platea",
        nombre: "Platea numerada",
        color: C.purpura,
        precio: 230000,
        servicio: 41400,
        aforo: 2100,
        secciones: ["110–117"],
        filas: 6,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "festival-sabores-cielo-abierto",
    artista: "Festival Sabores",
    gira: "A Cielo Abierto",
    categoria: "familiares",
    ciudad: "Bogotá",
    lugar: "Parque Museo del Norte",
    direccion: "Calle 93 # 11-20, Bogotá",
    fecha: "2026-11-07",
    hora: "11:00",
    apertura: "10:30",
    edadMinima: "Todas las edades",
    descripcion: [
      "Más de 40 restaurantes, música en vivo y zona de juegos para niños en un festival gastronómico al aire libre.",
    ],
    poster: {
      fondo: "linear-gradient(160deg, #6a4be0 0%, #9b6cf0 45%, #f39ac8 100%)",
      texto: "#ffffff",
      acento: "#ffe066",
      estilo: "festival",
    },
    destacado: "normal",
    localidades: [
      {
        id: "entrada",
        nombre: "Entrada general",
        color: C.purpura,
        precio: 45000,
        servicio: 8100,
        aforo: 5000,
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "experiencia",
        nombre: "Experiencia gourmet",
        color: C.naranja,
        precio: 120000,
        servicio: 21600,
        aforo: 400,
        filas: 4,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "festival-musica-del-caribe",
    artista: "Festival de Música del Caribe",
    gira: "Edición 2027",
    categoria: "conciertos",
    ciudad: "Cartagena",
    lugar: "Teatro de la Muralla",
    direccion: "Plaza de la Merced, Centro Histórico, Cartagena",
    fecha: "2027-01-09",
    hora: "19:30",
    apertura: "18:30",
    edadMinima: "Todas las edades",
    descripcion: [
      "Nueve días de música clásica y del Caribe en los escenarios más bellos de la ciudad amurallada.",
    ],
    poster: {
      fondo: "linear-gradient(180deg, #f7efc9 0%, #f7efc9 55%, #f6c9c0 55%, #f6c9c0 100%)",
      texto: "#1f2a44",
      acento: "#1f2a44",
      estilo: "clasico",
    },
    destacado: "normal",
    localidades: [
      {
        id: "platea",
        nombre: "Platea",
        color: C.marino,
        precio: 210000,
        servicio: 37800,
        aforo: 600,
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "balcon",
        nombre: "Balcón",
        color: C.teal,
        precio: 130000,
        servicio: 23400,
        aforo: 400,
        filas: 5,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "la-casa-de-los-espejos",
    artista: "La casa de los espejos",
    gira: "Obra de teatro",
    categoria: "teatro",
    ciudad: "Bogotá",
    lugar: "Teatro Libertad",
    direccion: "Carrera 7 # 22-47, Bogotá",
    fecha: "2026-11-14",
    hora: "19:30",
    apertura: "19:00",
    edadMinima: "12 años",
    descripcion: [
      "Una comedia de enredos sobre una familia que hereda una casa llena de secretos. Dos horas de risas con un elenco de primer nivel.",
    ],
    poster: {
      fondo:
        "radial-gradient(circle at 30% 30%, #ffde59 0%, rgba(255,222,89,0) 40%), linear-gradient(140deg, #ff7a00 0%, #ff3d77 60%, #00b3a4 100%)",
      texto: "#ffffff",
      acento: "#ffde59",
      estilo: "neon",
    },
    destacado: "normal",
    localidades: [
      {
        id: "platea",
        nombre: "Platea",
        color: C.ladrillo,
        precio: 95000,
        servicio: 17100,
        aforo: 450,
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "balcon",
        nombre: "Balcón",
        color: C.purpura,
        precio: 65000,
        servicio: 11700,
        aforo: 250,
        filas: 5,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "clasico-capitalino",
    artista: "Clásico Capitalino",
    gira: "Liga 2026-II · Fecha 18",
    categoria: "deportes",
    ciudad: "Bogotá",
    lugar: "Estadio La Sabana",
    direccion: "Carrera 30 # 57-60, Bogotá",
    fecha: "2026-11-22",
    hora: "18:00",
    apertura: "15:30",
    edadMinima: "Todas las edades",
    descripcion: [
      "El partido más esperado del semestre. Vive el clásico de la capital desde la tribuna.",
    ],
    poster: {
      fondo: "linear-gradient(135deg, #0b6e3a 0%, #13914f 50%, #0b6e3a 100%)",
      texto: "#ffffff",
      acento: "#ffc400",
      estilo: "deporte",
    },
    localidades: [
      {
        id: "occidental",
        nombre: "Tribuna Occidental",
        color: C.ladrillo,
        precio: 140000,
        servicio: 25200,
        aforo: 9000,
        filas: 6,
        asientosPorFila: 10,
      },
      {
        id: "oriental",
        nombre: "Tribuna Oriental",
        color: C.teal,
        precio: 90000,
        servicio: 16200,
        aforo: 12000,
        filas: 6,
        asientosPorFila: 10,
      },
    ],
  },
  {
    slug: "circo-estelar-suenos-de-papel",
    artista: "Circo Estelar",
    gira: "Sueños de Papel",
    categoria: "familiares",
    ciudad: "Medellín",
    lugar: "Gran Carpa Parque Norte",
    direccion: "Carrera 53 # 76-115, Medellín",
    fecha: "2026-12-19",
    hora: "16:00",
    apertura: "15:00",
    edadMinima: "Todas las edades",
    descripcion: [
      "Acróbatas, payasos y malabaristas en un espectáculo para toda la familia, inspirado en los sueños de una niña que dibuja su propio circo.",
    ],
    poster: {
      fondo: "linear-gradient(180deg, #1b2a6b 0%, #2c3e9e 100%)",
      texto: "#ffffff",
      acento: "#ff5a5f",
      estilo: "circo",
    },
    localidades: [
      {
        id: "preferencial",
        nombre: "Preferencial",
        color: C.ladrillo,
        precio: 110000,
        servicio: 19800,
        aforo: 600,
        filas: 5,
        asientosPorFila: 10,
      },
      {
        id: "general",
        nombre: "General",
        color: C.amarillo,
        precio: 70000,
        servicio: 12600,
        aforo: 1400,
        filas: 6,
        asientosPorFila: 10,
      },
    ],
  },
];

/** Evento que se usa en el video tutorial. */
export const SLUG_EVENTO_VIDEO = "valentina-rios-gira-raices";

export function buscarEvento(slug: string): Evento | undefined {
  return eventos.find((e) => e.slug === slug);
}

export function buscarLocalidad(evento: Evento, id: string | null | undefined) {
  return evento.localidades.find((l) => l.id === id);
}

/** Precio total por boleta (precio + servicio). */
export const precioTotal = (l: Localidad) => l.precio + l.servicio;

/** Precio "desde" del evento: la localidad disponible más barata. */
export function precioDesde(evento: Evento): number {
  const disponibles = evento.localidades.filter((l) => !l.agotada);
  return Math.min(...(disponibles.length ? disponibles : evento.localidades).map(precioTotal));
}

/** Título como aparece en las tarjetas: "VALENTINA RÍOS | GIRA RAÍCES 2026". */
export const tituloTarjeta = (e: Evento) => `${e.artista} | ${e.gira}`;

/** Título como aparece en el detalle: "Valentina Ríos · Gira Raíces 2026". */
export const tituloDetalle = (e: Evento) => `${e.artista} · ${e.gira}`;

export const eventosPorFecha = () =>
  [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha));

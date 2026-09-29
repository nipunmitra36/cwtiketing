export interface Client {
  name: string;
  src: string;
  country?: string;
}

/** Every client logo shown in the "Our clients" section across the site. */
export const clients: Client[] = [
  { name: "AfriKonekta", country: "Finland", src: "/media/client/afrikonekta.webp" },
  { name: "Asante Rabi Express", country: "Tanzania", src: "/media/client/asante-rabi-express.webp" },
  { name: "BrandMyth", country: "Bangladesh", src: "/media/client/brandmyth.webp" },
  { name: "BusBora", country: "Tanzania", src: "/media/client/busbora.webp" },
  { name: "Canvey", country: "United Kingdom", src: "/media/client/canvey.webp" },
  { name: "Capital Express", country: "UAE", src: "/media/client/capital-express.webp" },
  { name: "Carmel Group", country: "Qatar", src: "/media/client/carmel-group.webp" },
  { name: "Ekesons", country: "Nigeria", src: "/media/client/ekesons.webp" },
  { name: "Etiflex", country: "Mexico", src: "/media/client/etiflex.webp" },
  { name: "Fetan Bus", country: "Ethiopia", src: "/media/client/fetanbus.webp" },
  { name: "Gatwick Hoppa", country: "United Kingdom", src: "/media/client/gatwick-hoppa.webp" },
  { name: "Hoba Yakpaiha", src: "/media/client/hoba-yakpaiha.webp" },
  { name: "James Bus Line", country: "Belize", src: "/media/client/james.webp" },
  { name: "Purabi", src: "/media/client/logo_purabi.webp" },
  { name: "Lonex", country: "Bangladesh", src: "/media/client/lonex.webp" },
  { name: "Motso", country: "Botswana", src: "/media/client/motso.webp" },
  { name: "Musango", country: "Cameroon", src: "/media/client/musango.webp" },
  { name: "My Express", country: "Estonia", src: "/media/client/my-express.webp" },
  { name: "Rabeya", country: "Bangladesh", src: "/media/client/rabeya.webp" },
  { name: "Rakaab", country: "Somaliland", src: "/media/client/rakaab.webp" },
  { name: "Rojos De Colima", country: "Mexico", src: "/media/client/rojos-logo.webp" },
  { name: "Six Base", country: "Bangladesh", src: "/media/client/six-base.webp" },
  { name: "TopBus", country: "United Kingdom", src: "/media/client/topbus.webp" },
  { name: "Yatru", src: "/media/client/yatru.webp" },
  { name: "Zedicket", country: "Zambia", src: "/media/client/zedicket.webp" },
];

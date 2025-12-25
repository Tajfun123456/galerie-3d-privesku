// soubor: data/pendants.ts

// 1. Definice tvaru dat (Interface)
export interface Pendant {
  id: string;
  slug: string; 
  name: string;
  // price: string; // ODSTRANĚNO
  description: string; 
  fullDescription: string; 
  material: string;
  dimensions: string;
  images: string[]; 
  videoUrl?: string; 
}

// 2. Fiktivní databáze přívěsků
export const pendants: Pendant[] = [
  {
    id: "01",
    slug: "cyber-skull-v1",
    name: "Cyber Skull V1",
    description: "Futuristická lebka s kybernetickými implantáty. Detailní 3D tisk.",
    fullDescription: "Tento přívěsek vznikl jako experiment s organickými a mechanickými tvary. Představuje spojení člověka a stroje. Model byl sochařen digitálně více než 10 hodin a je vytištěn z vysoce odolného resinu, který imituje vzhled kovu.",
    material: "Resin (Iron Grey)",
    dimensions: "35mm x 20mm x 25mm",
    images: [
      "/images/pendants/skull-main.jpg", 
      "/images/pendants/skull-side.jpg",
      "/images/pendants/skull-back.jpg"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Příklad ID
  },
  {
    id: "02",
    slug: "voronoi-heart",
    name: "Voronoi Heart",
    description: "Organické srdce s Voronoi strukturou. Lehké a elegantní.",
    fullDescription: "Matematická krása Voronoi diagramu aplikovaná na tvar srdce. Díky děrované struktuře je přívěsek extrémně lehký a hází zajímavé stíny. Ideální dárek pro milovníky moderního designu a geometrie.",
    material: "PLA (Silk Red)",
    dimensions: "40mm x 40mm x 15mm",
    images: [
      "/images/pendants/heart-main.jpg",
      "/images/pendants/heart-detail.jpg"
    ]
  },
  {
    id: "03",
    slug: "dragon-scale-amulet",
    name: "Amulet Dračí Šupina",
    description: "Texturovaný amulet inspirovaný fantasy světy. Ručně barveno.",
    fullDescription: "Každý kus je originál. Základní model je vytištěn a následně ručně patinován, aby vynikla hloubka textury dračích šupin. Tento amulet je navržen tak, aby působil jako starodávný artefakt nalezený v dračí sluji.",
    material: "Resin + Akrylové barvy",
    dimensions: "50mm x 30mm x 5mm",
    images: [
      "/images/pendants/dragon-main.jpg"
    ]
  },
   {
    id: "04",
    slug: "geometric-fox",
    name: "Low-Poly Liška",
    description: "Minimalistická liška v low-poly stylu. Ostré hrany a čistý design.",
    fullDescription: "Klasický low-poly design, který nikdy neomrzí. Liška symbolizuje chytrost a hravost. Díky ostrým hranám skvěle odráží světlo, zejména ve zlaté nebo stříbrné variantě filamentu.",
    material: "PLA (Gold)",
    dimensions: "30mm x 25mm x 20mm",
    images: [
      "/images/pendants/fox-main.jpg"
    ]
  }
];

// 3. Pomocné funkce
export const getAllPendants = () => {
  return pendants;
};

export const getPendantBySlug = (slug: string) => {
  return pendants.find((p) => p.slug === slug);
};
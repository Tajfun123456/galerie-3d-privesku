import Link from 'next/link';
import Image from 'next/image';
import { getAllPendants } from '@/data/pendants';

export default function Home() {
  const pendants = getAllPendants();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      
      {/* 1. Hero Sekce */}
      <section className="py-20 text-center px-4 bg-white border-b border-gray-100">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6 pb-2">
          Galerie tvých 3D přívěsků
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unikátní designy, moderní materiály a precizní 3D tisk. 
          Prohlédněte si mou osobní kolekci.
        </p>
      </section>

      {/* 2. Mřížka Galerie */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendants.map((pendant) => (
            <Link key={pendant.id} href={`/pendant/${pendant.slug}`} className="group block h-full">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
                
                {/* Obrázek */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                    Načítám...
                  </div>
                  <Image
                    src={pendant.images[0]}
                    alt={pendant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Textový obsah karty */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {pendant.name}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3">
                    {pendant.description}
                  </p>
                  
                  {/* OPRAVA: Místo ceny zobrazíme jen odkaz */}
                  <div className="mt-auto pt-4 flex justify-end">
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      Zobrazit detail →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Patička */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-white mt-auto">
        <p className="mb-2">© 2025 Galerie 3D Přívěsků</p>
        <div className="space-x-4">
          <Link href="/about" className="hover:text-blue-600 transition-colors underline">
            O autorovi
          </Link>
          <span>•</span>
          <a href="mailto:info@example.com" className="hover:text-blue-600 transition-colors">
            Kontakt
          </a>
        </div>
      </footer>

    </main>
  );
}
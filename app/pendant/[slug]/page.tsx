import { getPendantBySlug } from '@/data/pendants';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Next.js 15+ syntaxe pro parametry (Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PendantDetail({ params }: Props) {
  const { slug } = await params;
  const pendant = getPendantBySlug(slug);

  if (!pendant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigace */}
        <nav className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors">
            ← Zpět do galerie
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEVÝ SLOUPEC: Galerie */}
          <div className="space-y-4">
            {/* Hlavní velký obrázek */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
               {/* Fallback text */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Načítám obrázek...
               </div>
              <Image
                src={pendant.images[0]}
                alt={pendant.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Miniatury (pokud je více obrázků) */}
            {pendant.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {pendant.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-transparent hover:border-blue-500 transition-colors cursor-pointer">
                    <Image src={img} alt={`Pohled ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PRAVÝ SLOUPEC: Informace */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{pendant.name}</h1>
            
            {/* Zde byla cena - nyní odstraněna */}
            
            <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
              <h3 className="text-gray-900 font-semibold text-lg mb-2">Příběh</h3>
              <p>{pendant.fullDescription}</p>
            </div>

            {/* Technické parametry */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
              <h3 className="font-semibold mb-4 text-gray-900">Specifikace</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Materiál</span>
                  <span className="font-medium">{pendant.material}</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-gray-500">Rozměry</span>
                  <span className="font-medium">{pendant.dimensions}</span>
                </li>
              </ul>
            </div>

            {/* Video sekce */}
            {pendant.videoUrl && (
               <div className="mb-8">
                 <h3 className="font-semibold mb-3 text-gray-900">Video ukázka</h3>
                 <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                   <iframe 
                     width="100%" 
                     height="100%" 
                     src={pendant.videoUrl} 
                     title="YouTube video player" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                     allowFullScreen
                     className="w-full h-full"
                   ></iframe>
                 </div>
               </div>
            )}
            
            {/* Tlačítko zájmu (budoucí kontaktní formulář) */}
            <div className="pt-6 border-t border-gray-100">
                <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    Mám zájem o tento kousek
                </button>
                <p className="text-xs text-center text-gray-400 mt-3">
                    (V další fázi zde bude kontaktní formulář)
                </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
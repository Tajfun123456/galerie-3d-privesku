import { getPendantBySlug } from '../../../data/pendants';
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
          <div className="space-y-4 sticky top-24">
            {/* Hlavní velký obrázek */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
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
            
            {/* Miniatury */}
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

          {/* PRAVÝ SLOUPEC: Informace a Poptávka */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{pendant.name}</h1>
            
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
            
            {/* --- KONTAKTNÍ FORMULÁŘ --- */}
            <div className="pt-8 border-t border-gray-100" id="poptavka">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Máte o tento kousek zájem?</h3>
                <p className="text-gray-500 text-sm mb-6">
                    Napište mi. Ozvu se vám zpět s detaily o ceně a dopravě.
                    Tento formulář je nezávazná poptávka.
                </p>

                <form 
                  action="https://formsubmit.co/sf.simonflorian@gmail.com" 
                  method="POST"
                  className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                    {/* Skrytá pole pro FormSubmit */}
                    <input type="hidden" name="_subject" value={`Poptávka: ${pendant.name}`} />
                    <input type="hidden" name="pendant_id" value={pendant.id} />
                    
                    {/* --- ZMĚNA: Nastaveno na produkční doménu --- */}
                    <input type="hidden" name="_next" value="https://galerie-3d-privesku-mt2mwjc1w-simons-projects-3bb6104b.vercel.app/dekujeme" />
                    
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Váš Email</label>
                            <input type="email" name="email" required placeholder="@" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Počet kusů</label>
                            <input type="number" name="quantity" min="1" defaultValue="1" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Poznámka (Volitelné)</label>
                         <textarea name="message" rows={2} placeholder="Nějaké speciální přání?" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg mt-2">
                        Odeslat nezávaznou poptávku
                    </button>
                </form>
            </div>
            {/* --- KONEC FORMULÁŘE --- */}

          </div>
        </div>
      </div>
    </main>
  );
}
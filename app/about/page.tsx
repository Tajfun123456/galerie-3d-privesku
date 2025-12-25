import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center text-gray-900">
      
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          O projektu
        </h1>
        
        <div className="prose prose-lg text-gray-600">
          <p className="text-lg leading-relaxed">
            Vítejte v mé osobní galerii. Jsem nadšenec do 3D tisku a designu. 
            Tato stránka slouží jako portfolio mých experimentů s tvary, 
            materiály a post-processingem.
          </p>
          <p>
            Každý zde vystavený kousek má svůj příběh. Od prvního digitálního náčrtu, 
            přes hodiny tisku, až po ruční barvení a finální úpravy.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            ← Zpět do galerie
          </Link>
        </div>
      </div>

    </main>
  );
}
import Link from "next/link";

export default function DonePage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 text-center min-h-[60vh]">
      <div className="max-w-md space-y-6 bg-green-50 p-8 rounded-2xl border border-green-100 shadow-sm">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold text-green-800">Hotovo! Odesláno.</h1>
        <p className="text-green-700">
          Váš návrh úspěšně dorazil. 
          Podívám se na to a co nejdříve se vám ozvu na uvedený email.
        </p>
        
        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Zpět do galerie
          </Link>
        </div>
      </div>
    </main>
  );
}
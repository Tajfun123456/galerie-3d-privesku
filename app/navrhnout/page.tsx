"use client";

import { useState, useRef } from "react";

export default function ProposePage() {
  const [fileError, setFileError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funkce pro aktualizaci inputu (synchronizace React stavu s HTML inputem)
  const updateInputFiles = (files: File[]) => {
    if (!fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;

    // Validace velikosti
    let totalSize = 0;
    const maxBytes = 20 * 1024 * 1024; // 20 MB

    files.forEach(f => totalSize += f.size);

    if (totalSize > maxBytes) {
      setFileError(`Celková velikost souborů je ${(totalSize / (1024 * 1024)).toFixed(2)} MB. Maximální limit je 20 MB.`);
    } else {
      setFileError("");
    }
  };

  // Přidání nových souborů k existujícím
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Sloučíme staré a nové soubory
      const updatedFiles = [...selectedFiles, ...newFiles];
      
      setSelectedFiles(updatedFiles);
      updateInputFiles(updatedFiles);
    }
  };

  // Odebrání konkrétního souboru ze seznamu
  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    updateInputFiles(updatedFiles);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Navrhnout vlastní přívěšek
        </h1>
        <p className="text-gray-600 text-lg">
          Máte nápad? Našli jste model, který byste chtěli vytisknout? 
          Nahrajte mi ho a domluvíme se na realizaci.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
        <form 
          action="https://formsubmit.co/sf.simonflorian@gmail.com" 
          method="POST" 
          encType="multipart/form-data"
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="Nový návrh přívěsku z webu!" />
          
          {/* --- ZMĚNA: Nastaveno na produkční doménu --- */}
          <input type="hidden" name="_next" value="https://galerie-3d-privesku-mt2mwjc1w-simons-projects-3bb6104b.vercel.app/dekujeme" />
          
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          {/* --- POKROČILÝ HONEYPOT 🍯 --- */}
          <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden">
             <label htmlFor="_honey">Please fill this field (required)</label>
             <input 
               type="text" 
               name="_honey" 
               id="_honey" 
               tabIndex={-1} 
               autoComplete="off"
             />
          </div>
          {/* --- KONEC HONEYPOTU --- */}

          {/* Jméno */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Vaše jméno</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              required 
              placeholder="Jak vám mám říkat?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Váš E-mail</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              required 
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Popis */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Popis nápadu</label>
            <textarea 
              name="description" 
              id="description"
              rows={4}
              required
              placeholder="Popište svou představu. Jaká barva? Jaký materiál? Odkud je inspirace?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
            ></textarea>
          </div>

          {/* Upload souboru - VYLEPŠENÝ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Přílohy (Obrázky nebo 3D modely)
            </label>
            
            {/* Vlastní tlačítko pro výběr souborů */}
            <div className="flex items-center gap-4">
                <label 
                  htmlFor="attachment" 
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-colors font-medium text-sm flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Přidat soubory...
                </label>
                <span className="text-xs text-gray-500">Max 20 MB celkem</span>
            </div>

            {/* Skrytý input */}
            <input 
              type="file" 
              name="attachment[]" 
              id="attachment"
              ref={fileInputRef}
              multiple 
              accept="image/*,.stl,.obj,.3mf"
              onChange={handleFileChange}
              className="hidden" 
            />
            
            {/* Seznam vybraných souborů */}
            {selectedFiles.length > 0 && (
              <ul className="mt-4 space-y-2 border rounded-lg p-2 bg-gray-50">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between text-sm p-2 bg-white rounded border border-gray-100 shadow-sm">
                    <span className="truncate text-gray-700 max-w-[80%] font-medium">
                      {file.name} <span className="text-gray-400 font-normal">({(file.size / 1024).toFixed(0)} KB)</span>
                    </span>
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                      title="Odebrat soubor"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Chybová hláška */}
            {fileError && (
               <p className="text-sm text-red-600 mt-2 font-medium bg-red-50 p-2 rounded border border-red-100">
                 ⚠️ {fileError}
               </p>
            )}
          </div>

          {/* Odeslat */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={!!fileError} 
              className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all 
                ${fileError 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:opacity-90 hover:-translate-y-1'
                }`}
            >
              Odeslat návrh
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Odesláním souhlasíte se zpracováním emailu pro účely odpovědi.
            </p>
          </div>

        </form>
      </div>
    </main>
  );
}
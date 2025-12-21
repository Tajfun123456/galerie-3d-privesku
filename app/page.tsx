import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex">
        
        {/* Hlavní nadpis dle zadání */}
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Galerie tvých 3D přívěsků
        </h1>

      </div>
    </main>
  );
}
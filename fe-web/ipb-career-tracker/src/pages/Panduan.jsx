import React from 'react';

export function Panduan() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
            Panduan Karir
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Untuk Mahasiswa Tahun Pertama</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Eksplorasi minat dan bakat melalui UKM.</li>
                    <li>Jaga IPK tetap di atas 3.0.</li>
                    <li>Mulai pelajari skill teknis dasar.</li>
                </ul>
            </div>
            
             <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Untuk Mahasiswa Tingkat Akhir</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Persiapkan CV dan Portofolio profesional.</li>
                    <li>Ikuti program magang bersertifikat.</li>
                    <li>Networking dengan alumni via LinkedIn.</li>
                    <li>Latihan interview dan psikotes.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

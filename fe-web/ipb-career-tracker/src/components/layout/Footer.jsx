import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f2854] to-[#727272] border-t border-gray-900/10">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                T
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Tumbuh
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-6 max-w-xs">
              Platform karir mahasiswa untuk mempersiapkan masa depan yang lebih
              cerah.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Mahasiswa
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  to="/lowongan"
                  className="text-sm leading-6 text-white/70 hover:text-white"
                >
                  Cari Lowongan
                </Link>
              </li>
              <li>
                <Link
                  to="/panduan"
                  className="text-sm leading-6 text-white/70 hover:text-white"
                >
                  Panduan Karir
                </Link>
              </li>
              <li>
                <Link
                  to="/perusahaan"
                  className="text-sm leading-6 text-white/70 hover:text-white"
                >
                  Profil Perusahaan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Perusahaan
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <Link
                  to="/register-company"
                  className="text-sm leading-6 text-white/70 hover:text-white"
                >
                  Daftar Partner
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm leading-6 text-white/70 hover:text-white"
                >
                  Solusi Rekrutmen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Hubungi Kami
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li className="text-sm leading-6 text-white/70">
                support@tumbuh.id
              </li>
              <li className="text-sm leading-6 text-white/70">
                IPB University, Bogor
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs leading-5 text-white/50">
            &copy; 2026 Tumbuh IPB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

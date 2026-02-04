import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Lowongan', path: '/lowongan' },
    { name: 'Perusahaan', path: '/perusahaan' },
    { name: 'Panduan', path: '/panduan' },
  ];

  const isActive = (path) => {
    return location.pathname === path ? "text-emerald-600 font-semibold" : "text-gray-600 hover:text-emerald-600";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Tumbuh</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setOpenNav(!openNav)}
          >
            <span className="sr-only">Open main menu</span>
            {openNav ? (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`text-sm font-medium leading-6 transition-colors ${isActive(link.path)}`}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 py-2">
            Masuk
          </Link>
          <Button to="/register" variant="primary" size="sm">
            Daftar Sekarang
          </Button>
          {/* Mock Dashboard Link for easier access */}
          <Link to="/student/dashboard" className="text-xs text-gray-400 py-2 ml-4">Student DB</Link>
          <Link to="/hr/dashboard" className="text-xs text-gray-400 py-2">HR DB</Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {openNav && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                    location.pathname === link.path ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                }`}
                onClick={() => setOpenNav(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link to="/login" className="text-center font-medium text-gray-900" onClick={() => setOpenNav(false)}>Masuk</Link>
                <Button to="/register" className="w-full justify-center" onClick={() => setOpenNav(false)}>Daftar Sekarang</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

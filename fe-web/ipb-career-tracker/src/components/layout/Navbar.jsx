import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 1024 && setOpenNav(false)
    );
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TUMBUH
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setOpenNav(!openNav)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            {openNav ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Beranda
          </Link>
          <Link
            to="/dashboard"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Dashboard
          </Link>
          <Link
            to="/lowongan"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Lowongan
          </Link>
          <Link
            to="/profil"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Profil
          </Link>
          <Link
            to="/panduan"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Panduan
          </Link>
          <Link
            to="/karir"
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Karir
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => navigate('/login')}
            className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {openNav && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-1 px-6 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
              onClick={() => setOpenNav(false)}
            >
              Beranda
            </Link>
            <Link
              to="/dashboard"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
              onClick={() => setOpenNav(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/lowongan"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
              onClick={() => setOpenNav(false)}
            >
              Lowongan
            </Link>
            <Link
              to="/profil"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
              onClick={() => setOpenNav(false)}
            >
              Profil
            </Link>
            <Link
              to="/panduan"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
              onClick={() => setOpenNav(false)}
            >
              Panduan
            </Link>
            <Link
              to="/karir"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
              onClick={() => setOpenNav(false)}
            >
              Karir
            </Link>
            <button
              onClick={() => {
                navigate('/login');
                setOpenNav(false);
              }}
              className="block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

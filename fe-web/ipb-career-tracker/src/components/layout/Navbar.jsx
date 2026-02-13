import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Lowongan', path: '/lowongan' },
    { name: 'Perusahaan', path: '/perusahaan' },
    { name: 'Panduan', path: '/panduan' },
  ];

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-[#0f2854] font-semibold underline underline-offset-8 decoration-2'
      : 'text-gray-700 hover:text-[#0f2854]';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpenNav(false);
  };

  const dashboardPath =
    user?.role === 'hr' ? '/hr/dashboard' : '/student/dashboard';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[#0f2854] flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <span className="text-xl font-bold text-[#0f2854] tracking-tight">
              Tumbuh.
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#0f2854]/70 hover:text-[#0f2854]"
            onClick={() => setOpenNav(!openNav)}
          >
            <span className="sr-only">Open main menu</span>
            {openNav ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium leading-6 transition-colors ${isActive(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 text-sm font-medium text-[#0f2854]"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=0f2854&color=fff`
                  }
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span>{user.first_name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} /> Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-[#0f2854]/80 hover:text-[#0f2854] py-2"
              >
                Masuk
              </Link>
              <Button
                to="/register"
                className="bg-[#0f2854] hover:bg-[#2e4f7f] text-white font-semibold px-5 py-2 rounded shadow-sm transition-colors border-none focus:ring-2 focus:ring-[#0f2854]/40"
                size="sm"
              >
                Daftar Sekarang
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {openNav && (
        <div className="lg:hidden bg-gradient-to-r from-white to-gray-100 border-t border-gray-200 shadow-sm">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-[#0f2854]/10 text-[#0f2854] font-semibold'
                    : 'text-gray-700 hover:bg-[#0f2854]/5 hover:text-[#0f2854]'
                }`}
                onClick={() => setOpenNav(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="text-center font-medium text-[#0f2854]"
                    onClick={() => setOpenNav(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="w-full justify-center bg-red-50 text-red-600 hover:bg-red-100 border-none"
                  >
                    <LogOut size={16} className="mr-1" /> Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-center font-medium text-[#0f2854] hover:text-[#2e4f7f]"
                    onClick={() => setOpenNav(false)}
                  >
                    Masuk
                  </Link>
                  <Button
                    to="/register"
                    className="w-full justify-center bg-[#0f2854] hover:bg-[#2e4f7f] text-white"
                    onClick={() => setOpenNav(false)}
                  >
                    Daftar Sekarang
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

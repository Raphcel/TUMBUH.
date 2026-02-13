import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  User,
  Briefcase,
  Users,
  Building,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ role = 'student' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: Home },
    { name: 'Lamaran Saya', path: '/student/applications', icon: FileText },
    { name: 'Profil Saya', path: '/student/profile', icon: User },
  ];

  const hrLinks = [
    { name: 'Dashboard', path: '/hr/dashboard', icon: Home },
    { name: 'Kelola Lowongan', path: '/hr/opportunities', icon: Briefcase },
    { name: 'Pelamar', path: '/hr/applicants', icon: Users },
    { name: 'Profil Perusahaan', path: '/hr/company', icon: Building },
  ];

  const links = role === 'hr' ? hrLinks : studentLinks;

  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-white/15 text-white font-semibold'
      : 'text-white/70 hover:text-white hover:bg-white/10';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user
    ? `${user.first_name} ${user.last_name}`
    : role === 'hr'
      ? 'HR Staff'
      : 'Student';

  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0f2854&color=fff`;

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-900/10 bg-gradient-to-b from-[#0f2854] to-[#727272] w-64 fixed left-0 top-0 bottom-0 z-40">
      <div className="px-4 py-6">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Tumbuh{' '}
            <span className="text-xs font-normal text-white/60 uppercase ml-1 tracking-wider">
              {role}
            </span>
          </span>
        </Link>

        <ul className="mt-6 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive(link.path)}`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-white/10">
        <div className="flex items-center gap-2 bg-white/5 p-4 hover:bg-white/10">
          <img
            alt="Profile"
            src={avatarUrl}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="flex-1">
            <p className="text-xs font-medium text-white">{displayName}</p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs text-white/70 pt-1 hover:text-red-400 cursor-pointer"
            >
              <LogOut size={12} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

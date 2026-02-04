import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar({ role = 'student' }) {
  const location = useLocation();

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: 'HomeIcon' },
    { name: 'Lamaran Saya', path: '/student/applications', icon: 'DocumentTextIcon' },
    { name: 'Profil Saya', path: '/student/profile', icon: 'UserIcon' },
  ];

  const hrLinks = [
    { name: 'Dashboard', path: '/hr/dashboard', icon: 'HomeIcon' },
    { name: 'Kelola Lowongan', path: '/hr/opportunities', icon: 'BriefcaseIcon' },
    { name: 'Pelamar', path: '/hr/applicants', icon: 'UsersIcon' },
    { name: 'Profil Perusahaan', path: '/hr/company', icon: 'BuildingOfficeIcon' },
  ];

  const links = role === 'hr' ? hrLinks : studentLinks;

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-emerald-50 text-emerald-600" 
      : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50";
  };

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white w-64 fixed left-0 top-0 bottom-0 z-40">
      <div className="px-4 py-6">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
            T
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Tumbuh <span className="text-xs font-normal text-gray-500 uppercase ml-1">{role}</span></span>
        </Link>

        <ul className="mt-6 space-y-1">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive(link.path)}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={`https://ui-avatars.com/api/?name=${role === 'hr' ? 'HR Staff' : 'Student'}&background=random`}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div>
            <p className="text-xs font-medium text-gray-500">View Profile</p>
            <p className="text-xs text-gray-700 pt-1 hover:text-red-500 cursor-pointer">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

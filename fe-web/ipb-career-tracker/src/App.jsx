import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Beranda } from './pages/Beranda';
import { Lowongan } from './pages/Lowongan';
import { DetailLowongan } from './pages/DetailLowongan';
import { Perusahaan } from './pages/Perusahaan';
import { DetailPerusahaan } from './pages/DetailPerusahaan';
import { Panduan } from './pages/Panduan';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { StudentDashboard } from './pages/student/Dashboard';
import { LamaranSaya } from './pages/student/LamaranSaya';
import { ProfilStudent } from './pages/student/Profil';

import { HRDashboard } from './pages/hr/Dashboard';
import { KelolaLowongan } from './pages/hr/KelolaLowongan';
import { Pelamar } from './pages/hr/Pelamar';
import { ProfilPerusahaanHR } from './pages/hr/ProfilPerusahaan';

function App() {
  return (
    <Routes>
       {/* Public Routes */}
       <Route element={<PublicLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/lowongan" element={<Lowongan />} />
          <Route path="/lowongan/:id" element={<DetailLowongan />} />
          <Route path="/perusahaan" element={<Perusahaan />} />
          <Route path="/perusahaan/:id" element={<DetailPerusahaan />} />
          <Route path="/panduan" element={<Panduan />} />
       </Route>

       {/* Auth Routes */}
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />

       {/* Student Routes */}
       <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="applications" element={<LamaranSaya />} />
          <Route path="profile" element={<ProfilStudent />} />
       </Route>

       {/* HR Routes */}
       <Route path="/hr" element={<DashboardLayout role="hr" />}>
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="opportunities" element={<KelolaLowongan />} />
          <Route path="applicants" element={<Pelamar />} />
          <Route path="company" element={<ProfilPerusahaanHR />} />
       </Route>
    </Routes>
  );
}

export default App;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Pseudo logic
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                T
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">Tumbuh</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Masuk ke Akun Anda</h2>
            <p className="mt-2 text-gray-600">Selamat datang kembali! Silakan masukkan detail Anda.</p>
        </div>

        <Card>
            <CardBody>
                <form onSubmit={handleLogin} className="space-y-6">
                    <Input label="Email" type="email" placeholder="nama@apps.ipb.ac.id" />
                    <Input label="Password" type="password" placeholder="********" />
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Ingat saya</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Lupa password?</a>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">Masuk</Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-500">
                        Belum punya akun?{' '}
                        <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500">Daftar sekarang</Link>
                    </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                     <p className="text-xs text-center text-gray-400 mb-4">Untuk Demo (Klik akses cepat):</p>
                     <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline" onClick={() => navigate('/student/dashboard')}>Student</Button>
                        <Button size="sm" variant="outline" onClick={() => navigate('/hr/dashboard')}>HR Staff</Button>
                     </div>
                </div>
            </CardBody>
        </Card>
      </div>
    </div>
  );
}

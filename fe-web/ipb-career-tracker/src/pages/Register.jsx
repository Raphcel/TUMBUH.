import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';

export function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                T
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">Tumbuh</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h2>
            <p className="mt-2 text-gray-600">Bergabunglah dengan komunitas karir IPB.</p>
        </div>

        <Card>
            <CardBody>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Nama Depan" placeholder="Budi" />
                        <Input label="Nama Belakang" placeholder="Santoso" />
                    </div>
                    <Input label="Email Institusi (IPB)" type="email" placeholder="budi@apps.ipb.ac.id" />
                    <Select label="Peran" options={[
                        { label: 'Mahasiswa', value: 'student' },
                        { label: 'Perusahaan (HR)', value: 'hr' },
                    ]} />
                    <Input label="Password" type="password" placeholder="********" />
                    <Input label="Konfirmasi Password" type="password" placeholder="********" />

                    <div className="block text-sm text-gray-900 pt-2">
                         Dengan mendaftar, Anda menyetujui <a href="#" className="text-emerald-600">Syarat & Ketentuan</a> kami.
                    </div>

                    <Button type="button" className="w-full">Daftar</Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-500">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">Masuk disini</Link>
                    </p>
                </div>
            </CardBody>
        </Card>
      </div>
    </div>
  );
}

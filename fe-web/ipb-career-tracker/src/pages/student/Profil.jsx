import React from 'react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { USERS } from '../../data/mockData';

export function ProfilStudent() {
  const user = USERS.student;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardBody className="flex flex-col items-center text-center">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4 bg-gray-200" />
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">{user.major}</p>
                    <p className="text-sm text-gray-400 mt-1">{user.university}</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full">Ganti Foto</Button>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                     <h3 className="font-semibold text-gray-900 mb-4">CV & Resume</h3>
                     <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
                        <p className="text-sm text-gray-500 mb-2">CV_Budi_Santoso_2026.pdf</p>
                        <Button size="sm" variant="ghost">Update CV</Button>
                     </div>
                </CardBody>
            </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardBody>
                    <h3 className="font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">Informasi Pribadi</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Nama Lengkap" defaultValue={user.name} />
                            <Input label="NIM" defaultValue="G64190000" disabled />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Email" defaultValue={user.email} />
                            <Input label="Nomor Telepon" defaultValue="+62 812 3456 7890" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Jurusan" defaultValue={user.major} disabled />
                            <Input label="IPK Terakhir" defaultValue={user.gpa} disabled />
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                            <Button>Simpan Perubahan</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
      </div>
    </div>
  );
}

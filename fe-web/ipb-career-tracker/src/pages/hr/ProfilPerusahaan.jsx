import React from 'react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { COMPANIES } from '../../data/mockData';

export function ProfilPerusahaanHR() {
  const company = COMPANIES.find(c => c.id === 101); // Mock Tokopedia

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profil Perusahaan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
             <Card>
                <CardBody className="flex flex-col items-center text-center">
                    <img src={company.logo} alt={company.name} className="w-32 h-32 rounded-lg mb-4 bg-gray-100 object-contain p-2" />
                    <Button variant="outline" size="sm" className="w-full">Upload Logo Baru</Button>
                </CardBody>
            </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardBody>
                    <form className="space-y-4">
                        <Input label="Nama Perusahaan" defaultValue={company.name} />
                        <Input label="Industri" defaultValue={company.industry} />
                        <Input label="Lokasi Kantor Pusat" defaultValue={company.location} />
                        <Input label="Website" defaultValue={company.website} />
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Perusahaan</label>
                            <textarea 
                                className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                                rows={6}
                                defaultValue={company.description}
                            />
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

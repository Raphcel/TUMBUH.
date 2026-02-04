import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { OPPORTUNITIES, COMPANIES } from '../data/mockData';

export function DetailLowongan() {
  const { id } = useParams();
  const job = OPPORTUNITIES.find(o => o.id === parseInt(id));
  
  if (!job) {
    return <div className="py-20 text-center">Lowongan tidak ditemukan</div>;
  }

  const company = COMPANIES.find(c => c.id === job.companyId);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-emerald-900 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
            <Link to="/lowongan" className="text-emerald-200 hover:text-white mb-6 inline-block">&larr; Kembali ke Lowongan</Link>
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg bg-white p-1" />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white">{job.title}</h1>
                    <p className="text-emerald-100 text-lg mt-1">{company.name} • {job.location}</p>
                </div>
                <Button className="bg-white text-emerald-900 hover:bg-emerald-50 w-full md:w-auto">
                    Lamar Sekarang
                </Button>
            </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardBody>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
                        <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                        
                        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">Persyaratan</h3>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            {job.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardBody>
                        <h3 className="font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Tipe Pekerjaan</p>
                                <p className="font-medium text-gray-900">{job.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Gaji</p>
                                <p className="font-medium text-gray-900">{job.salary}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Batas Lamaran</p>
                                <p className="font-medium text-gray-900">{job.deadline}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <h3 className="font-semibold text-gray-900 mb-4">Tentang Perusahaan</h3>
                        <p className="text-gray-600 text-sm mb-4">{company.description}</p>
                        <Link to={`/perusahaan/${company.id}`} className="text-emerald-600 text-sm hover:underline">
                            Lihat Profil Perusahaan
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}

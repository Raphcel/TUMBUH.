import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COMPANIES, OPPORTUNITIES } from '../data/mockData';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function DetailPerusahaan() {
  const { id } = useParams();
  const company = COMPANIES.find(c => c.id === parseInt(id));
  
  if (!company) return <div className="py-20 text-center">Perusahaan tidak ditemukan</div>;

  const companyJobs = OPPORTUNITIES.filter(job => job.companyId === company.id);

  return (
    <div className="bg-white min-h-screen pb-20">
        <div className="h-48 bg-gray-200 w-full relative">
            <div className="absolute -bottom-12 left-6 lg:left-8">
                <img src={company.logo} alt={company.name} className="w-24 h-24 rounded-xl border-4 border-white bg-white shadow-md" />
            </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
            <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-gray-500 mt-1">{company.industry} • {company.location}</p>
                
                <div className="mt-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang Perusahaan</h2>
                        <p className="text-gray-600 leading-relaxed">{company.description}</p>
                        <a href={company.website} target="_blank" rel="noreferrer" className="text-emerald-600 mt-2 block hover:underline">
                            Kunjungi Website
                        </a>
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Lowongan Aktif</h2>
                        <div className="space-y-4">
                            {companyJobs.length > 0 ? (
                                companyJobs.map(job => (
                                    <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.type} • {job.location}</p>
                                        </div>
                                        <Button to={`/lowongan/${job.id}`} variant="outline" size="sm">
                                            Lihat
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Belum ada lowongan aktif saat ini.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
}

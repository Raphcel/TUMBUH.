import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { OPPORTUNITIES, COMPANIES } from '../data/mockData';

export function Beranda() {
  const recentJobs = OPPORTUNITIES.slice(0, 3);
  const topCompanies = COMPANIES.slice(0, 3);

  return (
    <>
      <section className="relative bg-emerald-900 overflow-hidden isolate">
         <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffdb] to-[#4ade80] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Temukan Karir Impianmu Bersama Tumbuh
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Platform karir terintegrasi untuk mahasiswa IPB. Temukan magang, lowongan kerja, dan beasiswa yang sesuai dengan potensimu.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button to="/lowongan" variant="primary" size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white border-0">
                Cari Lowongan
              </Button>
              <Link to="/panduan" className="text-sm font-semibold leading-6 text-white hover:text-emerald-300">
                Panduan Karir <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lowongan Terbaru</h2>
                <p className="mt-2 text-lg text-gray-600">Peluang terbaru yang mungkin cocok untukmu.</p>
            </div>
            <Link to="/lowongan" className="text-emerald-600 hover:text-emerald-500 font-semibold">
                Lihat Semua &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardBody>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{job.title}</h3>
                                <p className="text-gray-500 text-sm">{COMPANIES.find(c => c.id === job.companyId)?.name}</p>
                            </div>
                            <Badge variant={job.type === 'Internship' ? 'info' : job.type === 'Scholarship' ? 'success' : 'neutral'}>
                                {job.type}
                            </Badge>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm text-gray-500 gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {job.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {job.salary}
                            </div>
                        </div>
                        <Button to={`/lowongan/${job.id}`} variant="outline" className="w-full">
                            Detail Lowongan
                        </Button>
                    </CardBody>
                </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
                Partner Perusahaan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {topCompanies.map((company) => (
                    <Link key={company.id} to={`/perusahaan/${company.id}`} className="group">
                        <div className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 h-32 group-hover:border-emerald-500 transition-colors">
                            <span className="text-xl font-bold text-gray-400 group-hover:text-emerald-600 transition-colors">{company.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}

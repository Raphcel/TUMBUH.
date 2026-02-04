import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input, Select } from '../components/ui/Input';
import { OPPORTUNITIES, COMPANIES } from '../data/mockData';

export function Lowongan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredJobs = OPPORTUNITIES.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          COMPANIES.find(c => c.id === job.companyId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Temukan Lowongan</h1>
                    <p className="mt-2 text-gray-600">Jelajahi kesempatan karir terbaik untukmu.</p>
                </div>
            </div>

            <Card className="mb-8">
                <CardBody className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input 
                            placeholder="Cari posisi atau perusahaan..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            options={[
                                { value: 'All', label: 'Semua Tipe' },
                                { value: 'Internship', label: 'Magang' },
                                { value: 'Full-time', label: 'Full-time' },
                                { value: 'Scholarship', label: 'Beasiswa' },
                            ]}
                        />
                    </div>
                    <Button>Cari</Button>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
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
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        Tidak ada lowongan yang ditemukan.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

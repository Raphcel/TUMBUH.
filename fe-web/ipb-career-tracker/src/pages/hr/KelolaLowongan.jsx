import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { OPPORTUNITIES } from '../../data/mockData';

export function KelolaLowongan() {
  const companyId = 101; 
  const myJobs = OPPORTUNITIES.filter(o => o.companyId === companyId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Lowongan</h1>
        <Button>+ Buat Lowongan Baru</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-3">Posisi</th>
                        <th className="px-6 py-3">Tipe</th>
                        <th className="px-6 py-3">Lokasi</th>
                        <th className="px-6 py-3">Pelamar</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {myJobs.map((job) => (
                        <tr key={job.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                            <td className="px-6 py-4">{job.type}</td>
                            <td className="px-6 py-4">{job.location}</td>
                            <td className="px-6 py-4">{job.applicants_count}</td>
                            <td className="px-6 py-4">
                                <Badge variant="success">Active</Badge>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button className="font-medium text-blue-600 hover:underline">Edit</button>
                                <button className="font-medium text-red-600 hover:underline">Tutup</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}

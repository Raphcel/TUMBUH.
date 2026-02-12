import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { APPLICATIONS, OPPORTUNITIES, USERS } from '../../data/mockData';

export function Pelamar() {
  const companyId = 101; 
  const myJobs = OPPORTUNITIES.filter(o => o.companyId === companyId);
  // Mock getting all apps for these jobs
  const applicants = APPLICATIONS.filter(a => myJobs.find(j => j.id === a.opportunityId)).map(app => ({
      ...app,
      jobTitle: myJobs.find(j => j.id === app.opportunityId)?.title,
      applicantName: USERS.student.name // Mocking same user for all
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Daftar Pelamar</h1>
      
      <Card>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-3">Nama Pelamar</th>
                        <th className="px-6 py-3">Posisi Dilamar</th>
                        <th className="px-6 py-3">Tanggal Melamar</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((app) => (
                        <tr key={app.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{app.applicantName}</td>
                            <td className="px-6 py-4">{app.jobTitle}</td>
                            <td className="px-6 py-4">{app.appliedAt}</td>
                            <td className="px-6 py-4">
                                <Badge variant={app.status === 'Rejected' ? 'error' : app.status === 'Accepted' ? 'success' : 'info'}>
                                    {app.status}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="font-medium text-emerald-600 hover:underline">Review</button>
                            </td>
                        </tr>
                    ))}
                    {applicants.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Belum ada pelamar.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}

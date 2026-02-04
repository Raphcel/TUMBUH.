import React from 'react';
import { Card, CardBody } from '../../components/ui/Card';
import { OPPORTUNITIES, APPLICATIONS } from '../../data/mockData';

export function HRDashboard() {
  const companyId = 101; // Mock Tokopedia
  const myJobs = OPPORTUNITIES.filter(o => o.companyId === companyId);
  const myApplicants = APPLICATIONS.filter(a => myJobs.find(j => j.id === a.opportunityId));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Rekrutmen</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-50 border-emerald-100">
           <CardBody>
             <p className="text-sm font-medium text-emerald-800">Total Pelamar</p>
             <p className="text-3xl font-bold text-emerald-900 mt-2">{myApplicants.length}</p>
           </CardBody>
        </Card>
        <Card>
           <CardBody>
             <p className="text-sm font-medium text-gray-500">Lowongan Aktif</p>
             <p className="text-3xl font-bold text-gray-900 mt-2">{myJobs.length}</p>
           </CardBody>
        </Card>
        <Card>
           <CardBody>
             <p className="text-sm font-medium text-gray-500">Butuh Review</p>
             <p className="text-3xl font-bold text-gray-900 mt-2">{myApplicants.filter(a => a.status === 'Applied').length}</p>
           </CardBody>
        </Card>
      </div>
      
      <h2 className="text-lg font-bold text-gray-900 pt-4">Statistik Lowongan</h2>
      {/* Placeholder for charts */}
      <Card className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 border-dashed">
         Chart Area Placeholder
      </Card>
    </div>
  );
}

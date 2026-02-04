import React from 'react';
import { Card, CardBody } from '../../components/ui/Card';
import { APPLICATIONS, OPPORTUNITIES, COMPANIES } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';

export function LamaranSaya() {
  const myApplications = APPLICATIONS.filter(app => app.studentId === 1); // Mock user ID 1

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Lamaran Saya</h1>

      <div className="space-y-4">
        {myApplications.map((app) => {
          const job = OPPORTUNITIES.find((o) => o.id === app.opportunityId);
          const company = COMPANIES.find((c) => c.id === job?.companyId);

          return (
            <Card key={app.id}>
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <img src={company?.logo} alt={company?.name} className="w-12 h-12 rounded bg-gray-100 p-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{job?.title}</h3>
                      <p className="text-sm text-gray-500">{company?.name}</p>
                      <p className="text-xs text-gray-400 mt-1">Applied: {app.appliedAt}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge variant={
                        app.status === 'Rejected' ? 'error' : 
                        app.status === 'Accepted' ? 'success' : 
                        'info'
                    }>
                      {app.status}
                    </Badge>
                  </div>
                </div>

                {app.history && (
                    <div className="mt-6 border-t border-gray-100 pt-4">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Status History</p>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {app.history.map((h, idx) => (
                                <div key={idx} className="flex flex-col min-w-[100px]">
                                    <span className="text-xs font-medium text-gray-700">{h.status}</span>
                                    <span className="text-[10px] text-gray-400">{h.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
              </CardBody>
            </Card>
          );
        })}
        {myApplications.length === 0 && (
             <div className="text-center py-12 text-gray-500">
                Belum ada lamaran yang dikirim. <br/>
                Mulai cari lowongan di menu <a href="/lowongan" className="text-emerald-600">Lowongan</a>.
             </div>
        )}
      </div>
    </div>
  );
}

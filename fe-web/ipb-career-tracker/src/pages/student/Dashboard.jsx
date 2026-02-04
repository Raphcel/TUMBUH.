import React from 'react';
import { Card, CardBody } from '../../components/ui/Card';
import { APPLICATIONS, USERS, OPPORTUNITIES } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';

export function StudentDashboard() {
  const user = USERS.student;
  const myApplications = APPLICATIONS.filter(app => app.studentId === user.id);
  const activeApplications = myApplications.filter(app => ['Applied', 'Interview', 'Screening'].includes(app.status));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, {user.name} 👋</h1>
          <p className="text-gray-500">Berikut aktivitas karirmu hari ini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-50 border-emerald-100">
          <CardBody>
            <p className="text-sm font-medium text-emerald-800">Lamaran Aktif</p>
            <p className="text-3xl font-bold text-emerald-900 mt-2">{activeApplications.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-500">Total Lamaran</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{myApplications.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-500">Profile Completeness</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">85%</p>
          </CardBody>
        </Card>
      </div>

      <h2 className="text-lg font-bold text-gray-900">Lamaran Terbaru</h2>
      <div className="space-y-4">
        {myApplications.slice(0, 3).map(app => {
            const job = OPPORTUNITIES.find(o => o.id === app.opportunityId);
            return (
                <Card key={app.id}>
                    <CardBody className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">{job?.title}</h3>
                            <p className="text-sm text-gray-500">Applied on {app.appliedAt}</p>
                        </div>
                        <Badge variant={app.status === 'Rejected' ? 'error' : app.status === 'Accepted' ? 'success' : 'info'}>
                            {app.status}
                        </Badge>
                    </CardBody>
                </Card>
            )
        })}
        {myApplications.length === 0 && <p className="text-gray-500 italic">Belum ada lamaran.</p>}
      </div>
      
      {myApplications.length > 0 && (
          <div className="text-right">
              <Link to="/student/applications" className="text-sm text-emerald-600 font-medium hover:underline">Lihat Semua Lamaran &rarr;</Link>
          </div>
      )}
    </div>
  );
}

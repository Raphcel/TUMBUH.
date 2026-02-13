import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { opportunitiesApi } from '../../api/opportunities';

export function KelolaLowongan() {
  const { user } = useAuth();
  const companyId = user?.company_id;
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }
    async function fetchJobs() {
      try {
        const data = await opportunitiesApi.listByCompany(companyId);
        setMyJobs(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [companyId]);

  const handleClose = async (jobId) => {
    try {
      await opportunitiesApi.update(jobId, { is_active: false });
      setMyJobs(
        myJobs.map((j) => (j.id === jobId ? { ...j, is_active: false } : j))
      );
    } catch (err) {
      console.error('Failed to close job', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                <tr
                  key={job.id}
                  className="bg-white border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="px-6 py-4">{job.type}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.applicants_count}</td>
                  <td className="px-6 py-4">
                    <Badge variant={job.is_active ? 'success' : 'error'}>
                      {job.is_active ? 'Active' : 'Closed'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="font-medium text-blue-600 hover:underline">
                      Edit
                    </button>
                    {job.is_active && (
                      <button
                        onClick={() => handleClose(job.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Tutup
                      </button>
                    )}
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

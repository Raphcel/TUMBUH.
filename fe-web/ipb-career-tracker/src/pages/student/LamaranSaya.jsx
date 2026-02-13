import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { applicationsApi } from '../../api/applications';

export function LamaranSaya() {
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await applicationsApi.mine();
        setMyApplications(data.items || []);
      } catch (err) {
        console.error('Failed to load applications', err);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Application Tracker
          </h1>
          <p className="text-secondary mt-1">
            Track your progress for every opportunity.
          </p>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex" disabled>
          + Track externship (Coming soon)
        </Button>
      </div>

      <div className="space-y-4">
        {myApplications.map((app) => {
          const job = app.opportunity;
          const company = job?.company;

          return (
            <Card
              key={app.id}
              className="border border-gray-100 shadow-sm hover:border-primary/20 transition-colors"
            >
              <CardBody className="p-5">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-xs text-gray-400 border border-gray-100">
                      {company?.name?.[0]}
                    </div>
                    <div>
                      <h3 className="font-medium text-primary text-base">
                        {job?.title}
                      </h3>
                      <p className="text-sm text-secondary">{company?.name}</p>

                      {app.history && app.history.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          {app.history.slice(-1).map((h, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-secondary bg-gray-50 px-2 py-1 rounded"
                            >
                              Latest update: {h.status} on{' '}
                              {new Date(h.date).toLocaleDateString('id-ID')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        app.status === 'Rejected'
                          ? 'error'
                          : app.status === 'Accepted'
                            ? 'success'
                            : 'info'
                      }
                    >
                      {app.status}
                    </Badge>
                    <span className="text-xs text-secondary mt-1">
                      Applied{' '}
                      {new Date(app.applied_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
        {myApplications.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <p className="text-secondary font-medium">
              No applications tracked yet.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Start by applying to opportunities or tracking one manually.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button to="/lowongan" variant="primary">
                Find Opportunities
              </Button>
              <Button variant="outline" disabled>
                Track Manually
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

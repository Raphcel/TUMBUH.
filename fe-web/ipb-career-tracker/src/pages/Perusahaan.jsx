import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANIES } from '../data/mockData';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function Perusahaan() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Partner Perusahaan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIES.map((company) => (
            <Link key={company.id} to={`/perusahaan/${company.id}`} className="group">
              <Card className="h-full hover:border-emerald-500 transition-colors">
                <CardBody className="flex flex-col items-center text-center">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-20 h-20 rounded-full mb-4 bg-gray-100 object-contain p-2"
                  />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{company.name}</h3>
                  <Badge variant="neutral" className="mt-2 text-xs">{company.industry}</Badge>
                  <p className="mt-4 text-sm text-gray-500 line-clamp-3">{company.description}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

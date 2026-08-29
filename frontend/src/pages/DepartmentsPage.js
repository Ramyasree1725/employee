/**
 * DepartmentsPage
 * Top-level page component for the Employee Management System frontend.
 */

import React, { useState, useEffect } from 'react';
import DashboardStats from '../components/DashboardStats';
import EmployeeTable from '../components/EmployeeTable';
import LeaveTable from '../components/LeaveTable';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

function DepartmentsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ page: 1, limit: 20 });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // In production this would call the backend API
        // const res = await fetch('/api/...');
        // const json = await res.json();
        // Simulate
        await new Promise(r => setTimeout(r, 300));
        if (!cancelled) {
          setData({ items: [], total: 0 });
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  if (loading) {
    return (
      <div className="page departmentspage">
        <Sidebar />
        <div className="page-content">
          <Topbar title="Departments" />
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page departmentspage">
        <Sidebar />
        <div className="page-content">
          <Topbar title="Departments" />
          <EmptyState message={error.message || 'Failed to load data'} />
        </div>
      </div>
    );
  }

  return (
    <div className="page departmentspage">
      <Sidebar active="DepartmentsPage" />
      <div className="page-content">
        <Topbar title="Departments" />
        <main className="page-main">
          <section className="page-section">
            <h1>Departments</h1>
            <p className="page-description">
              Manage and view departments related information for the organization.
            </p>
          </section>

          <section className="page-section">
            <DashboardStats />
          </section>

          <section className="page-section">
            <EmployeeTable data={data?.items || []} />
          </section>

          <section className="page-section">
            <LeaveTable data={[]} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default DepartmentsPage;

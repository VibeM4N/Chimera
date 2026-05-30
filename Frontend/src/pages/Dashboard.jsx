import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RiskBadge from '../components/common/RiskBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { reportService } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ reportType: '', status: '' });
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchReports();
  }, [filters, page]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit,
        skip: (page - 1) * limit,
        ...(filters.reportType && { reportType: filters.reportType }),
        ...(filters.status && { status: filters.status }),
      });
      const response = await reportService.getReports(`${limit}&skip=${(page - 1) * limit}`);
      setReports(response.data.reports || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reports Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage security reports from the community
            </p>
          </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Reports</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {reports.filter((r) => r.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">
              {reports.filter((r) => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm">High Threat</p>
            <p className="text-2xl font-bold text-red-600">
              {reports.filter((r) => r.threatLevel === 'high').length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={filters.reportType}
                onChange={(e) => {
                  setFilters({ ...filters, reportType: e.target.value });
                  setPage(1);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Types</option>
                <option value="phishing">Phishing</option>
                <option value="malware">Malware</option>
                <option value="scam">Scam</option>
                <option value="fake_site">Fake Site</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value });
                  setPage(1);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-8">
              <LoadingSpinner message="Loading reports..." />
            </div>
          ) : reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Threat Level
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Upvotes
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {report.url}
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-900 dark:text-white">
                        {report.reportType.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            report.threatLevel === 'high'
                              ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                              : report.threatLevel === 'medium'
                                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          }`}
                        >
                          {report.threatLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">
                        {report.upvotes}
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-900 dark:text-white">
                        {report.status}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => navigate(`/reports/${report.id}`)}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              No reports found
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}

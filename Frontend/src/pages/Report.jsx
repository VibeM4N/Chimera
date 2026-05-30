import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { reportService } from '../services/api';

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await reportService.getReportById(id);
      setReport(response.data.report);
      setUpvotes(response.data.report.upvotes);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      await fetch(`/api/reports/${id}/upvote`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('chimera_token')}` },
      });
      setUpvotes(upvotes + 1);
    } catch (err) {
      console.error('Failed to upvote:', err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
          <LoadingSpinner message="Loading report..." />
        </main>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 pt-24 pb-16 text-red-600 text-center">
          {error}
        </main>
      </div>
    );
  if (!report)
    return (
      <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 pt-24 pb-16 text-center">
          Report not found
        </main>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 dark:text-blue-400 hover:underline mb-6 font-semibold"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Report Details</h1>
                  <p className="text-gray-600 dark:text-gray-400 break-all">{report.url}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      report.threatLevel === 'high'
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : report.threatLevel === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    }`}
                  >
                    {report.threatLevel} Threat
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase mb-1">Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {report.reportType.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase mb-1">Status</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">{report.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase mb-1">Submitted</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase mb-1">Reports</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{report.reportedBy}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-6">{report.description}</p>

                {report.evidence && (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Evidence</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{report.evidence}</p>
                  </>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Report Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Upvotes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{upvotes}</p>
                  </div>
                  <button
                    onClick={handleUpvote}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    👍 Helpful
                  </button>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase mb-2">Discovery Method</p>
                    <p className="text-sm text-gray-900 dark:text-white capitalize">
                      {report.discoveryMethod.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

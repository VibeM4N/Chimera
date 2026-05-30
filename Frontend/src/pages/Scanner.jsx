import { useState } from 'react';
import FormInput from '../components/common/FormInput';
import RiskBadge from '../components/common/RiskBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { scanService } from '../services/api';
import useAsync from '../hooks/useAsync';

export default function Scanner() {
  const [scanUrl, setScanUrl] = useState('');
  const [results, setResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const { data: history, execute: fetchHistory } = useAsync(() => scanService.getScanHistory(10), false);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setError('');

    if (!scanUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(scanUrl)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsScanning(true);
    try {
      const response = await scanService.scanURL(scanUrl);
      setResults(response.data.scan);
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleScanAnother = () => {
    setScanUrl('');
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Scanner Section */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">URL Scanner</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Scan any URL to detect phishing, malware, and security threats
                </p>

              {!results ? (
                <form onSubmit={handleScan} className="space-y-6">
                  <FormInput
                    label="Enter URL to Scan"
                    name="url"
                    type="url"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    error={error}
                    placeholder="https://example.com"
                    disabled={isScanning}
                  />
                  <button
                    type="submit"
                    disabled={isScanning}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    {isScanning ? 'Scanning...' : 'Scan URL'}
                  </button>
                </form>
              ) : (
                <>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Scan Results
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 break-all">{results.target}</p>

                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-32 h-32 mb-4">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            fill="none"
                            stroke={
                              results.riskLevel === 'safe'
                                ? '#22c55e'
                                : results.riskLevel === 'suspicious'
                                  ? '#eab308'
                                  : '#ef4444'
                            }
                            strokeWidth="8"
                            strokeDasharray={`${(results.safetyScore / 100) * 377} 377`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                              {results.safetyScore}%
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Safe</p>
                          </div>
                        </div>
                      </div>

                      <RiskBadge level={results.riskLevel} score={results.riskScore} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {results.details &&
                        Object.entries(results.details).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="bg-white dark:bg-gray-800 p-3 rounded">
                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace(/_/g, ' ')}
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {String(value).substring(0, 30)}
                            </p>
                          </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleScanAnother}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                      >
                        Scan Another
                      </button>
                    </div>
                  </div>
                </>
              )}

              {isScanning && <LoadingSpinner message="Scanning URL for threats..." />}
              </div>
            </div>

            {/* Recent Scans Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Scans</h3>
                {history && history.scans && history.scans.length > 0 ? (
                  <div className="space-y-3">
                    {history.scans.map((scan) => (
                      <div
                        key={scan.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {scan.target}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <RiskBadge level={scan.riskLevel} />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {new Date(scan.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">No scans yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import FormInput from '../components/common/FormInput';
import FormTextarea from '../components/common/FormTextarea';
import RiskBadge from '../components/common/RiskBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { scanService } from '../services/api';

export default function EmailChecker() {
  const [activeTab, setActiveTab] = useState('simple');
  const [formData, setFormData] = useState({
    subject: '',
    sender: '',
    body: '',
  });
  const [results, setResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.subject.trim() || !formData.sender.trim() || !formData.body.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsScanning(true);
    try {
      const response = await scanService.scanEmail(formData);
      setResults(response.data.scan);
    } catch (err) {
      setError(err.response?.data?.message || 'Email check failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleCheckAnother = () => {
    setFormData({ subject: '', sender: '', body: '' });
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Email Checker</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Analyze emails to detect phishing attempts, spoofing, and suspicious content
          </p>

          {!results ? (
            <>
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('simple')}
                    className={`pb-3 px-4 font-semibold transition ${
                      activeTab === 'simple'
                        ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Simple Input
                  </button>
                  <button
                    onClick={() => setActiveTab('raw')}
                    className={`pb-3 px-4 font-semibold transition ${
                      activeTab === 'raw'
                        ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Raw Email
                  </button>
                </div>
              </div>

              <form onSubmit={handleCheck} className="space-y-6">
                {activeTab === 'simple' && (
                  <>
                    <FormInput
                      label="Sender Email"
                      name="sender"
                      type="email"
                      value={formData.sender}
                      onChange={handleInputChange}
                      error={error && error.includes('sender') ? error : ''}
                      placeholder="sender@example.com"
                      disabled={isScanning}
                    />
                    <FormInput
                      label="Email Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={error && error.includes('subject') ? error : ''}
                      placeholder="Email subject line"
                      disabled={isScanning}
                    />
                  </>
                )}

                <FormTextarea
                  label={activeTab === 'simple' ? 'Email Body' : 'Email Content (Headers + Body)'}
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  error={error && error.includes('body') ? error : ''}
                  placeholder={
                    activeTab === 'simple'
                      ? 'Paste the email message here...'
                      : 'Paste the complete email with headers...'
                  }
                  disabled={isScanning}
                  maxLength={5000}
                  rows={8}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isScanning}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  {isScanning ? 'Checking...' : 'Check Email'}
                </button>
              </form>

              {isScanning && <LoadingSpinner message="Analyzing email for threats..." />}
            </>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Analysis Results
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Phishing Likelihood</p>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {results.phishingLikelihood}%
                  </div>
                  <RiskBadge level={results.riskLevel} />
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded">
                  <p className="text-gray-600 dark:text-gray-400 mb-3 font-semibold">Analysis Details</p>
                  {results.details && (
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">SPF Check:</span> {results.details.spfCheck}
                      </li>
                      <li className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">DKIM Check:</span> {results.details.dkimCheck}
                      </li>
                      <li className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Suspicious Links:</span>{' '}
                        {results.details.suspiciousLinks || 'None'}
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {results.details?.urgencyKeywords && results.details.urgencyKeywords.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg mb-6">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                    ⚠️ Urgency Keywords Detected
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    {results.details.urgencyKeywords.join(', ')}
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckAnother}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Check Another Email
              </button>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  );
}

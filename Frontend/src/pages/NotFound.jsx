import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-base dark:bg-base-dark">
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center pt-24">
        <div className="text-center px-4">
          <div className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}

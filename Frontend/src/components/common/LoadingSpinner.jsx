export default function LoadingSpinner({ message = 'Loading...', progress }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-center">{message}</p>
      {progress !== undefined && (
        <div className="mt-3 w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

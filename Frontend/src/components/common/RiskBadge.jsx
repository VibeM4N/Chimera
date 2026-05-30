export default function RiskBadge({ level = 'safe', score }) {
  const getLevelStyles = () => {
    switch (level) {
      case 'safe':
        return {
          bg: 'bg-green-100 dark:bg-green-900',
          text: 'text-green-800 dark:text-green-200',
          border: 'border-green-300 dark:border-green-700',
        };
      case 'suspicious':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900',
          text: 'text-yellow-800 dark:text-yellow-200',
          border: 'border-yellow-300 dark:border-yellow-700',
        };
      case 'critical':
        return {
          bg: 'bg-red-100 dark:bg-red-900',
          text: 'text-red-800 dark:text-red-200',
          border: 'border-red-300 dark:border-red-700',
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-900',
          text: 'text-gray-800 dark:text-gray-200',
          border: 'border-gray-300 dark:border-gray-700',
        };
    }
  };

  const getLevelIcon = () => {
    switch (level) {
      case 'safe':
        return '✓';
      case 'suspicious':
        return '⚠';
      case 'critical':
        return '✕';
      default:
        return '?';
    }
  };

  const styles = getLevelStyles();

  return (
    <div className={`inline-block px-3 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border} text-sm font-semibold`}>
      <span className="mr-1">{getLevelIcon()}</span>
      <span className="capitalize">
        {level}
        {score !== undefined && ` (${score}%)`}
      </span>
    </div>
  );
}

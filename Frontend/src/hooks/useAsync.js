import { useState, useEffect } from 'react';

export default function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response.data);
      setStatus('success');
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setStatus('error');
      throw err;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return {
    execute,
    status,
    data,
    error,
    loading: status === 'pending',
  };
}

import { useCallback, useState } from 'react';
// Encapsulating fetch logic in a hook makes it easy to scale and maintain.
const useFetch = ({ url }: { url: string }) => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetchData };
};

export default useFetch;

import { useEffect, useState } from 'react';

const useFetch = ({ url }: { url: string }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setData(data);
      });
  }, [url]);

  return { data };
};

export default useFetch;

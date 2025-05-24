import { render, screen } from '@testing-library/react';
import React from 'react';
import useFetch from './useFetch';

global.fetch = jest.fn();

function TestComponent({ url }: { url: string }) {
  const { data, loading, error, fetchData } = useFetch({ url });

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(typeof data);
  return (
    <div>
      {loading && <span>Loading...</span>}
      {data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key}>
            {key}: {String(value)}
          </div>
        ))}

      {error && <span>Error</span>}
    </div>
  );
}

describe('useFetch', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and displays data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'Hello World' }),
    });
    render(<TestComponent url='/mock-api' />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    await screen.findByText(/Hello World/);
  });

  it('handles errors', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('Fetch error')
    );

    render(<TestComponent url='/mock-api' />);

    await screen.findByText(/Error/);
  });
});

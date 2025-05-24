import { useEffect, useReducer } from 'react';
import useFetch from './useFetch';
import RenderFieldRecursive from './RenderRecursive';
import dagFormReducer, { State, Action } from './dagFormReducer';

const Forms = () => {
  const { data, loading, error, fetchData } = useFetch({
    url: 'http://localhost:4000/api/v1/123/actions/blueprints/bp_456/graph',
  });

  const initialState: State = { forms: {} };

  const [state, dispatch] = useReducer(dagFormReducer, initialState);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      extractSection('nodes');
    }
  }, [data]);

  const extractSection = (sectionName: string) => {
    if (data && Object.keys(data).includes(sectionName)) {
      const section = Object.entries(data).find((x) => x[0] === sectionName);
      console.log(section?.[1]);
      if (section) {
        dispatch({ type: 'SET_FORMS', forms: section });
      }
    }
    console.log(state);
  };

  return (
    <div id='data-render'>
      {loading && <span>Loading...</span>}
      {error && <span>Error: {error}</span>}
      {state && <RenderFieldRecursive value={state} />}
    </div>
  );
};

export default Forms;

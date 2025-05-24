import { useEffect, useReducer } from 'react';
import useFetch from './useFetch';
import RenderFieldRecursive from './RenderRecursive';
import dagFormReducer, { State, Action } from './dagFormReducer';
import Form from './Form';

const FormsList = () => {
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
      const nodes = extractSection('nodes');
      if (nodes) {
        const forms = extractSection('forms');
        if (forms) {
          dispatch({
            type: 'SET_FORMS',
            nodes: nodes[1],
            formSchemas: forms[1],
          });
        }
      }
      console.log(state);
    }
  }, [data]);

  const extractSection = (sectionName: string) => {
    if (data && Object.keys(data).includes(sectionName)) {
      const section = Object.entries(data).find((x) => x[0] === sectionName);
      console.log(section?.[1]);
      if (section) {
        return section;
      }
      return null;
    }
  };

  return (
    <div id='data-render'>
      {loading && <span>Loading...</span>}
      {error && <span>Error: {error}</span>}
      {Object.values(state.forms).map((form) => (
        <Form key={form.id} form={form} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default FormsList;

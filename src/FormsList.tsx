import { useEffect, useReducer } from 'react';
import useFetch from './useFetch';
import dagFormReducer, { State } from './dagFormReducer';
import Form from './Form';

const FormsList = () => {
  const { data, loading, error, fetchData } = useFetch({
    url: 'http://localhost:4000/api/v1/123/actions/blueprints/bp_456/graph',
  });

  const initialState: State = { forms: {} };

  const [state, dispatch] = useReducer(dagFormReducer, initialState);

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
    }
    // disable lint error; if you add state or extractSection to dependencies, it causes continuous re-render loop due to function calls and
    // state set in useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div id='data-render'>
      {loading && <span>Loading...</span>}
      {error && <span>Error: {error}</span>}
      {Object.values(state.forms)
        .sort((a, b) => a.name.localeCompare(b.name)) // Just sort by name for our current purposes; better to sort by DAG order going forward
        .map((form) => (
          <Form key={form.id} form={form} dispatch={dispatch} />
        ))}
    </div>
  );
};

export default FormsList;

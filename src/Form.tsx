import React, { useEffect, useState } from 'react';
import { Action, FormState, State } from './dagFormReducer';
import PrefillConfigModal from './PrefillConfiguModal';

type FormProps = {
  form: FormState;
  state: State;
  dispatch: React.Dispatch<Action>;
};

const Form = ({ form, state, dispatch }: FormProps) => {
  const [showFields, setShowFields] = useState<boolean>(false);
  const [modalField, setModalField] = useState<string | null>(null);
  const [fields, setFields] = useState<{ [field: string]: string }>(() =>
    Object.fromEntries(
      Object.entries(form.fields).map(([fieldName, fieldData]) => [
        fieldName,
        typeof fieldData.value === 'string' ? fieldData.value : '',
      ])
    )
  );
  const handleChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleShowFields = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFields(!showFields);
  };

  const submitFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    for (const [field, value] of Object.entries(fields)) {
      if (typeof value === 'string') {
        dispatch({
          type: 'UPDATE_FIELD',
          formId: form.id,
          field,
          value,
        });
      }
    }
    console.log(state);
  };

  useEffect(() => {
    setFields(
      Object.fromEntries(
        Object.entries(form.fields).map(([fieldName, fieldData]) => [
          fieldName,
          typeof fieldData.value === 'string' ? fieldData.value : '',
        ])
      )
    );
  }, [form.prefillEnabled, form.fields]);

  return (
    <div className='form-node'>
      <div
        style={{ cursor: 'pointer', marginBottom: '10px' }}
        onClick={toggleShowFields}
      >
        {form.name}
      </div>
      <div style={{ display: `${form.name.includes('A') ? 'none' : ''} ` }}>
        {/* If this is the first form, we cannot prefill from any upstream forms */}
        <input
          style={{ position: 'relative', justifyContent: 'end' }}
          type='checkbox'
          checked={form.prefillEnabled}
          onChange={(e) => {
            e.preventDefault();
            dispatch({
              type: 'TOGGLE_PREFILL_FOR_FORM',
              formId: form.id,
              prefillEnabled: e.target.checked,
            });
          }}
        ></input>
        <label style={{ paddingLeft: '5px' }}>
          Prefill fields for this form
        </label>
      </div>
      {showFields ? (
        <>
          <form>
            {Object.entries(fields).map(([fieldName, fieldValue]) => {
              const sourceFormId = form.fields[fieldName].prefillSourceForm;
              const sourceFormName =
                sourceFormId && state.forms[sourceFormId]?.name;
              const sourceFieldName = form.fields[fieldName].prefillSourceField;

              const isPrefilled =
                form.prefillEnabled &&
                !!sourceFormId &&
                typeof form.fields[fieldName].value === 'string' &&
                (form.fields[fieldName].value as string).trim() !== '';
              return (
                <div
                  style={{
                    border: 'black',
                    borderRadius: '100px',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    margin: '10px',
                    padding: '5px',
                    backgroundColor: 'lightGray',
                    display: 'flex',
                  }}
                  key={fieldName}
                >
                  <label style={{ paddingRight: '5px' }}>{fieldName}</label>
                  <input
                    type='text'
                    value={fieldValue}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    disabled={form.prefillEnabled}
                  />
                  {isPrefilled && (
                    <div
                      style={{
                        fontSize: '0.8em',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                      }}
                    >
                      {sourceFormName}.{sourceFieldName}
                    </div>
                  )}
                  {form.prefillEnabled && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setModalField(fieldName);
                      }}
                      style={{ marginLeft: '10px', marginRight: '10px' }}
                    >
                      Configure
                    </button>
                  )}
                  {form.prefillEnabled && fieldValue !== '' && (
                    <button
                      style={{ borderRadius: '100px', marginLeft: '10px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch({
                          type: 'CLEAR_PREFILL_CONFIGURATION',
                          formId: form.id,
                          field: fieldName,
                        });
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })}
          </form>
          <button key={form.id} type='submit' onClick={submitFields}>
            Submit
          </button>
        </>
      ) : (
        <div></div>
      )}
      <PrefillConfigModal
        isOpen={modalField !== null}
        onClose={() => setModalField(null)}
        formId={form.id}
        fieldName={modalField ?? ''}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Form;

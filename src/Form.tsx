import React, { useState } from 'react';
import { Action, FormState } from './dagFormReducer';

type FormProps = {
  form: FormState;
  dispatch: React.Dispatch<Action>;
};

const Form = ({ form, dispatch }: FormProps) => {
  const [showFields, setShowFields] = useState<boolean>(false);
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
      console.log(form);
    }
  };
  console.log(fields);
  return (
    <div className='form-node'>
      <div style={{ cursor: 'pointer' }} onClick={toggleShowFields}>
        {form.name}
      </div>
      {showFields ? (
        <>
          <form>
            {Object.entries(fields).map(([fieldName, fieldValue]) => (
              <div key={String(fieldName)}>
                <label>{fieldName}</label>
                <input
                  type='text'
                  value={
                    typeof fieldValue === 'string'
                      ? fieldValue
                      : JSON.stringify(fieldValue)
                  }
                  onChange={(e) =>
                    handleChange(String(fieldName), e.target.value)
                  }
                />
              </div>
            ))}
          </form>
          {/* {Object.values(form.fields).map((field: FieldValue) => (
            <form key={field.fieldName}>
              <label>{field.fieldName}</label>
              <input
                type='text'
                value={fields[field.fieldName]}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    [field.fieldName]: e.target.value,
                  }))
                }
              />
            </form>
          ))} */}
          <button key={form.id} type='submit' onClick={submitFields}>
            Submit
          </button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Form;

import React, { useState } from 'react';
import { Action, FieldValue, FormState } from './dagFormReducer';

type FormProps = {
  form: FormState;
  dispatch: React.Dispatch<Action>;
};

const Form = ({ form, dispatch }: FormProps) => {
  const [showFields, setShowFields] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    e.preventDefault();
    const newValue = e.target.value;
    dispatch({
      type: 'UPDATE_FIELD',
      formId: form.id,
      field,
      value: newValue,
    });
    console.log(form.fields);
  };

  const toggleShowFields = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFields(!showFields);
  };

  return (
    <div className='form-node'>
      <div style={{ cursor: 'pointer' }} onClick={toggleShowFields}>
        {form.name}
      </div>
      {showFields ? (
        Object.values(form.fields).map((field: FieldValue) => (
          <div key={field.fieldName}>
            <label>{field.fieldName}</label>
            <input
              type='text'
              value={typeof field.value === 'string' ? field.value : ''}
              onChange={(e) => handleChange(e, field.fieldName)}
            />
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Form;

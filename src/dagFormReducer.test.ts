import dagFormReducer, { Action, State } from './dagFormReducer';

const mockInitialState: State = {
  forms: {
    'form-a': {
      id: 'form-a',
      name: 'Form A',
      componentId: 'component-1',
      prerequisites: [],
      prefillEnabled: false,
      fields: {
        name: {
          fieldName: 'name',
          value: '',
          prefillEnabled: false,
        },
      },
    },
  },
};

describe('dagFormReducer', () => {
  it('updates field value with UPDATE_FIELD', () => {
    const action: Action = {
      type: 'UPDATE_FIELD',
      formId: 'form-a',
      field: 'name',
      value: 'Ziggy',
    };

    const newState = dagFormReducer(mockInitialState, action);
    expect(newState.forms['form-a'].fields.name.value).toBe('Ziggy');
  });

  it('toggles prefillEnabled with TOGGLE_PREFILL_FOR_FORM', () => {
    const action: Action = {
      type: 'TOGGLE_PREFILL_FOR_FORM',
      formId: 'form-a',
      prefillEnabled: true,
    };

    const newState = dagFormReducer(mockInitialState, action);
    expect(newState.forms['form-a'].prefillEnabled).toBe(true);
  });

  it('configures prefill with CONFIGURE_PREFILL_FIELD', () => {
    const action: Action = {
      type: 'CONFIGURE_PREFILL_FIELD',
      formId: 'form-a',
      field: 'name',
      sourceFormId: 'form-x',
      sourceField: 'field-y',
      sourceValue: 'Maple',
    };

    const newState = dagFormReducer(mockInitialState, action);
    const field = newState.forms['form-a'].fields.name;
    expect(field.value).toBe('Maple');
    expect(field.prefillEnabled).toBe(true);
    expect(field.prefillSourceForm).toBe('form-x');
    expect(field.prefillSourceField).toBe('field-y');
  });

  it('clears prefill config with CLEAR_PREFILL_CONFIGURATION', () => {
    const prefilledState: State = {
      forms: {
        'form-a': {
          ...mockInitialState.forms['form-a'],
          fields: {
            name: {
              fieldName: 'name',
              value: 'Maple',
              prefillEnabled: true,
              prefillSourceForm: 'form-x',
            },
          },
        },
      },
    };

    const action: Action = {
      type: 'CLEAR_PREFILL_CONFIGURATION',
      formId: 'form-a',
      field: 'name',
    };

    const newState = dagFormReducer(prefilledState, action);
    const field = newState.forms['form-a'].fields.name;
    expect(field.value).toBe('');
    expect(field.prefillEnabled).toBe(false);
    expect(field.prefillSourceForm).toBeUndefined();
  });
});

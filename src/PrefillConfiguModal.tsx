import { createPortal } from 'react-dom';
import { Action, State } from './dagFormReducer';
import React from 'react';
import { getUpstreamForms } from './util';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  fieldName: string;
  state: State;
  dispatch: React.Dispatch<Action>;
};

const PrefillConfigModal = ({
  isOpen,
  onClose,
  formId,
  fieldName,
  state,
  dispatch,
}: Props) => {
  if (!isOpen) return null;

  const currentForm = state.forms[formId];
  const upstreamFormIds = getUpstreamForms(formId, state.forms);
  const options: { label: string; sourceFormId: string; value: string }[] = [];

  for (const [id, form] of Object.entries(state.forms)) {
    if (!upstreamFormIds.has(id)) continue;

    const field = form.fields[fieldName];
    if (field && typeof field.value === 'string') {
      options.push({
        label: `${form.name}: ${fieldName} -> "${field.value}"`,
        sourceFormId: id,
        value: field.value,
      });
    }
  }

  const handleSelect = (sourceFormId: string, value: string) => {
    console.log(value);
    if (state.forms[formId].prefillEnabled) {
      dispatch({
        type: 'CONFIGURE_PREFILL_FIELD',
        formId,
        field: fieldName,
        sourceFormId,
        sourceValue: value,
      });
    }

    console.log(state);
    onClose();
  };

  const handleClear = () => {
    dispatch({
      type: 'CLEAR_PREFILL_CONFIGURATION',
      formId,
      field: fieldName,
    });
    onClose();
  };

  return createPortal(
    <div className='modal-backdrop'>
      <div className='modal'>
        <h3 style={{ textAlign: 'center' }}>
          Configure Prefill for "{fieldName}"
        </h3>
        <ul>
          {options.length === 0 && (
            <li>No available values to prefill from.</li>
          )}
          {options.map((option) => (
            <li key={`${option.sourceFormId} ${option.label}`}>
              <button
                onClick={() => handleSelect(option.sourceFormId, option.value)}
              >
                Use {option.label}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleClear}>Clear Prefill</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default PrefillConfigModal;

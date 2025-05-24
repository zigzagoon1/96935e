
export type FormState = {
    fields: {
        [fieldName: string]: FieldValue;
    }
}

export type State = {
    forms: {
        [formId: string]: FormState;
    }
}

export type FieldValue = {
    fieldName: string;
    value: string | [] | {};
    prefillEnabled: boolean;
}

export type Action = 
    | {type: "SET_FORMS"; forms: Record<string, any> }
    | { type: "UPDATE_FIELD"; formId: string; field: string; value: string; }
    | { type: "RESET_FORM"; formId: string; }


const dagFormReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_FORMS': 
            return { ...state, 
                forms: action.forms,
             };
        case "UPDATE_FIELD":
            return state;
        case "RESET_FORM": 
            return state;
        default: 
            return state;
    }
}

export default dagFormReducer;
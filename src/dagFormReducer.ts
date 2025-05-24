import { stat } from "fs";

export type FormState = {
    id: string;
    name: string;
    componentId: string;
    prerequisites: string[];
    fields: {
        [fieldName: string]: FieldValue;
    }
    prefillEnabled: boolean;
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
    prefillSource?: string;
}

export type Action = 
    | {type: "SET_FORMS"; nodes: any[]; formSchemas: any[] }
    | { type: "UPDATE_FIELD"; formId: string; field: string; value: string; }
    | { type: "TOGGLE_PREFILL_FOR_FORM"; formId: string; prefillEnabled: boolean;}
    | { type: "CONFIGURE_PREFILL_FIELD"; formId: string; field: string; sourceFormId: string; sourceValue: string;}
    | { type: "RESET_FORM"; formId: string; }


const dagFormReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_FORMS': {
            const {nodes, formSchemas } = action;
            console.log(nodes);

            const schemaMap = Object.fromEntries(formSchemas.map((schema) => [schema.id, schema]));
            console.log(formSchemas);
            console.log(schemaMap);
            const formState: State['forms'] = {};

            for (const node of nodes) {
                const nodeId = node.id;
                const { name, component_id, prerequisites } = node.data;
                const schema = schemaMap[component_id];
                const fieldDefs = schema?.field_schema?.properties ?? {};

                const fields = Object.fromEntries(Object.entries(fieldDefs).map(([fieldName, _]) => [
                    fieldName, 
                    {
                        fieldName,
                        value: '',
                        prefillEnabled: false,
                    },
                ]));

                formState[nodeId] = {
                    id: nodeId,
                    name,
                    componentId: component_id,
                    prerequisites,
                    fields,
                    prefillEnabled: false
                }
            }
            return {
                ...state, forms: formState};
            }   
        case "UPDATE_FIELD": {
            const { formId, field, value } = action;
            const form = state.forms[formId];
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [formId]: {
                        ...form,
                        fields: {
                            ...form.fields,
                            [field]: {
                                ...form.fields[field],
                                value
                            }
                        }
                    }
                }
            };
        }
        case 'TOGGLE_PREFILL_FOR_FORM': {
            const { formId, prefillEnabled } = action;
            const form = state.forms[formId];
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [formId]: {
                        ...form,
                        prefillEnabled
                    }
                }
            }
        }
        case 'CONFIGURE_PREFILL_FIELD': {
            const { formId, field, sourceFormId, sourceValue } = action;
            const form = state.forms[formId];
            return {
                ...state,
                forms: {
                    ...state.forms,
                    [formId]: {
                        ...form,
                        fields: {
                            ...form.fields,
                            [field]: {
                                ...form.fields[field],
                                prefillEnabled: true,
                                prefillSource: sourceFormId,
                                value: sourceValue
                            }
                        }
                    }
                }
            }
        }
        case "RESET_FORM": {
            return state;
        }
        default: {
            return state;
        }
    }
}

export default dagFormReducer;
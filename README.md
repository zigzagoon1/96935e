# Code Challenge for Avantos

This project is for a code challenge for Avantos. It is made with Create React App and TypeScript.

To run the project locally after cloning, be sure to `npm install` to install dependencies. Then, navigate to the frontendchallengeserver folder in your terminal and run:

`npm start`

This starts the mock server. You can view the json data at localhost:4000. Then navigate to the 96935e directory and run:

`npm start`

This starts a development server to view the frontend in your browser. You can view the project at localhost:3000.

# Notes

Component hierarchy separates UI, reducer logic, and modal interactions.

This project demonstrates a DAG form setup where you can prefill fields in one form from the already-submitted values in upstream forms. Forms use basic UI; functionality was preferred due to time constraint. I know the UI in the explanation was a bit cleaner and less awkward, but the look and feel of UI can always be modified after functionality is created!

Clicking the form name (ie. Form A) shows the fields in that form. Although some of the fields of the form are different types (ie. Select/Options) in the json, we only display basic text input fields for each one in the form- this can be modified in future to check the schema definition and dynamically render the correct type based on "avantos_type". This would also allow for setting the type of inputs for fields like emails and passwords, name, address, etc. For now, the simple text was all the time I had.

You must enable the checkbox "Prefill fields for this form" in order to prefill fields. When enabled, a 'Configure' button appears next to each field on a form, which opens a modal to select which prefill data to use. An upstream form must have submitted data in order for it to appear as an option. Form state doesn't update until submitted.

Keep in mind that for this coding challenge, refreshing the page will clear the state of all of the forms. To do this I would have to write code to post and modify graph.json, but that is beyond the scope of this challenge.

# Understanding the Project

### dagFormReducer.ts

This file handles the reducer state and dispatch logic for controlling the current state of the forms, their fields, and their prefill configuration.

Type `State` stores the current state of all available forms in the project within an array.

Type `FormState` stores an individual forms' state with a reference to all of the fields within the form (which were read from graph.json and were contained in the form schema endpoint, found via component_id) and whether or not prefilling any fields from other submitted forms is enabled. When prefill is not enabled, the user can type their desired value into the field. Form A cannot enable prefill because it is the first form in the DAG and has no upstream form to prefill from. The user must type a value and submit the form in order for those field values to be available as options to prefill downstream form fields.
Form state also stores the name, ie. Form A, Form B, as well as that specific form's prerequisites. This was also taken from the json and defines the DAG order of forms. Forms can only prefill from upstream forms.

Type `FieldValue` stores the name and value of a field, if the field is using prefilled data, and the source form and source field name if it is using prefilled data. `FormState` contains an array of `FieldValue`'s for all of its fields.

To add new functionality to handling the forms state (such as a reset form, or reset all forms), you simply would add another `type` option to the type Action in dagFormReducer.ts. This type holds all the actions you can take to interact with the form, and defines which variables are required for each action. The dagFormReducer function then contains all the logic for each action, and can be extended by adding another case to the switch statement. Depending on the size of the project, this could get to be too much. In that case, extracting action handlers into separate functions and storing them in a map/dictionary of actions/handlers would be better.

### Form.tsx

This handles displaying the forms and fields, including any prefilled values and their source forms/fields.

### PrefillConfigModal.tsx

This handles the modal window for configuring prefill data for a field. The option to open the modal only shows if prefill is enabled. Normally I would create a modal window component that can serve multiple uses such as display error messages or other info, but that would have been unnecessary in this challenge.

## Patterns Used

- Reducer pattern (React's useReducer) for complex state transitions and handling
- Controlled components for form inputs allows live handling of user input for feedback on incorrect or invalid input
- DAG upstream traversal for prefilling downstream forms

## Tests

This project checks that data is properly fetched from the useFetch hook, and that useReducer logic is functioning correctly. The tests can easily be extended should complexity increase. If I had more time I would have added tests for the Form.tsx to ensure proper behavior and data display.

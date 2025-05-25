# Code Challenge for Avantos

This project is for a code challenge for Avantos. It is made with Create React App and TypeScript.

To run the project locally after cloning, be sure to `npm install` to install dependencies. Then, navigate to the frontendchallengeserver folder in your terminal and run:

`npm start`

This starts the mock server. You can view the json data at localhost:4000. Then navigate to the 96935e directory and run:

`npm start`

This starts a development server to view the frontend in your browser. You can view the project at localhost:3000.

This project demonstrates a DAG form setup where you can prefill fields in one form from the already-submitted values in upstream forms. Forms use basic UI.
Clicking the form name (ie. Form A) shows the fields in that form. Although some of the fields of the form are different types (ie. Select/Options), we only display basic text input fields for each one in the form. Clicking a field name opens a modal that allows you to configure which form it draws from to prefill that field.

You must enable the checkbox "Prefill fields for this form" in order to prefill fields.

Keep in mind that for this coding challenge, refreshing the page will clear the state of all of the forms. To do this I would have to write code to post and modify graph.json, but that is beyond the scope of this challenge.

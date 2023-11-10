# Build Instructions

Run `npm i` to install the node-modules
Run `npm start` to run the application, It should open the app at `http://localhost:3000`.

# Usage Instructions

1. Once the app is running, You should see a button named `Make Payment`.
2. Clicking on it should open the form to make the payment.
3. Type a valid email in the `To` field, Select `INR` or `USD` in the `From` dropdown, Type in an amount in the `Amout` field then at this point the `Submit` button should be enabled.
4. Clicking on `Submit` should show the loading button and an alert should pop up stating - `Payment Success!`

# What else I would have implemented had you more time to work on it?
1. I've used the default components from Material UI, So there was not much custom UI involved in this project.
2. Would've use tailwind/styled-components/css modules for customizing the CSS.
3. Inline validation for the Form fields, instead of doing it on submit.
4. Doc-blocks explaing the functions and the data flow.
5. More test cases, Example - test cases for form validations.

# List down all assumptions you made while designing/implementing
1. Based on the requirement, this would be a feature for making payments which would be one of the critical components in any application. 
2. Since we should restrict the user from clicking the Submit button multiple times to make a payment as it might initate multiple payments, we can either use a debounce fn or disable the button after the first click. To solve this problem, In this app i'm listening for the submit button click and showing a loader inside the submit button until the api returns a response.
3. Coming to the modularisation, Most of the logic is in a single component which is PaymentDialog.js, Rest of the components are mostly for the UI blocks which can be reused.
4. Component-Based Architecture: The application is organized into components, following the component-based architecture that React promotes. Components like PaymentDialog, PaymentForm, SnackbarProvider, etc., encapsulate their logic and present a clear structure.
5. Reusable Components: Components are designed to be reusable. For example, the SnackbarProvider can be reused throughout the application to handle notifications.
6. Context API: The useContext hook is used in the SnackbarProvider to manage global state (snackbar notifications) and provide it to descendant components via context.
7. Separation of Concerns: Components are organized into different directories based on their concerns (e.g., components, api, pages). This helps in maintaining a clear separation of concerns and makes the codebase more maintainable.

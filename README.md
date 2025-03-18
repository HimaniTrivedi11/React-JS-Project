<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it. -->

<!-- ## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

# Employee Time Tracking

This project is a React application designed for efficient employee time tracking, providing features for managing work hours, generating reports, and visualizing time data. It utilizes React Bootstrap for responsive and consistent UI components.

## Features

* User Authentication (Login/Logout)
* Time Entry (Start/Stop tracking, manual entries)
* Project/Task Assignment
* Data Visualization (Charts, Graphs)
* Report Export (PDF)
* Calendar View

## Technology Stack

* React
* React Bootstrap
* React Router DOM
* React Icons
* Chart.js & React Chart.js 2
* React Circular Progressbar
* React Calendar & FullCalendar
* Styled Components
* Font Awesome Icons
* React Datepicker & React Bootstrap Datepicker
* Axios
* html2pdf.js

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [your-repository-url]
    cd [your-project-directory]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    Or, if you prefer yarn:

    ```bash
    yarn install
    ```

3.  **Install specific libraries:**

    **Routing:**

    ```bash
    npm install react-router-dom
    ```

    **Icons:**

    ```bash
    npm install react-icons
    npm install @react-icons/fa @react-icons/fi @react-icons/fa6 @react-icons/md @react-icons/io
    ```

    **UI Components:**

    ```bash
    npm install react-bootstrap-icons
    npm i react-bootstrap
    npm i styled-components
    ```
    This project uses React Bootstrap for consistent and responsive styling.

    **Data Fetching:**

    ```bash
    npm install axios
    ```

    **Charting:**

    ```bash
    npm install chart.js react-chartjs-2
    npm install react-circular-progressbar
    ```

    **Calendar:**

    ```bash
    npm install react-calendar
    npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/core
    ```

    **Icons (SVG):**

    ```bash
    npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
    ```

    **Date Pickers:**

    ```bash
    npm i react-bootstrap-date-picker
    npm install react-datepicker
    ```

    **PDF Generation:**

    ```bash
    npm install html2pdf.js
    ```

    **Legacy Peer Dependencies (if using React 19):**

    ```bash
    npm install react-circular-progressbar --legacy-peer-deps
    ```

## Usage

1.  **Start the development server:**

    ```bash
    npm start
    ```

    Or, if you use yarn:

    ```bash
    yarn start
    ```

2.  **Open your browser:**

    Visit `http://localhost:3000` to view the application.

## Build

To build the project for production:

```bash
npm run build
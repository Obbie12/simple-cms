# Project Setup

## How to run the project

To run the project locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server, usually accessible at `http://localhost:5173`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This command compiles the project for production, outputting the build artifacts to the `dist` directory.

4.  **Preview Production Build:**
    ```bash
    npm run preview
    ```
    After building, you can preview the production build locally.

## Assumptions or notes

- This project uses React, TypeScript, Tailwind CSS, and Vite.
- State management is handled by Redux Toolkit.
- Routing is managed by React Router DOM.
- Form handling is done with Formik and Yup for validation.

### Hardcoded Login Credentials

For testing purposes, you can log in using the following hardcoded credentials:

-   **Username:** `admin`
-   **Password:** `password`

These credentials are for demonstration only and should not be used in a production environment.
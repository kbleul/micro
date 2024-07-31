# Next.js 14 Custom Dashboard Starter Template 👋

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Welcome to the Next.js 14 Custom Dashboard Starter Template! This template is designed to help you quickly set up and deploy a basic functional dashboard with a modern tech stack.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Features

- Pre-configured Libraries: Numerous libraries are already installed and configured, saving you setup time.
- UI Components: A variety of UI components using Rizz UI are available out of the box.
- Utility Functions: Handy utility functions to streamline your development process.
- Custom Hooks: Predefined custom hooks to enhance functionality and code reuse.
- Basic Dashboard Setup: Includes essential pages and features like:
  - Login Page
  - Forgot Login Page
  - Reset Password Page
  - Role-based Navigation with Dummy Admin Role
  - Side Navigation
  - Header Layouts
  - ...
- and more

## 🛠️ Main Technologies and Libraries used Used

Next.js 14: The core framework for building the dashboard.
Rizz UI: For a modern and flexible UI interface.
Tailwind CSS: For efficient and responsive styling.
Formik with Yup: For form handling and validation.
React Query: For powerful data fetching and state management.

## 📁 Project Structure

Here's a brief overview of the project structure:

- /src

  - /app
    - /auth (auth pages)
    - /main (main pages)
    - /access-denied (access denied pages)
    - /api (api setuip)
    - /components
      - /ui (small ui components eg badge, logo, modal, buttons, table ...)
      - /form (form components eg input, dropzone different types of input ...)
      - /organisms (bigger components eg breadcrumbs, StatCards, loaders, controlled table)
  - /constants (any constant data source)
  - /hooks (custom hooks)
  - /react query (react query setup and configuration)

- /types (contains major types)
- /utils (contains a list of functions)

- /components: Contains reusable UI components.
- /hooks: Custom hooks to manage logic and state.
- /pages: Next.js pages including login, forgot password, and dashboard pages.
- /styles: Tailwind CSS configurations and global styles.
- /utils: Utility functions and helper files.
- /config: Configuration files and constants.

### How to use the template

1.  Add a custom logo imae for your project, currently image 403.svg is used in multiple places as a place holder for the logo image
2.  Configure tailwind.config.tsx file according to your design requirments
3.  Add a .env file with your auth api in the variable NEXT_PUBLIC_BACKEND_URL
4.  Cahnge or update the login and route handling based on how you handle roles, an example working setup is aleady available but may need to change according to api design

---

#### End

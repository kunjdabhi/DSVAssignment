# User Management System

A React-based user management application built with TypeScript, Vite, and Material UI.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the Backend (Mock DB)**
    ```bash
    npx json-server --watch db.json --port 3001
    ```

3.  **Start the Frontend**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## How to Add New Fields

 The form is designed to be extensible. To add a new field, you only need to modify the schema configuration.

1.  **Open** `src/types/user.type.ts`.
2.  **Update the `User` type** definition to include your new field.
3.  **Add a config object** to the `userFormSchema` array.

**Example:**

```typescript
// 1. Add to User type
export type User = {
  // ... existing fields
  gender?: string; // New field
};

// 2. Add to schema
export const userFormSchema: FieldConfig<User>[] = [
  // ... existing fields
  {
    name: "gender",
    label: "Gender",
    type: "radio", // Supported types: text, email, tel, date, radio, checkbox, options
    width: 12,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
];
```

The `UserForm` component will automatically render the appropriate input based on the `type` you specify.

## Design Decisions

*   **Material UI**: Used for a polished, consistent look with pre-built components (Grid, TextField, etc.).
*   **Dynamic Form Rendering**: The form inputs are generated from a central schema (`userFormSchema`). This avoids code duplication and makes adding new fields strictly a configuration task rather than a UI coding task.
*   **JSON Server**: Used to mock a REST API for user CRUD operations, allowing the frontend to function effectively during development.

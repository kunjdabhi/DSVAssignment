import { type GridColDef } from "@mui/x-data-grid";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type FieldType = "email" | "tel" | "text" | "options" | "checkbox" | "date";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  pattern?: RegExp;
  width?: number;
}

export const userFormSchema: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    width: 12,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    width: 12,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    required: true,
    pattern: /^[0-9]{10}$/,
    width: 12,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    width: 12,
  },
];


export const userGridDefs: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 200 },
  { field: "lastName", headerName: "Last name", width: 200 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "phoneNumber", headerName: "Phone", width: 250 },
];
export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
};

type FieldType = "email" | "tel" | "text" | "options" | "checkbox" | "date";

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
  pattern?: RegExp;
  width?: number;
}

export const userFormSchema: FieldConfig<User>[] = [
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
    name: "emailAddress",
    label: "Email Address",
    type: "email",
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
    width: 12,
  },
];

import { userFormSchema, type User } from "../types/user.type";

export type ValidationErrors = Record<string, string>;

export const validateUser = (values: User): ValidationErrors => {
  const errors: ValidationErrors = {};

  userFormSchema.forEach((field) => {
    const value = values[field.name as keyof User];

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required`;
      return;
    } else if (field.required && value){
      errors[field.name] = ``;
    }

    if (field.pattern && value && !field.pattern.test(value.toString())) {
      errors[field.name] = `Invalid ${field.label}`;
    }
  });

  return errors;
};

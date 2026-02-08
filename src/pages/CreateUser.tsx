import { useEffect, useState, type ChangeEvent } from "react";
import { Typography, Stack } from "@mui/material";
import { UserForm } from "../components/UserForm";
import type { User } from "../types/user.type";
import { validateUser, type ValidationErrors } from "../utils/validateUserForm";
import { userService } from "../services/users.service";
import { useNavigate, useSearchParams } from "react-router-dom";

export const CreateUser = ({ showSnackbar }: any) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<User>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors(validateUser({ ...formValues, [e.target.name]: e.target.value }));
    console.log(errors)
  };

  useEffect(() => {
    var ignore = false;
    async function fetchUserById(id: number | string) {
      try {
        const user = await userService.getBy(id);
        console.log(user);
        if (user) {
          if (!ignore) {
            setFormValues(user[0]);
          }
        }
      } catch (ex: any) {
        showSnackbar(ex.message, "error");
      }
    }
    if (isUpdate && id) {
      fetchUserById(id);
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  const onSubmit = async (e: SubmitEvent) => {
    try {
      e.preventDefault();
      const validations = validateUser(formValues);
      const hasErrors = Object.values(validations).some(
        (value) => value && value.trim().length > 0,
      );

      if (hasErrors) {
        setErrors(validations);
        return;
      }
      if (isUpdate) {
        await userService.update(formValues);
        showSnackbar("User Updated successfully", "success");
      } else {
        await userService.create(formValues);
        showSnackbar("User created successfully", "success");
      }
    } catch (ex: any) {
      showSnackbar(ex.message, "error");
    }
    navigate("/");
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{isUpdate ? "Update User" : "Create User"}</Typography>
      <UserForm
        values={formValues}
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Stack>
  );
};

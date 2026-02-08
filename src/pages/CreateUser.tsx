import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Typography, Stack, Backdrop, CircularProgress } from "@mui/material";
import { UserForm } from "../components/UserForm";
import type { User } from "../types/user.type";
import { userFormSchema } from "../types/user.type";
import { validateUser, type ValidationErrors } from "../utils/validateUserForm";
import { userService } from "../services/users.service";
import { useNavigate, useSearchParams } from "react-router-dom";

type CreateUserProps = {
  showSnackbar: (message: string, severity: "success" | "error" | "info") => void
}

export const CreateUser = ({ showSnackbar }: CreateUserProps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<User>(() => {
    const initialValues: any = {};
    userFormSchema.forEach((field) => {
      initialValues[field.name] = "";
    });
    return initialValues as User;
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors(validateUser({ ...formValues, [e.target.name]: e.target.value }));
    console.log(errors)
  };

  useEffect(() => {
    var ignore = false;
    async function fetchUserById(id: number | string) {
      try {
        setLoading(true);
        const user = await userService.getBy(id);
        console.log(user);
        if (user) {
          if (!ignore) {
            setFormValues(user[0]);
          }
        }
      } catch (ex: any) {
        showSnackbar(ex.message, "error");
      } finally {
        setLoading(false);
      }
    }
    if (isUpdate && id) {
      fetchUserById(id);
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  const onSubmit = async (e: FormEvent) => {
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
      setLoading(true);
      if (isUpdate) {
        await userService.update(formValues);
        showSnackbar("User Updated successfully", "success");
      } else {
        await userService.create(formValues);
        showSnackbar("User created successfully", "success");
      }
      navigate("/");
    } catch (ex: any) {
      showSnackbar(ex.message, "error");
    } finally {
        setLoading(false);
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <Stack spacing={2}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

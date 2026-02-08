import { TextField, Button, Stack, Checkbox, FormControlLabel, MenuItem, RadioGroup, Radio, FormLabel, FormControl } from "@mui/material";
import Grid from "@mui/material/Grid";
import {userFormSchema} from "../types/user.type"
import type { User } from "../types/user.type";
import type { ValidationErrors } from "../utils/validateUserForm";
import type { ChangeEvent, FormEvent } from "react";

type UserFormProps = {
  values: User;
  errors: ValidationErrors;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

export const UserForm = ({ values, errors, onChange, onSubmit, onCancel }: UserFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {userFormSchema.map((field) => (
        <Grid size={{ xs: 12, md: field.width || 12 }} key={field.name}>
            {(() => {
              switch (field.type) {
                case "radio":
                  return (
                    <FormControl fullWidth>
                      <FormLabel>{field.label}</FormLabel>
                      <RadioGroup
                        row
                        name={field.name as string}
                        value={values[field.name] || ""}
                        onChange={onChange}
                      >
                       {field.options?.map((option: any) => (
                         <FormControlLabel
                           key={option.value}
                           value={option.value}
                           control={<Radio />}
                           label={option.label}
                         />
                       ))}
                      </RadioGroup>
                    </FormControl>
                  );
                case "checkbox":
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(values[field.name])}
                          onChange={onChange}
                        />
                      }
                      label={field.label}
                    />
                  );
                case "options":
                  return (
                    <TextField
                      fullWidth
                      select
                      name={field.name as string}
                      label={field.label}
                      value={values[field.name] || ""}
                      error={errors && Boolean(errors[field.name])}
                      helperText={errors && errors[field.name]}
                      onChange={onChange}
                    >
                      {field.options?.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                case "date":
                  return (
                    <TextField
                      fullWidth
                      type="date"
                      name={field.name as string}
                      label={field.label}
                      value={values[field.name] || ""}
                      error={errors && Boolean(errors[field.name])}
                      helperText={errors && errors[field.name]}
                      onChange={onChange}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  );
                default:
                  return (
                    <TextField
                      fullWidth
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      value={values[field.name] || ""}
                      error={errors && Boolean(errors[field.name])}
                      helperText={errors && errors[field.name]}
                      onChange={onChange}
                    />
                  );
              }
            })()}
          </Grid>
        ))}

        <Stack direction={"row"} spacing={3}>
          <Button type="submit" variant="contained">
            Save User
          </Button>
          <Button onClick={onCancel} variant="contained" >
            Cancel
          </Button>
        </Stack>
      </Grid>
    </form>
  )
}

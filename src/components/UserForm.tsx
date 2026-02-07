import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import {userFormSchema} from "../types/user.type"


export const UserForm = ({ values, errors, onChange, onSubmit }: any) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {userFormSchema.map((field) => (
        <Grid size={{ xs: 12, md: field.width || 12 }} key={field.name}>
            <TextField
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type}
              value={values[field.name] || ""}
              required={field.required}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              onChange={onChange}
            />
          </Grid>
        ))}

        <Grid size={{ xs: 6 }}>
          <Button type="submit" variant="contained">
            Save User
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

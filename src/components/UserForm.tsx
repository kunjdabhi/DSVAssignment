import { TextField, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import {userFormSchema} from "../types/user.type"


export const UserForm = ({ values, errors, onChange, onSubmit, onCancel }: any) => {
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
              error={errors && Boolean(errors[field.name])}
              helperText={errors && errors[field.name]}
              onChange={onChange}
            />
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

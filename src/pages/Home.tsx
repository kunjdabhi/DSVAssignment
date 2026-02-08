import { Button, Typography, Stack } from "@mui/material";
import { UserGrid } from "../components/UserGrid";
import { Link } from "react-router-dom";

export const Home = ({showSnackbar}:any) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">User Management</Typography>
        <Link to={"/createUser"}>
          <Button className="add-user" variant="contained">
            Create User
          </Button>
        </Link>
      </Stack>
      <UserGrid showSnackbar={showSnackbar} />
    </Stack>
  );
};

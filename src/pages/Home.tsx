import { Button, Typography, Stack } from "@mui/material";
import { UserGrid } from "../components/UserGrid";
import { Link } from "react-router-dom";

type ShowSnackbar = (message: string, severity: "success" | "error" | "info") => void;

export const Home = ({showSnackbar}: {showSnackbar: ShowSnackbar}) => {
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

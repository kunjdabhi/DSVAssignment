import { Button } from "@mui/material";
import { UserGrid } from "../components/UserGrid";
import { Link } from "react-router-dom";

export const Home = ({showSnackbar}:any) => {
  return (
    <div>
      <Link to={"/createUser"}>
        <Button className="add-user" variant="contained">
          Create User
        </Button>
      </Link>
      <UserGrid showSnackbar={showSnackbar} />
    </div>
  );
};

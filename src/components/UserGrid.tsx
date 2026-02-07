import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { userService } from "../services/users.service";
import type { User } from "../types/user.type";
import { userGridDefs } from "../types/user.type";


const paginationModel = { page: 0, pageSize: 10 };

export const UserGrid = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    var ignore = false;
    async function fetchUsers() {
      const data = await userService.getAll();
      if (!ignore) {
        setUsers(data);
      }
    }

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={userGridDefs}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

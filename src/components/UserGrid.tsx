import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import { userService } from "../services/users.service";
import type { User } from "../types/user.type";
import { GridActionColumn } from "./GridActionColumn";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export const UserGrid = ({showSnackbar}:any) => {
  const [users, setUsers] = useState<User[]>([]);

  const userGridDefs: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", flex: 1 },
    { field: "lastName", headerName: "Last name", flex: 1 },
    { field: "emailAddress", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => <GridActionColumn params={params} handleDelete={handleDelete} handleEdit={handleEdit} />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const fetchUsers = useCallback(async () => {
    try{
        const data = await userService.getAll();
        setUsers(data);
    } catch(ex:any){
        showSnackbar(ex.message, "error")
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/createUser?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const deleteUser = confirm("Are you sure ?");
    if (deleteUser) {
      await userService.delete(id);
      fetchUsers()
      showSnackbar("User deleted successfully", "success")
    }
  };

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

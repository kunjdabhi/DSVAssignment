import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const GridActionColumn = ({ params, handleEdit, handleDelete }: any) => {
  
  return (
    <>
      <IconButton size="small" onClick={() => handleEdit(params.row.id)}>
        <EditIcon />
      </IconButton>

      <IconButton
        size="small"
        color="error"
        onClick={() => handleDelete(params.row.id)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};
import IconButton from "@mui/material/IconButton";

export const GridActionColumn = ({ params, handleEdit, handleDelete }: any) => {
  
  return (
    <>
      <IconButton size="small" onClick={() => handleEdit(params.row.id)}>
        <span>Edit</span>
      </IconButton>

      <IconButton
        size="small"
        color="error"
        onClick={() => handleDelete(params.row.id)}
      >
        <span>Delete</span>
      </IconButton>
    </>
  );
};

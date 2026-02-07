import Button from "@mui/material/Button"
import { UserGrid } from "./components/UserGrid"

function App() {

  return (
    <>
      <Button className="add-user" variant="contained">
            Create User
      </Button>
      <UserGrid />
    </>
  )
}

export default App

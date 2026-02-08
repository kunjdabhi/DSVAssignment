import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CreateUser } from "./pages/CreateUser"
import { Alert, Snackbar, Container } from "@mui/material"
import { useState } from "react";

function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <>
    <BrowserRouter>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route index element={<Home showSnackbar={showSnackbar} />} />
          <Route path="/createUser" element={<CreateUser showSnackbar={showSnackbar} />} />
          <Route path="/updateUser" element={<CreateUser showSnackbar={showSnackbar} />} />
        </Routes>
      </Container>
    </BrowserRouter>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App

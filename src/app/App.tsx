import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  const logoutHandler = () => logout();

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <>
        <ErrorSnackbar />
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <AddTaskIcon />
            </IconButton>
            <Typography variant="h6" sx={{marginLeft: 3}}><b>Task planner</b></Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </>
    </BrowserRouter>
  );
}

export default App;

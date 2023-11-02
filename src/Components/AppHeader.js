import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer";

const AppHeader = ({ user, setUser }) => {
  let navigate = useNavigate();
  console.log(user);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
            Annotate-It
          </Typography>
          {user && (
            <Button
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
                toast.success("Successfully logged out");
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {user && <ResponsiveDrawer />}
    </>
  );
};

export default AppHeader;

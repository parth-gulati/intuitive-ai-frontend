import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Pages/Login";
import { Box, Container, Typography } from "@mui/material";
import styled from "styled-components";
import AppHeader from "./Components/AppHeader";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Unauthorised from "./Pages/Unauthorised";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserContext, { UserProvider } from "./Components/UserContext";
import { useContext, useEffect, useState } from "react";
import ResponsiveDrawer from "./Components/ResponsiveDrawer";
import Home from "./Pages/Home";
import UploadImage from "./Pages/UploadImage";
import ViewImage from "./Pages/ViewImage";
import ViewAllImages from "./Pages/ViewAllImages";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  //real authentication with jWT not included, but can be extended - left for later
  const { user, setUser } = useContext(UserContext);
  const [image, selectImage] = useState(null);
  console.log(setUser);
  console.log(user);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppHeader user={user} setUser={setUser} />

      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path={"/"} element={<Login user={user} setUser={setUser} />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user} redirectPath="/">
                {<Home />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-image"
            element={
              <ProtectedRoute user={user} redirectPath="/">
                {<UploadImage selectImage={selectImage} />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-image"
            element={
              <ProtectedRoute user={user} redirectPath="/">
                {<ViewImage selectImage={selectImage} image={image} />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/all"
            element={
              <ProtectedRoute user={user} redirectPath="/">
                {<ViewAllImages selectImage={selectImage} />}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Unauthorised />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

export default App;

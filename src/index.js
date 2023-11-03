import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Components/UserContext";
import { registerLicense } from "@syncfusion/ej2-base";

const licenseKey =
  "ORg4AjUWIQA/Gnt2VlhhQlJCfV5AQmFWfFN0RnNYdV5zflVEcC0sT3RfQF5iSH5QdkdmWHxZd3xcQw==";

registerLicense(licenseKey);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);

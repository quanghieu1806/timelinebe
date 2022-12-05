import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// import {GoogleAuthProvider} from "./components/context/GoogleAuthContext"
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId =
  "1040584853647-fc7vghvfpdjnilc9bi39nt3ltes56el8.apps.googleusercontent.com";
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import initAuth from "./auth.js";
import ErrorPage from "./components/ErrorPage.jsx";
import AuthContext from "./AuthContext.js";
import RequestedCollabContext from "./RequestedCollabContext.js";

import Home, { getLoader as collabLoader } from "./routes/home";
import JobListRoute, { getLoader as jobListLoader, submitJob } from "./routes/jobs";
import JobDetailRoute, { getLoader as jobLoader, actionOnJob } from "./routes/job-detail";
import ProjectListRoute, { getLoader as projectListLoader } from "./routes/projects";
import { updateProject } from "./routes/project-detail";

// Define routes

function getRouter(keycloak) {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      loader: collabLoader(keycloak),
    },
    {
      path: "/:collabId/jobs/",
      element: <JobListRoute />,
      errorElement: <ErrorPage />,
      loader: jobListLoader(keycloak),
      action: submitJob(keycloak),
    },
    {
      path: "/:collabId/jobs/:jobId",
      element: <JobDetailRoute />,
      errorElement: <ErrorPage />,
      loader: jobLoader(keycloak),
      action: actionOnJob(keycloak),
    },
    {
      path: "/:collabId/projects/",
      element: <ProjectListRoute />,
      errorElement: <ErrorPage />,
      loader: projectListLoader(keycloak),
      action: updateProject(keycloak),
    },
  ]);
}

// Define theme

const theme = createTheme({
  typography: {
    h2: {
      fontSize: "1.6rem",
    },
    h3: {
      fontSize: "1.3rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
  },
  palette: {
    primary: {
      main: green[700],
    },
    background: {
      default: "#f7f7f7",
    },
  },
});

// Authenticate, then render the app

function renderApp(auth) {
  const params = new URL(document.location).searchParams;
  const requestedCollabId = params.get("clb-collab-id");

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContext.Provider value={auth}>
          <RequestedCollabContext.Provider value={requestedCollabId}>
            <RouterProvider router={getRouter(auth)} />
          </RequestedCollabContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

window.addEventListener("DOMContentLoaded", () => initAuth(renderApp));

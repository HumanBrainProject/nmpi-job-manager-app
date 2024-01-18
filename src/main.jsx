import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Keycloak from "keycloak-js";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

import { authServer, authClientId } from "./globals";
import ErrorPage from "./components/ErrorPage.jsx";
import AuthContext from "./AuthContext.js";
import RequestedCollabContext from "./RequestedCollabContext.js";
//import initAuth from "./auth.js_";

import Home, { getLoader as collabLoader } from "./routes/home";
import JobListRoute, {
  getLoader as jobListLoader,
  submitJob,
} from "./routes/jobs";
import JobDetailRoute, {
  getLoader as jobLoader,
  submitComment,
} from "./routes/job-detail";
import ProjectListRoute, {
  getLoader as projectListLoader,
} from "./routes/projects";
import { updateProject } from "./routes/project-detail";

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
      action: submitComment(keycloak),
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

// function renderApp(auth) {
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <AuthContext.Provider value={auth}>
//           <RouterProvider router={router} />
//         </AuthContext.Provider>
//       </ThemeProvider>
//     </React.StrictMode>
//   );
// }

const keycloak = new Keycloak({
  url: `${authServer}/auth`,
  realm: "hbp",
  clientId: authClientId,
});
const SCOPES = "openid team collab.drive group roles";

try {
  const authenticated = await keycloak.init({
    onLoad: "login-required",
    //scope: SCOPES,
  });
  console.log(
    `User is ${authenticated ? "authenticated" : "not authenticated"}`
  );
  if (authenticated) {
    console.log(keycloak.token);
    console.log(keycloak.tokenParsed);
    console.log(keycloak.refreshTokenParsed);
  }
} catch (error) {
  console.error("Failed to initialize adapter:", error);
}

const params = new URL(document.location).searchParams;
const requestedCollabId = params.get("clb-collab-id");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={keycloak}>
        <RequestedCollabContext.Provider value={requestedCollabId}>
          <RouterProvider router={getRouter(keycloak)} />
        </RequestedCollabContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

//window.addEventListener("DOMContentLoaded", () => initAuth(renderApp));
//window.addEventListener('DOMContentLoaded', () => renderApp(null));

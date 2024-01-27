import React from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import { queryProjects } from "../datastore";
import ProjectList from "../components/projects/ProjectList";
import Toolbar from "../components/general/Toolbar";
import ProgressIndicator from "../components/general/ProgressIndicator";
import ErrorInDataLoading from "../components/general/ErrorInDataLoading";

export function getLoader(auth) {
  const loader = async ({ params }) => {
    const projectListPromise = queryProjects([params.collabId], auth);
    return defer({ projects: projectListPromise });
  };
  return loader;
}

function ProjectListRoute() {
  const data = useLoaderData();
  let { collabId } = useParams();

  return (
    <div>
      <Toolbar page="projects" collab={collabId} />
      <main>
        <Container maxWidth="xl">
          <div id="project-list">
            <React.Suspense fallback={<ProgressIndicator />}>
              <Await resolve={data.projects} errorElement={<ErrorInDataLoading />}>
                {(projects) => <ProjectList projects={projects} collab={collabId} />}
              </Await>
            </React.Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default ProjectListRoute;

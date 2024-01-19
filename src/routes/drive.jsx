import React from "react";

import { Await, defer, useLoaderData, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import Toolbar from "../components/Toolbar";
import ProgressIndicator from "../components/ProgressIndicator";
import ErrorInDataLoading from "../components/ErrorInDataLoading";
import FileBrowser from "../components/FileBrowser";
import { driveServer } from "../globals";

function getRequestConfig(auth) {
  let config = {
    headers: {
      Authorization: "Bearer " + auth.token,
      "Content-Type": "application/json",
    },
  };
  return config;
}

async function getCollabRepo(collabId, auth) {
  const url = driveServer + "/api2/repos/?type=group";
  const response = await fetch(url, getRequestConfig(auth));
  const repos = await response.json();
  const repo = repos.filter((r) => r.name === collabId);
  return repo[0];
}

async function getRepoContents(repoId, path, auth) {
  let url = driveServer + "/api2/repos/" + repoId + "/dir/";
  if (path) {
    url += "?p=" + path;
  }
  const response = await fetch(url, getRequestConfig(auth));
  const contents = await response.json();
  for (const index in contents) {
    contents[index].path = path;
  }
  return contents;
}

export function getLoader(auth) {
  const loader = async ({ params }) => {
    const repo = await getCollabRepo(params.collabId, auth);
    console.log(repo); // todo: cache this
    const path = params["*"];
    const contentsPromise = getRepoContents(repo.id, path, auth);
    return defer({ contents: contentsPromise });
  };
  return loader;
}

export function DriveRoute(props) {
  const data = useLoaderData();
  const params = useParams();
  const collabId = params.collabId;
  const path = params["*"];
  console.log(params);

  return (
    <div>
      <Toolbar page="drive" collab={collabId} />
      <main>
        <Container maxWidth="xl">
          <div id="job-list">
            <React.Suspense fallback={<ProgressIndicator />}>
              <Await resolve={data.contents} errorElement={<ErrorInDataLoading />}>
                {(contents) => <FileBrowser contents={contents} collab={collabId} path={path} />}
              </Await>
            </React.Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default DriveRoute;

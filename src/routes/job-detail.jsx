import React from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import { getJob, createComment, changeRepository } from "../datastore";
import Toolbar from "../components/general/Toolbar";
import JobDetail from "../components/job-detail/JobDetail";
import ProgressIndicator from "../components/general/ProgressIndicator";

//import Navigation from "../components/Navigation";

export function getLoader(auth) {
  const loader = async ({ params }) => {
    const jobPromise = await getJob(params.jobId, params.collabId, auth);
    return defer({ job: jobPromise });
  };
  return loader;
}

function submitComment(request, jobId, commentData, auth) {
  if (request.method === "POST") {
    return createComment(jobId, commentData, auth);
  } else {
    throw new Error("unexpected request method");
  }
}

function copyOutputData(request, collabId, jobId, targetRepository, auth) {
  if (request.method === "PUT") {
    return changeRepository(collabId, jobId, targetRepository, auth);
  } else {
    throw new Error("unexpected request method");
  }
}

export function actionOnJob(auth) {
  const wrappedActionOnJob = async ({ request, params }) => {
    const { collabId, jobId } = params;
    const actionData = await request.json();

    if (actionData.comment) {
      return submitComment(request, jobId, actionData.comment, auth);
    }
    if (actionData.targetRepository) {
      return copyOutputData(request, collabId, jobId, actionData.targetRepository, auth);
    }
    return "whatever";
  };
  return wrappedActionOnJob;
}

function JobDetailRoute() {
  const data = useLoaderData();
  let { collabId } = useParams();

  return (
    <div>
      <Toolbar page="job-detail" collab={collabId} />
      <main>
        <Container maxWidth="xl">
          <div id="job">
            <React.Suspense fallback={<ProgressIndicator />}>
              <Await resolve={data.job} errorElement={<p>Error loading job.</p>}>
                {(job) => <JobDetail job={job} collab={collabId} />}
              </Await>
            </React.Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default JobDetailRoute;

import React from "react";
import { Await, useLoaderData, useParams, redirect } from "react-router-dom";

import { Container } from "@mui/material";

import { createJob } from "../datastore";
import Toolbar from "../components/Toolbar";
import CreateJobForm from "../components/CreateJobForm";
import ProgressIndicator from "../components/ProgressIndicator";

function submitJob(auth) {
  const wrappedSubmitJob = async ({ request, params }) => {
    const { collabId } = params;
    const jobData = await request.json();
    if (request.method === "POST") {
      const response = await createJob(collabId, jobData, auth);
      return redirect(`/${collabId}/jobs/`);
    } else {
      throw new Error("unexpected request method");
    }
  };
  return wrappedSubmitJob;
}

function JobCreationRoute(props) {
  let { collabId } = useParams();

  return (
    <div>
      <Toolbar page="create" collab={collabId} />
      <main>
        <Container maxWidth="xl">
          <div id="create-job-form">
            <CreateJobForm collab={collabId} />
          </div>
        </Container>
      </main>
    </div>
  );
}

function JobEditAndResubmitRoute() {
  const data = useLoaderData();
  let { collabId } = useParams();

  return (
    <div>
      <Toolbar page="create" collab={collabId} />
      <main>
        <Container maxWidth="xl">
          <div id="edit-and-resubmit-job-form">
            <React.Suspense fallback={<ProgressIndicator />}>
              <Await resolve={data.job} errorElement={<p>Error loading job.</p>}>
                {(job) => <CreateJobForm collab={collabId} initialData={job} />}
              </Await>
            </React.Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

export { JobCreationRoute, JobEditAndResubmitRoute, submitJob };

import React from "react";
import { Await, defer, useLoaderData, useParams, Link } from "react-router-dom";

import { Container } from "@mui/material";

import { getJob, createComment } from "../datastore";
import Toolbar from "../components/Toolbar";
import JobDetail from "../components/JobDetail";
import ProgressIndicator from "../components/ProgressIndicator";

//import Navigation from "../components/Navigation";

export function getLoader(auth) {
  const loader = async ({ params }) => {
    const jobPromise = await getJob(params.jobId, params.collabId, auth);
    return defer({ job: jobPromise });
  };
  return loader;
}

export function submitComment(auth) {
  const wrappedSubmitComment = async ({ request, params }) => {
    const { collabId, jobId } = params;
    console.log(request);
    const commentData = await request.json();

    console.log(`collab = ${collabId} job = ${jobId}`);
    console.log(commentData);
    // if (request.method === "PUT") {
    //   throw new Error("Not yet implemented")
    // } else
    if (request.method === "POST") {
      return createComment(jobId, commentData, auth);
    } //else if (request.method === "DELETE") {
    //   throw new Error("Not yet implemented")
    // } else {
    //   throw new Error("unexpected request method");
    // }
    return "whatever";
  };
  return wrappedSubmitComment;
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
              <Await
                resolve={data.job}
                errorElement={<p>Error loading job.</p>}
              >
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

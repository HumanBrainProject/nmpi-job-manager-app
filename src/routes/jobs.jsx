import React from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";

import { Container } from "@mui/material";

import { queryJobs, queryTags, createJob } from "../datastore";
import { INITIAL_JOBS } from "../globals";
import JobList from "../components/JobList";
import Toolbar from "../components/Toolbar";
import ProgressIndicator from "../components/ProgressIndicator";
import ErrorInDataLoading from "../components/ErrorInDataLoading";

export function getLoader(auth) {
  const loader = async ({ request, params }) => {
    const url = new URL(request.url);
    const requestedSize = parseInt(url.searchParams.get("size") || INITIAL_JOBS.toString());
    const jobListPromise = queryJobs(params.collabId, auth, requestedSize);
    const tagsPromise = queryTags(params.collabId, auth);
    return defer({ data: Promise.all([jobListPromise, tagsPromise]) });
  };
  return loader;
}

export function submitJob(auth) {
  const wrappedSubmitJob = async ({ request, params }) => {
    const { collabId } = params;
    const jobData = await request.json();
    if (request.method === "POST") {
      return createJob(collabId, jobData, auth);
    } else {
      throw new Error("unexpected request method");
    }
  };
  return wrappedSubmitJob;
}

function JobListRoute(props) {
  const { data } = useLoaderData();
  let { collabId } = useParams();

  return (
    <div>
      <Toolbar page="jobs" collab={collabId} />
      <main>
        <Container maxWidth="xl">
          <div id="job-list">
            <React.Suspense fallback={<ProgressIndicator />}>
              <Await resolve={data} errorElement={<ErrorInDataLoading />}>
                {([jobs, tags]) => <JobList jobs={jobs} tags={tags} collab={collabId} />}
              </Await>
            </React.Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default JobListRoute;

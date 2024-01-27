import { Suspense, useContext, useEffect } from "react";
import { Await, defer, useLoaderData, useNavigate, redirect } from "react-router-dom";

import { Container } from "@mui/material";

import { listCollabs } from "../datastore";
import Toolbar from "../components/Toolbar";
import ProgressIndicator from "../components/ProgressIndicator";
import Introduction from "../components/Introduction";
import CollabList from "../components/CollabList";
import ErrorInDataLoading from "../components/ErrorInDataLoading";
import { RequestedCollabContext } from "../context";

export function getLoader(auth) {
  const loader = async () => {
    const params = new URL(document.location).searchParams;
    const requestedCollabId = params.get("clb-collab-id");
    if (requestedCollabId) {
      return redirect(`/${requestedCollabId}/jobs/`);
    } else {
      const collabListPromise = listCollabs(auth);
      return defer({ collabs: collabListPromise });
    }
  };
  return loader;
}

function Home(props) {
  const data = useLoaderData();
  const navigate = useNavigate();
  const requestedCollabId = useContext(RequestedCollabContext);

  useEffect(() => {
    if (requestedCollabId) {
      navigate(`/${requestedCollabId}/jobs/`);
    }
  }, [requestedCollabId]);

  return (
    <div>
      <Toolbar page="home" />
      <main>
        <Container maxWidth="xl">
          <div id="home">
            <Introduction />
            <Suspense fallback={<ProgressIndicator />}>
              <Await resolve={data.collabs} errorElement={<ErrorInDataLoading />}>
                {(collabs) => <CollabList collabs={collabs} />}
              </Await>
            </Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Home;

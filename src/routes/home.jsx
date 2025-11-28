import { Suspense, useContext, useEffect } from "react";
import { Await, defer, useLoaderData, useNavigate, redirect } from "react-router-dom";

import { Container } from "@mui/material";

import { listCollabs } from "../datastore";
import Toolbar from "../components/general/Toolbar";
import ProgressIndicator from "../components/general/ProgressIndicator";
import Introduction from "../components/home/Introduction";
import CollabList from "../components/home/CollabList";
import ErrorInDataLoading from "../components/general/ErrorInDataLoading";
import { RequestedCollabContext, StatusContext } from "../context";
import StatusWarning from "../components/general/StatusWarning";

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

function Home() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const requestedCollabId = useContext(RequestedCollabContext);
  const serverStatus = useContext(StatusContext);

  useEffect(() => {
    if (requestedCollabId) {
      navigate(`/${requestedCollabId}/jobs/`);
    }
  }, [requestedCollabId, navigate]);

  return (
    <div>
      <Toolbar page="home" />
      <main>
        <Container maxWidth="xl">
          <div id="home">
            <Introduction />
            {serverStatus != "ok" ? <StatusWarning status={serverStatus} /> : ""}
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

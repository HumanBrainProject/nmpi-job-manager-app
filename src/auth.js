import Keycloak from "keycloak-js";

import { authServer, authClientId } from "./globals";

const keycloak = new Keycloak({
  url: `${authServer}/auth`,
  realm: "hbp",
  clientId: authClientId,
});

const AUTH_MESSAGE = "clb.authenticated";

export default function initAuth(main) {
  console.log("DOM content is loaded, initialising Keycloak client...");
  const isParent = window.opener == null;
  const isIframe = window !== window.parent;
  const isFramedApp = isIframe && isParent;

  let config = {};
  if (isFramedApp) {
    config.flow = "implicit";
    // with standard flow, we get a "Timeout when waiting for 3rd party check iframe message"
    // error when embedded as a Collaboratory app
  }
  keycloak
    .init(config)
    .then(() => checkAuth(main))
    .catch(console.log);
}

function checkAuth(main) {
  console.log("Keycloak client is initialised, verifying authentication...");

  // Is the user anonymous or authenticated?
  const isAuthenticated = keycloak.authenticated;
  const isAnonymous = !keycloak.authenticated;
  // Is this app a standalone app, a framed app or a delegate?
  const isParent = window.opener == null;
  const isIframe = window !== window.parent;
  const isMainFrame = window === window.parent;
  const isStandaloneApp = isMainFrame && isParent;
  const isFramedApp = isIframe && isParent;
  const isDelegate = window.opener != null;
  // Posting and listening to messages
  const postMessageToParentTab = (message, parentTabOrigin) =>
    window.opener.postMessage(message, parentTabOrigin);
  const listenToMessage = (callback) => window.addEventListener("message", callback);
  const myAppOrigin = window.location.origin;
  // Manipulating URLs and tabs
  const openTab = (url) => window.open(url);
  const getCurrentURL = () => new URL(window.location);
  const closeCurrentTab = () => window.close();

  // A standalone app should simply login if the user is not authenticated
  // and do its business logic otherwise
  if (isStandaloneApp) {
    console.log("This is a standalone app...");
    if (isAnonymous) {
      console.log("...which is not authenticated, starting login...");
      return keycloak.login();
    }
    if (isAuthenticated) {
      console.log("...which is authenticated, starting app with authentication");
      return main(keycloak);
    }
  }

  // A framed app should open a delegate to do the authentication for it and listen to its messages and verify them
  // If the user is authenticated, it should do its business logic
  if (isFramedApp) {
    console.log("This is a framed app...");
    if (isAnonymous) {
      console.log("...which is not authenticated, delegating to new tab...");
      listenToMessage(verifyMessage);
      return openTab(getCurrentURL());
    }
    if (isAuthenticated) {
      console.log("...which is authenticated, starting business logic...");
      return main(keycloak);
    }
  }

  // A delegate should login if the user is not authenticated
  // Otherwise, it should inform its opener that the user is authenticated and close itself
  if (isDelegate) {
    console.log("This is a delegate tab...");
    if (isAnonymous) {
      console.log("...which is not authenticated, starting login...");
      return keycloak.login();
    }
    if (isAuthenticated) {
      console.log("...which is authenticated, warn parent and close...");
      postMessageToParentTab(AUTH_MESSAGE, myAppOrigin);
      return closeCurrentTab();
    }
  }
}

function verifyMessage(event) {
  console.log("Message received, verifying it...");

  const receivedMessage = event.data;
  const messageOrigin = event.origin;
  const myAppOrigin = window.location.origin;

  // Stop if the message is not the auth message
  if (receivedMessage !== AUTH_MESSAGE) return;

  // Stop if the message is not coming from our app origin
  if (messageOrigin !== myAppOrigin) return;

  // Login otherwise
  return keycloak.login();
}

import { createContext } from "react";

const AuthContext = createContext(null);

const JobCreationContext = createContext({
  currentJob: {},
  setCurrentJob: () => {},
  newJobDialogOpen: false,
  setNewJobDialogOpen: () => {},
});

const RequestedCollabContext = createContext(null);

export { AuthContext, JobCreationContext, RequestedCollabContext };

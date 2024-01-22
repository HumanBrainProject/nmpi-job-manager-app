import { createContext } from "react";

const JobCreationContext = createContext({
  currentJob: {},
  setCurrentJob: () => {},
  newJobDialogOpen: false,
  setNewJobDialogOpen: () => {},
});

export default JobCreationContext;

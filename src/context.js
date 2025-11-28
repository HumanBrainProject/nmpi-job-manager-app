import { createContext } from "react";

const AuthContext = createContext(null);

const RequestedCollabContext = createContext(null);

const StatusContext = createContext("ok");

export { AuthContext, RequestedCollabContext, StatusContext };

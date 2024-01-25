import { useEffect, useState, useContext } from "react";

import { driveServer } from "../globals";
import { AuthContext } from "../context";
import FileBrowser from "./FileBrowser";

function getRequestConfig(auth) {
  let config = {
    headers: {
      Authorization: "Bearer " + auth.token,
      "Content-Type": "application/json",
    },
  };
  return config;
}

async function getCollabRepo(collabId, auth) {
  const url = driveServer + "/api2/repos/?type=group";
  const response = await fetch(url, getRequestConfig(auth));
  const repos = await response.json();
  const repo = repos.filter((r) => r.group_name.startsWith(`collab-${collabId}-`));
  return repo[0];
}

async function getRepoContents(repoId, path, auth) {
  let url = driveServer + "/api2/repos/" + repoId + "/dir/";
  if (path) {
    url += "?p=" + path;
  }
  const response = await fetch(url, getRequestConfig(auth));
  const contents = await response.json();
  for (const index in contents) {
    contents[index].path = path;
  }
  return contents;
}

function DriveBrowser(props) {
  const [contents, setContents] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const repo = await getCollabRepo(props.collab, auth);
      setContents(await getRepoContents(repo.id, path, auth));
      setLoading(false);
    }
    fetchData();
  }, [props.collab, path]);

  // todo: only show .py, .tar, .tar.gz, .tgz, .zip files

  return (
    <FileBrowser
      contents={contents}
      path={path}
      onChangePath={setPath}
      selected={props.value}
      onSetSelected={props.onChange}
      height={props.height}
      loading={loading}
    />
  );
}

export default DriveBrowser;

import { useState, useEffect } from "react";
import { useSubmit } from "react-router-dom";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { FolderOpen as FolderOpenIcon } from "@mui/icons-material";
import Panel from "./Panel";

function CopyButtons(props) {
  const submit = useSubmit();
  const [copying, setCopying] = useState(false);

  const handleCopy = (destination) => {
    setCopying(true);
    const repositoryData = {
      targetRepository: destination,
    };
    submit(repositoryData, {
      method: "put",
      encType: "application/json",
      action: `/${props.collab}/jobs/${props.jobId}`,
      navigate: true,
    });
  };

  useEffect(() => {
    setCopying(false);
  }, [props.currentRepository]);

  let progressIndicator = "";
  if (copying) {
    progressIndicator = <CircularProgress size={20} />;
  }

  if (props.currentRepository.includes("temporary")) {
    return (
      <Stack direction="row" spacing={1} sx={{ paddingTop: 2 }}>
        <Button
          size="small"
          variant="contained"
          disabled={copying}
          onClick={() => handleCopy("EBRAINS Drive")}
        >
          Copy to Drive
        </Button>
        <Button
          size="small"
          variant="contained"
          disabled={copying}
          onClick={() => handleCopy("EBRAINS Bucket")}
        >
          Copy to Bucket
        </Button>
        {progressIndicator}
      </Stack>
    );
  }
}

function FilesPanel(props) {
  if (props.dataset) {
    return (
      <Panel
        label={props.label}
        icon={<FolderOpenIcon color="disabled" sx={{ mr: 1 }} />}
        defaultExpanded={true}
      >
        <Typography variant="body2">{props.dataset.repository}</Typography>
        <ul>
          {props.dataset.files.map((file) => (
            <li key={file.path}>
              <a href={file.url} target="_blank">
                {file.path}
              </a>
              &nbsp;
              {file.content_type} - {file.size} bytes - {file.hash}
            </li>
          ))}
        </ul>
        <CopyButtons
          currentRepository={props.dataset.repository}
          collab={props.collab}
          jobId={props.jobId}
        />
      </Panel>
    );
  } else {
    return "";
  }
}
export default FilesPanel;

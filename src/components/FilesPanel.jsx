import { useState, useEffect } from "react";
import { useSubmit } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import Panel from "./Panel";

function removePrefixFromPath(prefix, path) {
  return path.slice(prefix.length);
}

function formatContentType(contentType) {
  if (contentType) {
    return (
      <Typography variant="body2" color="gray" sx={{ lineHeight: "24px" }}>
        {contentType}
      </Typography>
    );
  } else {
    return "";
  }
}

function formatFileSize(size) {
  if (size) {
    if (size < 1024) {
      return (
        <Typography variant="body2" color="gray" sx={{ lineHeight: "24px" }}>
          {size} bytes
        </Typography>
      );
    } else {
      return (
        <Typography variant="body2" color="gray" sx={{ lineHeight: "24px" }}>
          {(size / 1024).toFixed(1)} KiB
        </Typography>
      );
    }
  } else {
    return "";
  }
}

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
        <Typography variant="body2" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          {props.dataset.repository}
        </Typography>
        <Stack direction="row" spacing={1}>
          {props.dataset.files.map((file) => (
            <Card key={file.path} sx={{ paddingTop: 1, backgroundColor: "#f8f8f8" }}>
              <CardContent sx={{ minHeight: "40px" }}>
                <Stack direction="row" spacing={1}>
                  <FileIcon color="disabled" />
                  <Link href={file.url} target="_blank">
                    {removePrefixFromPath(`/${props.collab}`, file.path)}
                  </Link>
                  {formatContentType(file.content_type)}
                  {formatFileSize(file.size)}
                  <Tooltip title={`digest: ${file.hash}`}>
                    <InfoIcon color="info" />
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
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

import { useEffect, useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { guessContentType } from "../../utils";

const MAX_TEXT_SIZE_FOR_DISPLAY = 10000;

async function getContent(url) {
  let response = null;
  try {
    response = await fetch(url);
  } catch {
    return "Unable to retrieve file contents";
  }
  if (response.ok) {
    const rawContent = await response.blob();
    if (rawContent) {
      return rawContent.text();
    } else {
      return "Unable to display file contents";
    }
  } else {
    console.log("Couldn't get file content");
    return "Unable to retrieve file contents";
  }
}

async function getSize(url) {
  const response = await fetch(url, { method: "HEAD" });
  if (response.ok) {
    console.log(response.headers);
    return response.headers.get("content-length");
  } else {
    return null;
  }
}

function Preview(props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData(url, contentType, size) {
      if (!contentType) {
        contentType = guessContentType(url);
      }
      if (contentType.startsWith("image")) {
        setContent(<img src={url} />);
      } else if (contentType === "text/plain") {
        if (size === null || size === undefined) {
          size = await getSize(url);
        }
        if (size !== null && size <= MAX_TEXT_SIZE_FOR_DISPLAY) {
          const content2 = await getContent(url);
          setContent(
            <Box paddingTop={2}>
              <pre
                style={{
                  fontSize: "12px",
                  overflow: "auto",
                  paddingBottom: "12px",
                }}
              >
                {content2}
              </pre>
            </Box>
          );
        } else {
          setContent(
            <Box padding={3}>
              File is too large for preview, or else file size cannot be determined
            </Box>
          );
        }
      }
    }
    if (props.url && props.open) {
      fetchData(props.url, props.content_type, props.size);
    }
  }, [props.url, props.content_type, props.open, props.size]);

  const handleClose = () => {
    props.onClose();
    setContent("");
  };

  return (
    <Dialog open={props.open} onClose={handleClose} maxWidth="xl" fullWidth={false}>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "gray",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}

export default Preview;

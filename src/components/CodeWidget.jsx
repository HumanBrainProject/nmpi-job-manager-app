import { useEffect, useState } from "react";
import { Box, IconButton, Tab, TextField, Tooltip, Typography } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";

import Editor from "@monaco-editor/react";

import DriveBrowser from "./DriveBrowser.jsx";

const MINIMUM_EDITOR_HEIGHT = 40;
const EDITOR_HEIGHT_INCREMENT = 40;

function validURL(value) {
  return value.startsWith("http"); // todo: use a regex
}

function getPathFromDriveURI(uri, collab) {
  if (uri.startsWith("drive:")) {
    const prefix = `drive://${collab}`;
    return uri.substring(prefix.length + 1);
  } else if (uri.length > 0) {
    console.warn("Expected 'drive:' URL, got " + uri);
  }
  return uri;
}

function EditorSizeButtons({ currentHeight, setHeight }) {
  let buttons = [
    <Tooltip key="larger-editor-button" title="Increase editor size">
      <IconButton onClick={() => setHeight(currentHeight + EDITOR_HEIGHT_INCREMENT)}>
        <ExpandMoreIcon />
      </IconButton>
    </Tooltip>,
  ];
  if (currentHeight > MINIMUM_EDITOR_HEIGHT) {
    buttons.unshift(
      <Tooltip key="smaller-editor-button" title="Decrease editor size">
        <IconButton
          onClick={() =>
            setHeight(Math.max(currentHeight - EDITOR_HEIGHT_INCREMENT, MINIMUM_EDITOR_HEIGHT))
          }
        >
          <ExpandLessIcon />
        </IconButton>
      </Tooltip>
    );
  }
  return <Box sx={{ margin: 2, display: "flex", justifyContent: "right" }}>{buttons}</Box>;
}

function CodeWidget(props) {
  const [currentTab, setCurrentTab] = useState(props.initialTab);
  const [codeFromEditor, setCodeFromEditor] = useState("");
  const [codeURL, setCodeURL] = useState("");
  const [codeFromDrive, setCodeFromDrive] = useState("");
  const [editorHeight, setEditorHeight] = useState(MINIMUM_EDITOR_HEIGHT);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeCodeURL = (event) => {
    setCodeURL(event.target.value);
    if (validURL(event.target.value)) {
      props.onChange(event.target.value);
    }
  };

  const handleChangeEditorContent = (value) => {
    setCodeFromEditor(value);
    props.onChange(value);
  };

  const handleChangeDrivePath = (value) => {
    setCodeFromDrive(value);
    props.onChange(`drive://${props.collab}/${value}`);
  };

  useEffect(() => {
    if (props.initialTab === "editor") {
      setCodeFromEditor(props.code || "");
    } else if (props.initialTab === "from-url") {
      setCodeURL(props.code || "");
    } else if (props.initialTab === "drive") {
      setCodeFromDrive(getPathFromDriveURI(props.code, props.collab) || "");
    }
    setCurrentTab(props.initialTab);
  }, [props.initialTab, props.code, props.collab]);

  return (
    <Box
      sx={{
        border: "thin lightgray solid",
        borderRadius: 1,
        marginLeft: 1,
        marginTop: 2,
        marginBottom: 3,
      }}
    >
      <TabContext value={currentTab}>
        <TabList
          onChange={handleChangeTab}
          aria-label="source code format options"
          sx={{ border: "thin lightgray solid" }}
        >
          <Tab label="Editor" value="editor" id="tab-code-editor" />
          <Tab label="From Git repository or zip archive" value="from-url" id="tab-code-url" />
          <Tab label="From Drive" value="drive" id="tab-drive" />
        </TabList>
        <TabPanel value="editor">
          <Editor
            height={`${editorHeight}vh`}
            onChange={handleChangeEditorContent}
            defaultLanguage="python"
            value={codeFromEditor}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
          <EditorSizeButtons currentHeight={editorHeight} setHeight={setEditorHeight} />
        </TabPanel>
        <TabPanel value="from-url">
          <TextField
            id="code-location-url"
            label="URL"
            placeholder="https://github.com/<my_account>/<my_repository>.git"
            helperText="Please enter the URL of a version control repository or downloadable zip archive"
            error={codeURL.length === 0 || validURL(codeURL) ? false : true}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={codeURL}
            onChange={handleChangeCodeURL}
          />
        </TabPanel>
        <TabPanel value="drive">
          <DriveBrowser
            collab={props.collab}
            height="40vh"
            value={codeFromDrive}
            onChange={handleChangeDrivePath}
          />
          <Typography variant="caption" color="gray">
            Click on the icon of the file or folder containing the code you would like to run.
          </Typography>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default CodeWidget;

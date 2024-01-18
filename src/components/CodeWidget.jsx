import { useState } from "react";
import { Box, Tab, TextField } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

import Editor from "@monaco-editor/react";

function validURL(value) {
  return value.startsWith("http"); // todo: use a regex
}

function CodeWidget(props) {
  const [currentTab, setCurrentTab] = useState(props.initialTab);
  const [codeFromEditor, setCodeFromEditor] = useState(
    props.initialTab === "editor" ? props.code : ""
  );
  const [codeURL, setCodeURL] = useState(
    props.initialTab === "from-url" ? props.code : ""
  );

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
          <Tab
            label="From Git repository or zip archive"
            value="from-url"
            id="tab-code-url"
          />
        </TabList>
        <TabPanel value="editor">
          <Editor
            height="40vh"
            onChange={handleChangeEditorContent}
            defaultLanguage="python"
            defaultValue={codeFromEditor}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
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
      </TabContext>
    </Box>
  );
}

export default CodeWidget;

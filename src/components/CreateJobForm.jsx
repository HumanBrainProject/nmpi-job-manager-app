import { useState, useEffect } from "react";
import { useSubmit } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { hw_options } from "../globals.js";
import CodeWidget from "./CodeWidget.jsx";
import BrainScaleSConfig from "./BrainScaleSConfig.jsx";
import SpiNNakerConfig from "./SpiNNakerConfig.jsx";

function CreateJobForm(props) {
  const [hardware, setHardware] = useState("");
  const [code, setCode] = useState("");
  const [command, setCommand] = useState("");
  const [hardwareConfig, setHardwareConfig] = useState({});
  const [tags, setTags] = useState([]);
  const submit = useSubmit();

  useEffect(() => {
    if (props.initialData) {
      setHardware(props.initialData.hardware_platform);
      setCode(props.initialData.code);
      setCommand(props.initialData.command);
      setHardwareConfig(props.initialData.hardware_config || {});
      setTags(props.initialData.tags);
    }
  }, [props.initialData]);

  const getHardwareConfig = (hardwareName) => {
    if (hardwareName === "SpiNNaker") {
      return <SpiNNakerConfig config={hardwareConfig} onChange={setHardwareConfig} />;
    } else if (hardwareName === "BrainScaleS") {
      return <BrainScaleSConfig config={hardwareConfig} onChange={setHardwareConfig} />;
    } else {
      return "";
    }
  };

  const handleTags = (event) => {
    let string = event.target.value;
    // split on comma, semi-colon
    let array = string.split(/[,;]+/);
    setTags(array);
  };

  const cleanupTags = () => {
    setTags(tags.map((item) => item.trim()).filter((item) => item.length > 0));
  };

  const handleSubmit = (event) => {
    const newJob = {
      hardware_platform: hardware,
      code: code,
      command: command,
      hardware_config: hardwareConfig,
      // remove extraneous whitespace and empty tags
      //tags: tags.map((item) => item.trim()).filter((item) => item.length > 0),
      tags,
      collab: props.collab,
    };
    submit(newJob, {
      method: "post",
      encType: "application/json",
      action: `/${props.collab}/jobs/new`,
      navigate: true,
    });
  };

  const getInitialTab = (code) => {
    if (code.startsWith("http")) {
      return "from-url";
    } else if (code.startsWith("drive")) {
      return "drive";
    } else {
      return "editor";
    }
  };

  return (
    <Box
      component="form"
      sx={{
        marginBottom: 6,
        "& .MuiTextField-root": { margin: 1 },
      }}
    >
      <Typography variant="h2" sx={{ mt: 3 }}>
        New job
      </Typography>
      {/* Hardware */}
      <FormControl sx={{ margin: 1, marginTop: 2 }}>
        <InputLabel id="hardware-select">Hardware</InputLabel>
        <Select
          labelId="hardware-select"
          id="hardware-select"
          label="Hardware"
          value={hardware}
          onChange={(event) => setHardware(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {hw_options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Please choose a simulation platform</FormHelperText>
      </FormControl>

      {/* Code */}
      <CodeWidget
        initialTab={getInitialTab(code)}
        code={code}
        onChange={(value) => setCode(value)}
        collab={props.collab}
      />

      {/* Command */}
      <TextField
        id="command-field"
        label="Command"
        helperText="Optional: specify the path to the main Python script, with any command-line arguments."
        fullWidth
        variant="outlined"
        value={command}
        onChange={(event) => setCommand(event.target.value)}
      />

      {/* Hardware config */}
      {getHardwareConfig(hardware)}

      {/* Tags */}
      <TextField
        id="tag"
        label="Tags"
        placeholder="tag1,tag2;this is tag3"
        helperText="Please type job tags, separated by a comma. Tags can have spaces."
        fullWidth
        variant="outlined"
        value={tags.join(",")}
        onChange={handleTags}
        onBlur={cleanupTags}
      />

      <Box sx={{ margin: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default CreateJobForm;

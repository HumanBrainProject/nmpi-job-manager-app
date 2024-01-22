import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { hw_options } from "../globals";
import CodeWidget from "./CodeWidget";
import BrainScaleSConfig from "./BrainScaleSConfig";
import SpiNNakerConfig from "./SpiNNakerConfig";
import JobCreationContext from "../JobCreationContext.js";

function CreateJobDialog(props) {
  const { currentJob, setCurrentJob, newJobDialogOpen, setNewJobDialogOpen } =
    useContext(JobCreationContext);

  const [hardware, setHardware] = useState("");
  const [code, setCode] = useState("");
  const [command, setCommand] = useState("");
  const [hardwareConfig, setHardwareConfig] = useState({});
  const [tags, setTags] = useState([]);

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
    };
    props.onClose(newJob);
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

  useEffect(() => {
    setHardware(currentJob.hardware_platform || "");
    setCode(currentJob.code || "");
    setCommand(currentJob.command || "");
    setHardwareConfig(currentJob.hardware_config || {});
    setTags(currentJob.tags || []);
  }, [currentJob]);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth={true} maxWidth="lg">
      <DialogTitle>New job</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { margin: 1 },
          }}
        >
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose(null)}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateJobDialog;

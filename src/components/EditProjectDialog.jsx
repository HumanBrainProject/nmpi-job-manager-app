import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import QuotaSelector from "./QuotaSelector";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function EditProjectDialog({ project, open, onClose, mode }) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [bssQuota, setBssQuota] = useState(0);
  const [bss2Quota, setBss2Quota] = useState(0);
  const [spikeyQuota, setSpikeyQuota] = useState(0);
  const [spinnQuota, setSpinnQuota] = useState(0);
  const [demoQuota, setDemoQuota] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (project) {
      setTitle(project.title || "");
      setAbstract(project.abstract || "");
      if (project.description) {
        console.log(project.description);
        const quotas = JSON.parse(project.description).requestedQuotas;
        if ("BrainScaleS" in quotas) {
          setBssQuota(quotas.BrainScaleS);
        }
        if ("BrainScaleS-2" in quotas) {
          setBss2Quota(quotas["BrainScaleS-2"]);
        }
        if ("Spikey" in quotas) {
          setSpikeyQuota(quotas.Spikey);
        }
        if ("SpiNNaker" in quotas) {
          setSpinnQuota(quotas.SpiNNaker);
        }
        if ("Demo" in quotas) {
          setBssQuota(quotas.Demo);
        }
      }
    }
  }, [project]);

  const handleSaveChanges = () => {
    if (title.length === 0) {
      setErrors({ ...errors, ...{ title: "The title is required" } });
    } else {
      const projectUpdate = {
        id: project.id,
        title: title,
        abstract: abstract,
        description: "",
        status: "in preparation",
      };
      const requestedQuotas = {};
      if (bssQuota) {
        requestedQuotas.BrainScaleS = bssQuota;
      }
      if (bss2Quota) {
        requestedQuotas["BrainScaleS-2"] = bss2Quota;
      }
      if (spikeyQuota) {
        requestedQuotas.Spikey = spikeyQuota;
      }
      if (spinnQuota) {
        requestedQuotas.SpiNNaker = spinnQuota;
      }
      if (demoQuota) {
        requestedQuotas.Demo = demoQuota;
      }
      if (Object.keys(requestedQuotas).length !== 0) {
        projectUpdate.description = JSON.stringify({
          requestedQuotas: requestedQuotas,
        });
      }
      onClose(projectUpdate);
    }
  };

  if (!project) {
    return "";
  }

  return (
    <Dialog onClose={() => onClose(null)} open={open}>
      <DialogTitle>{capitalizeFirstLetter(mode)} quota request</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { margin: 1 },
          }}
        >
          <TextField
            id="project-title-field"
            label="Title:"
            error={Boolean(errors.title)}
            helperText={
              errors.title ||
              "The title should summarize the scientific or education goals of your project"
            }
            fullWidth
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            id="project-abstract-field"
            label="Abstract:"
            helperText="Briefly explain the aims of your project"
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            value={abstract}
            onChange={(event) => setAbstract(event.target.value)}
          />
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Select the hardware systems you wish to use.
            </Typography>
            <FormGroup>
              <QuotaSelector
                label="BrainScaleS"
                quota={bssQuota}
                setQuota={setBssQuota}
              />
              <QuotaSelector
                label="BrainScaleS-2"
                quota={bss2Quota}
                setQuota={setBss2Quota}
              />
              <QuotaSelector
                label="Spikey"
                quota={spikeyQuota}
                setQuota={setSpikeyQuota}
              />
              <QuotaSelector
                label="SpiNNaker"
                quota={spinnQuota}
                setQuota={setSpinnQuota}
              />
              <QuotaSelector
                label="Demo"
                quota={demoQuota}
                setQuota={setDemoQuota}
              />
            </FormGroup>
            <Typography variant="caption" color="grey">
              The suggested quotas are for testing purposes, you may request
              larger quotas if needed.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button type="submit" onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProjectDialog;

import { useState, Fragment } from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const RESOURCE_USAGE_UNITS = {
  BrainScaleS: "wafer-hours",
  "BrainScaleS-2": "chip-hours",
  SpiNNaker: "core-hours",
  Spikey: "hours",
  Demo: "hours",
};

const DEMO_QUOTA_SIZES = {
  BrainScaleS: 0.1,
  "BrainScaleS-2": 1.0,
  SpiNNaker: 5000.0,
  Spikey: 1.0,
  Demo: 1.0,
};

function QuotaField(props) {
  if (props.quota) {
    return (
      <Fragment>
        <TextField
          id="project-quota-bss"
          variant="outlined"
          size="small"
          sx={{ width: "6rem" }}
          placeholder={DEMO_QUOTA_SIZES[props.label].toString()}
          value={props.quota}
          width={1}
          onChange={(event) => {
            props.setQuota(event.target.value);
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2">
            {RESOURCE_USAGE_UNITS[props.label]}
          </Typography>
        </Box>
      </Fragment>
    );
  } else {
    return "";
  }
}

function QuotaSelector(props) {
  const toggleQuota = (event) => {
    if (props.quota) {
      props.setQuota(0);
    } else {
      props.setQuota(DEMO_QUOTA_SIZES[props.label]);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <Box width="6rem" sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">{props.label}</Typography>
      </Box>
      <Checkbox checked={Boolean(props.quota)} onChange={toggleQuota} />
      <QuotaField {...props}></QuotaField>
    </Stack>
  );
}

export default QuotaSelector;

import { Chip } from "@mui/material";

function StatusChip(props) {
  const colours = {
    finished: "success",
    error: "error",
    running: "warning",
    submitted: "info",
  };

  return (
    <Chip label={props.status} size="small" color={colours[props.status]} />
  );
}

export default StatusChip;

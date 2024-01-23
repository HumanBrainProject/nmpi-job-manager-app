import { useEffect, useState, Fragment } from "react";
import { Link, useRevalidator } from "react-router-dom";

import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  RestartAlt as RestartIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Archive as ArchiveIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";

import StatusChip from "./StatusChip";

import { DELTA_JOBS } from "../globals";
import { jobIsIncomplete, timeFormat } from "../utils";

function filterJobs(jobs, statusFilter, hardwareFilter, tagFilter) {
  function hasStatus(job) {
    return job.status === statusFilter;
  }
  function hasHardware(job) {
    return job.hardware_platform === hardwareFilter;
  }
  function hasTag(job) {
    return job.tags.includes(tagFilter);
  }
  let filteredJobs = [...jobs];
  if (statusFilter !== "") {
    filteredJobs = filteredJobs.filter(hasStatus);
  }
  if (hardwareFilter !== "") {
    filteredJobs = filteredJobs.filter(hasHardware);
  }
  if (tagFilter !== "") {
    filteredJobs = filteredJobs.filter(hasTag);
  }
  return filteredJobs;
}

function formatCode(code) {
  const style = { display: "inline-flex", verticalAlign: "middle", color: "lightgray" };
  let icon = <CodeIcon sx={style} />;
  if (code.includes("github")) {
    icon = <GitHubIcon sx={style} />;
  } else if (code.startsWith("http")) {
    icon = <ArchiveIcon sx={style} />;
  } else if (code.startsWith("collab:")) {
    icon = <FolderIcon sx={style} />;
  } else if (code.startsWith("drive:")) {
    icon = <FolderIcon sx={style} />;
  }

  const MAX_LENGTH = 60;

  let codeSnippet = code.trim().replaceAll("\n", "⏎");
  if (codeSnippet.length > MAX_LENGTH) {
    codeSnippet = codeSnippet.slice(0, MAX_LENGTH) + "…";
  }
  return (
    <span>
      {icon}&nbsp;&nbsp;
      <code>{codeSnippet}</code>
    </span>
  );
}

function LinkedTableCell(props) {
  return (
    <TableCell align={props.align} sx={{ paddingLeft: "6px", paddingRight: "6px" }}>
      <Link to={props.to} style={{ textDecoration: "none", color: "inherit" }}>
        <div>{props.children}</div>
      </Link>
    </TableCell>
  );
}

function JobList(props) {
  let [filteredJobs, setFilteredJobs] = useState(props.jobs);
  let [statusFilter, setStatusFilter] = useState("");
  let [hardwareFilter, setHardwareFilter] = useState("");
  let [tagFilter, setTagFilter] = useState("");
  let revalidator = useRevalidator();

  useEffect(() => {
    const incompleteJobs = props.jobs.filter((job) => jobIsIncomplete(job));
    if (incompleteJobs.length > 0 && revalidator.state === "idle") {
      console.log(
        "There are submitted or running jobs, page will refresh every 5 seconds until all jobs are complete"
      );
      const intervalID = setInterval(() => {
        if (revalidator.state === "idle") {
          revalidator.revalidate();
        }
      }, 5000);
      return () => clearInterval(intervalID);
    }
    setFilteredJobs(filterJobs(props.jobs, statusFilter, hardwareFilter, tagFilter));
  }, [props.jobs, statusFilter, hardwareFilter, tagFilter]);

  const handleChangeToStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleChangeToHardwareFilter = (event) => {
    setHardwareFilter(event.target.value);
  };

  const handleChangeToTagFilter = (event) => {
    setTagFilter(event.target.value);
  };

  return (
    <Fragment>
      <Stack direction="row" justifyContent="end" sx={{ mt: 1 }}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="status-filter-label">Filter by status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            label="Status"
            onChange={handleChangeToStatusFilter}
          >
            <MenuItem value="">---</MenuItem>
            <MenuItem value="finished">finished</MenuItem>
            <MenuItem value="error">error</MenuItem>
            <MenuItem value="submitted">submitted</MenuItem>
            <MenuItem value="running">running</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="hardware-filter-label">Filter by hardware system</InputLabel>
          <Select
            labelId="hardware-filter-label"
            id="hardware-filter"
            value={hardwareFilter}
            label="Hardware"
            onChange={handleChangeToHardwareFilter}
          >
            <MenuItem value="">---</MenuItem>
            <MenuItem value="BrainScaleS">BrainScaleS</MenuItem>
            <MenuItem value="BrainScaleS-2">BrainScaleS-2</MenuItem>
            <MenuItem value="Demo">Demo</MenuItem>
            <MenuItem value="Spikey">Spikey</MenuItem>
            <MenuItem value="SpiNNaker">SpiNNaker</MenuItem>
            <MenuItem value="Test">Test</MenuItem>
            <MenuItem value="TestPlatform">TestPlatform</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="tag-filter-label">Filter by tags</InputLabel>
          <Select
            labelId="tag-filter-label"
            id="tag-filter"
            value={tagFilter}
            label="Tags"
            onChange={handleChangeToTagFilter}
          >
            <MenuItem value="">---</MenuItem>
            {props.tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="list-of-jobs">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>ID</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>System</b>
              </TableCell>
              <TableCell align="left">
                <b>Code</b>
              </TableCell>
              <TableCell align="left">
                <b>Submitted on</b>
              </TableCell>
              <TableCell align="center">
                <b>Submitted by</b>
              </TableCell>
              <TableCell align="center">
                <b>Tags</b>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job, index) => (
              <TableRow
                key={job.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "lightgray",
                  },
                }}
              >
                <LinkedTableCell align="center" to={`/${props.collab}/jobs/${job.id}`}>
                  {job.id}
                </LinkedTableCell>
                <LinkedTableCell align="center" to={`/${props.collab}/jobs/${job.id}`}>
                  <StatusChip status={job.status} />
                </LinkedTableCell>
                <LinkedTableCell align="center" to={`/${props.collab}/jobs/${job.id}`}>
                  {job.hardware_platform}
                </LinkedTableCell>
                <LinkedTableCell align="left" to={`/${props.collab}/jobs/${job.id}`}>
                  {formatCode(job.code)}
                </LinkedTableCell>
                <LinkedTableCell align="left" to={`/${props.collab}/jobs/${job.id}`}>
                  {timeFormat(job.timestamp_submission)}
                </LinkedTableCell>
                <LinkedTableCell align="center" to={`/${props.collab}/jobs/${job.id}`}>
                  {job.user_id}
                </LinkedTableCell>
                <LinkedTableCell align="center" to={`/${props.collab}/jobs/${job.id}`}>
                  {job.tags.join(", ")}
                </LinkedTableCell>
                <TableCell>
                  <Tooltip title="Create a new job based on this one">
                    <IconButton component={Link} to={`/${props.collab}/jobs/${job.id}/new`}>
                      <RestartIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Button
                  component={Link}
                  to={`/${props.collab}/jobs/?size=${props.jobs.length + DELTA_JOBS}`}
                >
                  Load more...
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default JobList;

import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  FormControl,
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
} from "@mui/material";

import StatusChip from "./StatusChip";

import { DELTA_JOBS } from "../globals";
import { timeFormat } from "../utils";

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

function LinkedTableCell(props) {
  return (
    <TableCell align={props.align}>
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

  useEffect(() => {
    setFilteredJobs(
      filterJobs(props.jobs, statusFilter, hardwareFilter, tagFilter)
    );
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
          <InputLabel id="hardware-filter-label">
            Filter by hardware system
          </InputLabel>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
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
                <LinkedTableCell
                  align="center"
                  to={`/${props.collab}/jobs/${job.id}`}
                >
                  {job.id}
                </LinkedTableCell>
                <TableCell align="center">
                  <StatusChip status={job.status} />
                </TableCell>
                <TableCell align="center">{job.hardware_platform}</TableCell>
                <TableCell align="left">
                  <code>{job.code.slice(0, 60)}</code>
                </TableCell>
                <TableCell align="left">
                  {timeFormat(job.timestamp_submission)}
                </TableCell>
                <TableCell align="center">{job.user_id}</TableCell>
                <TableCell align="center">{job.tags.join(", ")}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Button
                  component={Link}
                  to={`/${props.collab}/jobs/?size=${
                    props.jobs.length + DELTA_JOBS
                  }`}
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

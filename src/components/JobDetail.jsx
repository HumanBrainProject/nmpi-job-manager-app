import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useRevalidator, useNavigate } from "react-router-dom";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  ArrowBack,
  Delete as DeleteIcon,
  Launch as LaunchIcon,
  LocationOn as LocationOnIcon,
  DeveloperBoard as DeveloperBoardIcon,
  RestartAlt as RestartIcon,
} from "@mui/icons-material";

import { timeFormat, isEmpty, jobIsIncomplete } from "../utils";
import { addTag, deleteTag, hideJob } from "../datastore";
import { AuthContext } from "../context";
import StatusChip from "./StatusChip";
import Panel from "./Panel";
import CodePanel from "./CodePanel";
import FilesPanel from "./FilesPanel";
import LogPanel from "./LogPanel";
import CommentsPanel from "./CommentsPanel";
import KeyValueTable from "./KeyValueTable";
import TagDisplay from "./TagDisplay";
import ConfirmationDialog from "./ConfirmationDialog";

function JobDetail(props) {
  const { job, collab } = props;
  const revalidator = useRevalidator();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (jobIsIncomplete(job) && revalidator.state === "idle") {
      console.log(
        "Job is submitted or running, page will refresh every 5 seconds until the job is complete"
      );
      const intervalID = setInterval(() => {
        if (revalidator.state === "idle") {
          revalidator.revalidate();
        }
      }, 5000);
      return () => clearInterval(intervalID);
    }
  }, [props]);

  const handleDeleteTag = async (tag) => {
    console.log(tag);
    await deleteTag(collab, job.id, tag, auth);
    if (revalidator.state === "idle") {
      revalidator.revalidate();
    }
  };

  const handleAddTag = async (tag) => {
    console.log(tag);
    await addTag(collab, job.id, tag, auth);
    if (revalidator.state === "idle") {
      revalidator.revalidate();
    }
  };

  const handleRequestHideJob = () => {
    setDialogOpen(true);
  };

  const handleConfirmHideJob = async (confirmed) => {
    setDialogOpen(false);
    if (confirmed) {
      await hideJob(collab, job.id, auth);
      navigate(`/${collab}/jobs/`);
    }
  };

  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h2" sx={{ mt: 3 }}>
        <IconButton component={RouterLink} to={`/${collab}/jobs/`} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        Job #{job.id} <StatusChip status={job.status} />
        &nbsp;
        <Tooltip title="Create a new job based on this one">
          <IconButton component={RouterLink} to={`/${collab}/jobs/${job.id}/new`}>
            <RestartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete this job">
          <IconButton onClick={handleRequestHideJob}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 3 }}>
        Submitted on <b>{timeFormat(job.timestamp_submission)}</b> by <b>{job.user_id}</b> to{" "}
        <b>{job.hardware_platform}</b>
        {job.timestamp_completion ? (
          <span>
            <br />
            Completed on <b>{timeFormat(job.timestamp_completion)}</b>
          </span>
        ) : (
          ""
        )}
      </Typography>
      <TagDisplay tags={job.tags} onDelete={handleDeleteTag} onAdd={handleAddTag} />

      <FilesPanel label="Output files" dataset={job.output_data} collab={collab} jobId={job.id} />

      <CodePanel content={job.code} />

      {job.command ? (
        <Panel
          label="Command"
          icon={<LaunchIcon color="disabled" sx={{ mr: 1 }} />}
          defaultExpanded={true}
        >
          <Typography variant="body2">
            <code>{job.command}</code>
          </Typography>
        </Panel>
      ) : (
        ""
      )}

      <Panel
        label="Hardware config"
        icon={<DeveloperBoardIcon color="disabled" sx={{ mr: 1 }} />}
        defaultExpanded={true}
      >
        {job.hardware_config ? <KeyValueTable boldKeys data={job.hardware_config} /> : null}
      </Panel>

      <Panel
        label="Provenance"
        icon={<LocationOnIcon color="disabled" sx={{ mr: 1 }} />}
        defaultExpanded={true}
      >
        {job.provenance && !isEmpty(job.provenance) ? (
          <KeyValueTable boldKeys data={job.provenance} />
        ) : null}
      </Panel>

      <LogPanel jobId={job.id} />

      <CommentsPanel jobId={job.id} collab={collab} />

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleConfirmHideJob}
        content="Are you sure you wish to delete this job?"
      />
    </Box>
  );
}

export default JobDetail;

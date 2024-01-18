import { Link as RouterLink } from "react-router-dom";

import { Box, IconButton, Typography } from "@mui/material";
import {
  ArrowBack,
  Launch as LaunchIcon,
  LocationOn as LocationOnIcon,
  DeveloperBoard as DeveloperBoardIcon,
} from "@mui/icons-material";

import { timeFormat, isEmpty } from "../utils";
import StatusChip from "./StatusChip";
import Panel from "./Panel";
import CodePanel from "./CodePanel";
import FilesPanel from "./FilesPanel";
import LogPanel from "./LogPanel";
import CommentsPanel from "./CommentsPanel";
import KeyValueTable from "./KeyValueTable";

function JobDetail(props) {
  const { job, collab } = props;
  console.log(job);
  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h2" sx={{ mt: 3 }}>
        <IconButton
          component={RouterLink}
          to={`/${collab}/jobs/`}
          sx={{ mr: 1 }}
        >
          <ArrowBack />
        </IconButton>
        Job #{job.id} <StatusChip status={job.status} />
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 3 }}>
        Submitted on <b>{timeFormat(job.timestamp_submission)}</b> by{" "}
        <b>{job.user_id}</b> to <b>{job.hardware_platform}</b>
        {job.timestamp_completion ? (
          <span>
            <br />
            Completed on <b>{timeFormat(job.timestamp_completion)}</b>
          </span>
        ) : (
          ""
        )}
      </Typography>

      <FilesPanel label="Output files" dataset={job.output_data} />

      <CodePanel content={job.code} />

      <Panel
        label="Command"
        icon={<LaunchIcon color="disabled" sx={{ mr: 1 }} />}
        defaultExpanded={true}
      >
        <Typography variant="body2">
          <code>{job.command}</code>
        </Typography>
      </Panel>

      <Panel
        label="Hardware config"
        icon={<DeveloperBoardIcon color="disabled" sx={{ mr: 1 }} />}
        defaultExpanded={true}
      >
        {job.hardware_config ? (
          <KeyValueTable boldKeys data={job.hardware_config} />
        ) : null}
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
    </Box>
  );
}

export default JobDetail;
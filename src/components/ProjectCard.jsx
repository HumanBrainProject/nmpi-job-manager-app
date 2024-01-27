import { Fragment } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const statusColours = {
  "in preparation": "info",
  "under review": "warning",
  accepted: "success",
  rejected: "error",
};

function displayQuota(quota) {
  const decimalPlaces = Math.ceil(Math.max(0, -Math.log10(quota.limit / 10)));
  return (
    <div key={quota.resource_uri}>
      <b>{quota.platform}</b>: {quota.usage.toFixed(decimalPlaces)}/{quota.limit} {quota.units}
      <br />
    </div>
  );
}

function ProjectCard({ project, index, handleSubmit, handleEdit, handleDelete }) {
  return (
    <Card key={index} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={project.status}
          size="small"
          color={statusColours[project.status]}
          sx={{ marginBottom: 1 }}
        />
        <Typography gutterBottom variant="h5" component="h2">
          {project.title || <i>No title</i>}
        </Typography>
        <Typography>{project.abstract}</Typography>
        {project.quotas.map(displayQuota)}
      </CardContent>

      <CardActions>
        {project.status === "in preparation" ? (
          <Fragment>
            <Button size="small" onClick={() => handleEdit(index)}>
              Edit
            </Button>
            <Button size="small" onClick={() => handleSubmit(index)}>
              Submit
            </Button>
            <Button size="small" onClick={() => handleDelete(index)}>
              Delete
            </Button>
          </Fragment>
        ) : (
          <Typography variant="body2" sx={{ paddingLeft: 1 }}>
            Submitted {project.submission_date} by {project.owner}
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}

export default ProjectCard;

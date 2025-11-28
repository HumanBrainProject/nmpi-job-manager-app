import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { StatusContext } from "../../context";

function CollabList(props) {
  const serverStatus = useContext(StatusContext);
  const readOnly = serverStatus.includes("read-only");
  const serverDown = serverStatus.includes("down");

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {props.collabs.map((collab) => (
          <Grid item key={collab} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {collab}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  disabled={readOnly || serverDown}
                  size="small"
                  sx={{ marginLeft: 2 }}
                  component={RouterLink}
                  to={`${collab}/jobs/new`}
                >
                  <Tooltip title="New job">
                    <SendIcon color={readOnly || serverDown ? "disabled" : "primary"} />
                  </Tooltip>
                </IconButton>
                <Button size="small" component={RouterLink} to={`${collab}/jobs/`} disabled={serverDown}>
                  Jobs
                </Button>
                <Button size="small" component={RouterLink} to={`${collab}/projects/`} disabled={serverDown}>
                  Quotas
                </Button>
                <Button
                  size="small"
                  href={`https://wiki.ebrains.eu/bin/view/Collabs/${collab}`}
                  target="_blank"
                >
                  Collab
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CollabList;

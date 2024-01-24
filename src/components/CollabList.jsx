import * as React from "react";

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

function CollabList(props) {
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
                  size="small"
                  sx={{ marginLeft: 2 }}
                  component={RouterLink}
                  to={`${collab}/jobs/new`}
                >
                  <Tooltip title="New job">
                    <SendIcon color="primary" />
                  </Tooltip>
                </IconButton>
                <Button size="small" component={RouterLink} to={`${collab}/jobs/`}>
                  Jobs
                </Button>
                <Button size="small" component={RouterLink} to={`${collab}/projects/`}>
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

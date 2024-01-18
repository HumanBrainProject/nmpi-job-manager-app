import * as React from "react";

import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function CollabList(props) {
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {props.collabs.map((collab) => (
          <Grid item key={collab} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {collab}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={RouterLink}
                  to={`${collab}/jobs/`}
                >
                  Jobs
                </Button>
                <Button
                  size="small"
                  component={RouterLink}
                  to={`${collab}/projects/`}
                >
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

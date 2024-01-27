import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Introduction() {
  {
    /* Hero unit */
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        paddingTop: 8,
        paddingBottom: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Neuromorphic computing in EBRAINS
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          This app allows you to submit compute jobs to the BrainScaleS and SpiNNaker systems, to
          view the results, and to manage compute quotas.
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          If you or your colleagues have already run neuromorphic jobs in EBRAINS, you will see
          below a list of workspaces (&ldquo;collabs&rdquo;) that contain neuromorphic results. If
          this is your first time using the EBRAINS neuromorphic systems, click on &ldquo;Getting
          started&rdquo;.
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            href="https://www.ebrains.eu/modelling-simulation-and-computing/simulation/neuromorphic-computing-3"
            target="_blank"
          >
            Getting started
          </Button>
          <Button
            variant="outlined"
            href="https://electronicvisions.github.io/hbp-sp9-guidebook"
            target="_blank"
          >
            Documentation
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Introduction;

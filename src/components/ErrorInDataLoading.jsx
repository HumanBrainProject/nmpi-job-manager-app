import * as React from "react";

import { useAsyncError } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function ErrorInDataLoading() {
  const error = useAsyncError();
  console.log(error);

  return (
    <Box
      sx={{
        bgcolor: "#ffdddd",
        paddingTop: 8,
        paddingBottom: 6,
        marginTop: 4,
        marginBottom: 4,
        border: "thin red solid",
        borderRadius: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="red" gutterBottom>
          Error loading data
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Unfortunately we are unable to access the EBRAINS neuromorphic job queue. Please try again
          later.
          <br />
          Interactive access to BrainScaleS and SpiNNaker may still be possible - see the{" "}
          <Link href="https://electronicvisions.github.io/hbp-sp9-guidebook">Documentation</Link>
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" paragraph>
          Error detail: {error.message}
        </Typography>
      </Container>
    </Box>
  );
}

export default ErrorInDataLoading;

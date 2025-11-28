import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function StatusWarning({ status }) {
  return (
    <Box
      sx={{
        bgcolor: "#ffefddff",
        paddingTop: 8,
        paddingBottom: 6,
        marginTop: 4,
        marginBottom: 4,
        border: "thin orange solid",
        borderRadius: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="orange" gutterBottom>
          Warning
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          {status}
          <br />
          Interactive access to BrainScaleS and SpiNNaker may still be possible - see the{" "}
          <Link href="https://electronicvisions.github.io/hbp-sp9-guidebook">Documentation</Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default StatusWarning;

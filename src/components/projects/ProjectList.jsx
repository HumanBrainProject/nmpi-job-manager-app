import { useState, useEffect } from "react";

import { useFetcher } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import EditProjectDialog from "./EditProjectDialog";
import ProjectCard from "./ProjectCard";

function ProjectList(props) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && selectedProject) {
      fetcher.load();
    }
  }, [fetcher.data, fetcher, selectedProject]);

  const handleCloseEditDialog = (projectUpdate) => {
    if (projectUpdate) {
      fetcher.submit(projectUpdate, {
        method: "put",
        encType: "application/json",
        action: `/${props.collab}/projects/`,
        navigate: true,
      });
    }
    setSelectedProject(null);
  };

  const handleCloseCreateDialog = (newProject) => {
    if (newProject) {
      fetcher.submit(newProject, {
        method: "post",
        encType: "application/json",
        action: `/${props.collab}/projects/`,
        navigate: true,
      });
    }
    setCreateDialogOpen(false);
  };

  const handleDelete = (index) => {
    const projectData = { id: props.projects[index].id };
    fetcher.submit(projectData, {
      method: "delete",
      encType: "application/json",
      action: `/${props.collab}/projects/`,
      navigate: true,
    });
  };

  const handleSubmit = (index) => {
    const projectData = {
      id: props.projects[index].id,
      status: "under review",
    };
    handleCloseEditDialog(projectData);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography component="h1" variant="h2" align="left" color="text.primary" gutterBottom>
        Compute quota requests
      </Typography>
      <Grid container spacing={4}>
        {props.projects.map((project, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ProjectCard
              project={project}
              index={index}
              handleSubmit={handleSubmit}
              handleEdit={setSelectedProject}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
        <Grid item key={-1} xs={12} sm={6} md={4}>
          <Card
            key={-1}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#eeeeee",
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Box justifyContent="center" display="flex" height="100%">
                <Button size="medium" onClick={() => setCreateDialogOpen(true)}>
                  Request a compute quota
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <EditProjectDialog
        mode="edit"
        project={props.projects[selectedProject] || null}
        open={selectedProject !== null}
        onClose={handleCloseEditDialog}
      />
      <EditProjectDialog
        mode="create"
        project={{}}
        open={createDialogOpen}
        onClose={handleCloseCreateDialog}
      />
    </Container>
  );
}

export default ProjectList;

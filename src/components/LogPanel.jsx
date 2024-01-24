import { useState, useContext } from "react";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { ExpandMore, ArticleOutlined as ArticleOutlinedIcon } from "@mui/icons-material";

import { getLog } from "../datastore";
import { AuthContext } from "../context";

function LogPanel(props) {
  const [expanded, setExpanded] = useState(false);
  const [log, setLog] = useState("");
  const auth = useContext(AuthContext);
  const { jobId } = props;

  const handleChange = () => (event, isExpanded) => {
    if (log.length > 0) {
      setExpanded(isExpanded ? true : false);
    } else {
      getLog(jobId, auth).then((logContent) => {
        console.log(logContent[0]);
        setLog(logContent.trim());
        setExpanded(isExpanded ? true : false);
      });
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange()} title="log panel">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`log panel content`}
        sx={{ backgroundColor: "#e2eee2" }}
      >
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <ArticleOutlinedIcon color="disabled" sx={{ mr: 1 }} />
          Log
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="caption">
          {log.length > 0 ? <pre>{log}</pre> : "Log not available"}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default LogPanel;

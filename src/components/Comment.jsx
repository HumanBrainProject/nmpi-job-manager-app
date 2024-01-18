import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Markdown from "react-markdown";

function Comment(props) {
  return (
    <Paper key={props.comment_id} sx={{ marginTop: 1 }}>
      <Box
        sx={{
          width: "100%",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 4,
          paddingRight: 2,
          backgroundColor: "#eeeeff",
        }}
      >
        <Typography variant="caption">
          <b>{props.user_id}</b> {props.timestamp}
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Markdown>{props.content}</Markdown>
      </Box>
    </Paper>
  );
}

export default Comment;

import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

function CommentForm(props) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    props.onSubmit(newComment);
    setNewComment("");
  };

  return (
    <Stack spacing={1} sx={{ padding: 1, marginTop: 2 }}>
      <Box>
        <TextField
          id="new-comment-field"
          fullWidth
          multiline
          minRows={3}
          variant="outlined"
          sx={{ padding: 0 }}
          placeholder={`Comment on job ${props.job}`}
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          helperText="Markdown formatting is supported"
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button size="small" variant="contained" onClick={handleSubmit}>
          Comment
        </Button>
      </Box>
    </Stack>
  );
}

export default CommentForm;

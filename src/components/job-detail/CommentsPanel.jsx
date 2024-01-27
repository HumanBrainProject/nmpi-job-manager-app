import { useState, useContext } from "react";

import { useSubmit } from "react-router-dom";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";

import { ExpandMore, ChatBubbleOutline as ChatBubbleOutlineIcon } from "@mui/icons-material";

import { getComments } from "../../datastore";
import { AuthContext } from "../../context";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsPanel(props) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const auth = useContext(AuthContext);
  const { jobId, collab } = props;
  const submit = useSubmit();

  const handleChange = () => (event, isExpanded) => {
    if (comments.length > 0) {
      setExpanded(isExpanded ? true : false);
    } else {
      getComments(jobId, auth).then((comments) => {
        setComments(comments);
        setExpanded(isExpanded ? true : false);
      });
    }
  };

  const handleSubmit = (comment) => {
    const commentData = {
      comment: {
        content: comment,
      },
    };
    submit(commentData, {
      method: "post",
      encType: "application/json",
      action: `/${collab}/jobs/${jobId}`,
      navigate: true,
    });
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange()}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`comments panel content`}
        sx={{ backgroundColor: "#e2eee2" }}
      >
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <ChatBubbleOutlineIcon color="disabled" sx={{ mr: 1 }} />
          Comments
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {comments.length > 0
          ? comments.map((comment) => <Comment key={comment.comment_id} {...comment} />)
          : "No comments"}
        <CommentForm job={jobId} onSubmit={handleSubmit} />
      </AccordionDetails>
    </Accordion>
  );
}

export default CommentsPanel;

import { Chip } from "@mui/material";

function TagDisplay({ tags }) {
  if (tags) {
    return (
      <div>
        {tags.map((tag) => (
          <Chip
            label={tag}
            key={tag}
            sx={{ margin: "3px" }}
            size="small"
            color="info"
            variant="outlined"
          />
        ))}
      </div>
    );
  } else {
    return "";
  }
}

export default TagDisplay;

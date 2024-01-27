import { useState } from "react";
import { Chip, FilledInput, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon, Done as DoneIcon, Edit as EditIcon } from "@mui/icons-material";

function TagDisplay({ tags, onDelete, onAdd }) {
  const [editable, setEditable] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = async () => {
    await onAdd(newTag);
    setNewTag("");
  };

  let editButton = "";
  let addTagForm = "";
  let addButton = "";

  if (onDelete) {
    editButton = (
      <Tooltip title="Edit tags">
        <IconButton size="small" color="info" onClick={() => setEditable(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (editable) {
    editButton = (
      <Tooltip title="Finished editing tags">
        <IconButton size="small" color="info" onClick={() => setEditable(false)}>
          <DoneIcon />
        </IconButton>
      </Tooltip>
    );
    addTagForm = (
      <FilledInput
        hiddenLabel
        id="add-tag-field"
        value={newTag}
        onChange={(event) => setNewTag(event.target.value)}
        placeholder="add a tag"
        size="small"
        color="info"
        sx={{ fontSize: 12, width: "8em", marginLeft: 1 }}
      />
    );
    addButton = (
      <Tooltip title="Add tag">
        <IconButton size="small" color="info" onClick={handleAddTag}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (tags) {
    return (
      <div>
        {editButton}
        {tags.map((tag) => (
          <Chip
            label={tag}
            key={tag}
            sx={{ margin: "3px" }}
            size="small"
            color="info"
            variant="outlined"
            onDelete={editable ? () => onDelete(tag) : null}
          />
        ))}
        {addTagForm}
        {addButton}
      </div>
    );
  } else {
    return "";
  }
}

export default TagDisplay;

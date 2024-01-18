import { Typography } from "@mui/material";
import { FolderOpen as FolderOpenIcon } from "@mui/icons-material";
import Panel from "./Panel";

function FilesPanel(props) {
  console.log(props);
  if (props.dataset) {
    return (
      <Panel
        label={props.label}
        icon={<FolderOpenIcon color="disabled" sx={{ mr: 1 }} />}
        defaultExpanded={true}
      >
        <Typography variant="body2">{props.dataset.repository}</Typography>
        <ul>
          {props.dataset.files.map((file) => (
            <li key={file.path}>
              <a href={file.url}>{file.path}</a>&nbsp;
              {file.content_type} - {file.size} bytes - {file.hash}
            </li>
          ))}
        </ul>
      </Panel>
    );
  } else {
    return "";
  }
}
export default FilesPanel;

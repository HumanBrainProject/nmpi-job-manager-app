import React from "react";

import { Breadcrumbs as MUIBreadcrumbs, Divider, IconButton, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
  InsertDriveFile as FileIcon,
  Folder as FolderIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

function FileOrDir({ name, path, type, id, size, mtime, followLink }) {
  if (type === "dir") {
    let pathPart = "";
    if (path) {
      pathPart = path + "/";
    }
    return (
      <TableRow key={id}>
        <TableCell>
          <FolderIcon color="disabled" />
        </TableCell>
        <TableCell>
          <Link href="#" onClick={() => followLink(pathPart + name)}>
            {name}
          </Link>
        </TableCell>
        <TableCell>{size}</TableCell>
        <TableCell>{new Date(mtime * 1000).toLocaleString()}</TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow key={id}>
        <TableCell>
          {" "}
          <FileIcon color="disabled" />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{size}</TableCell>
        <TableCell>{new Date(mtime * 1000).toLocaleString()}</TableCell>
      </TableRow>
    );
  }
}

function Breadcrumbs(props) {
  let pathParts = props.path.split("/");
  let fullPaths = pathParts.map((part, index) => {
    return `${pathParts.slice(0, index + 1).join("/")}`;
  });
  fullPaths[fullPaths.length - 1] = "";
  const links = pathParts.map((part, index) => {
    const fullPath = fullPaths[index];
    if (fullPath) {
      return (
        <Link href="#" onClick={() => props.onChangePath(fullPath)}>
          <Typography variant="body2">{part}</Typography>
        </Link>
      );
    } else {
      return <Typography variant="body2">{part}</Typography>;
    }
  });
  return (
    <MUIBreadcrumbs sx={{ padding: 1 }}>
      <IconButton onClick={() => props.onChangePath("")}>
        <HomeIcon size="small" color="disabled" />
      </IconButton>
      {...links}
    </MUIBreadcrumbs>
  );
}

function FileBrowser(props) {
  return (
    <Paper sx={{ marginTop: 2, padding: 1, height: props.height }}>
      <Breadcrumbs path={props.path} onChangePath={props.onChangePath} />
      <Divider />
      <TableContainer>
        <Table size="small" sx={{ minHeight: "2vh" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "1em" }} />
              <TableCell>
                <Typography variant="overline" color="gray">
                  Name
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "4em" }}>
                <Typography variant="overline" color="gray">
                  Size
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "16em" }}>
                <Typography variant="overline" color="gray">
                  Last Update
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.contents.map((item) => (
              <FileOrDir key={item.id} {...item} followLink={props.onChangePath} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FileBrowser;

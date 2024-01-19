import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Breadcrumbs as MUIBreadcrumbs, Divider, Link } from "@mui/material";
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

function FileOrDir({ name, path, type, id, size, mtime, collab }) {
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
          <RouterLink to={`/${collab}/drive/${pathPart}${name}`}>{name}</RouterLink>
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
  let urls = pathParts.map((part, index) => {
    return `${props.root}/${pathParts.slice(0, index + 1).join("/")}`;
  });
  urls[urls.length - 1] = "";
  console.log(pathParts);
  console.log(urls);
  const links = pathParts.map((part, index) => {
    const url = urls[index];
    console.log(url, part, index);
    if (url) {
      return (
        <Link to={url} component={RouterLink}>
          <Typography variant="body2">{part}</Typography>
        </Link>
      );
    } else {
      return <Typography variant="body2">{part}</Typography>;
    }
  });
  return (
    <MUIBreadcrumbs sx={{ padding: 1 }}>
      <Link to={props.root + "/"} component={RouterLink}>
        <HomeIcon size="small" color="disabled" />
      </Link>
      {...links}
    </MUIBreadcrumbs>
  );
}

function FileBrowser(props) {
  return (
    <Paper sx={{ marginTop: 2, padding: 1 }}>
      <Breadcrumbs root={`/${props.collab}/drive`} path={props.path} />
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
              <FileOrDir key={item.id} {...item} collab={props.collab} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FileBrowser;

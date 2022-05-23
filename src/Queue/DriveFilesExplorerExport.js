import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { border, borderRadius, padding } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const styleList = {
  margin: 'auto',
  width: '100%%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  border: '0.5px solid grey',
  borderRadius:'15px',
  padding:'0px',
  overflow:'hidden'
};

const styleIcon = {
  marginRight:2
};

const styleFileIcon = {
  marginRight:2,
  color: 'green',

};



export default function DriveFilesExplorerExport(props) {
  let currentDir=props.currentDir
  if(props.currentDir===""){
     currentDir='/'
  }
  function currentDirFliter(Files){
    
      let filestorender=[]
    for(let i=0;i<Files.length;i++){
    if(Files[i].parent_dir===currentDir){
      filestorender.push(Files[i])
    }
    }
    return filestorender
  }
  


  if(Object.entries(props.RepoContent).length === 0){return (
    <div style={{ float: 'left', paddingLeft:"50%", paddingTop:"20%" ,color:'white' }}>
    <Box >
    <CircularProgress /> Loading
  </Box>
  </div>
  );}else{
        return(
        <List sx={styleList} component="nav" aria-label="Reop">
          {currentDir !=='/' &&  <ListItem button onClick={() => props.backout()}><ArrowBackIcon sx={styleIcon}></ArrowBackIcon  > <ListItemText primary='Back' />  </ListItem>}
        {currentDirFliter(props.RepoContent,).map(d=>(
        
        <ListItem button onClick={() => props.updatecurrentDirAndopencode(d.name,d.type,d.getpath)} >
        {(d.type ==="repo"||d.type ==="dir") &&       <FolderIcon sx={styleIcon}></FolderIcon>      }
        {(d.type ==="file" && d.name.split('.').pop()!=="py") &&       <CodeIcon sx={styleIcon}></CodeIcon>        }
        {(d.type ==="file" && d.name.split('.').pop()==="py") &&       <CodeIcon sx={styleFileIcon}></CodeIcon>        }
        <ListItemText primary={d.name} />
        </ListItem>
        

       ))}
    </List>)



  }
}

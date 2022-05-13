import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Checkbox from '@mui/material/Checkbox';
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



export default function DriveFilesExplorerImport(props) {

  const [checked, setChecked] = React.useState([]);
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
  function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      var count=0;
      for (var j = 0; j < item.length; j++) { 

        if (array[i][j] === item[j]) {
              count++;
          }
          if(count===item.length)
          {return i; }
        }
    }

    return -1;   // Not found
}
  const handleToggle = (value) => () => {
    const currentIndex = isItemInArray(checked,value)
    console.log("checked 2",isItemInArray(checked,value))
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log("checked",newChecked)
    props.setCheckedFiles(newChecked)
    
 
  };

  if(Object.entries(props.RepoContent).length === 0){return (
    <div sx={styleList} >
    <Box style={{ float: 'left', paddingLeft:"50%", paddingTop:"10%" ,color:'gray' }} >
    <CircularProgress /> 
    <p>
    Retrieving data
    </p>
  </Box>
  </div>
  );}else{
        return(

          
        <List sx={styleList} component="nav" aria-label="Reop">
          {currentDir !=='/' &&  <ListItem button onClick={() => props.backout()}><ArrowBackIcon sx={styleIcon}></ArrowBackIcon  > <ListItemText primary='Back' />  </ListItem>}
        {currentDirFliter(props.RepoContent,).map(d=>(
        
        <ListItem    >
        <ListItemButton onClick={() => {props.updatecurrentDirAndopencode(d.name,d.type,d.getpath);console.log("type",d.type)}}    >
        {(d.type ==="repo"||d.type ==="dir"||d.type ==="grepo") &&       <FolderIcon sx={styleIcon}></FolderIcon>      }
        {(d.type ==="file" && d.name.split('.').pop()!=="py") &&       <CodeIcon sx={styleIcon}></CodeIcon>        }
        {(d.type ==="file" && d.name.split('.').pop()==="py") &&       <CodeIcon sx={styleFileIcon}></CodeIcon>        }
        <ListItemText primary={d.name} />
        </ListItemButton>

        { (d.type !=="repo"&& d.type !=="grepo") && 
        <Checkbox
        edge="end"
        onChange={handleToggle([d.name,d.type,d.getpath,d.repoid])}
        checked={isItemInArray(checked,[d.name,d.type,d.getpath,d.repoid]) !== -1}
       
      />

        }
        </ListItem>
        

       ))}
    </List>)



  }
}
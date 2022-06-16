import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Checkbox from '@mui/material/Checkbox';
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

  const [checked, setChecked] = React.useState(props.checkedFiles);
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
    if(props.currentDir===""){
      filestorender.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
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
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } 
    else {
      newChecked.splice(currentIndex, 1);
      const newSelected = [...props.sourceFiles];
      let Index=-1
      for(let j=0;j<newSelected.length;j++){
        if(newSelected[j].name == value[0]){
          Index = j
        }
      }
      newSelected.splice(Index, 1)
      props.setSourceFiles(newSelected)
    }

    setChecked(newChecked);
    props.setCheckedFiles(newChecked)

 
  };

  if(Object.entries(props.RepoContent).length === 0){
    return (
      <div sx={styleList} >
        <Box style={{ float: 'left', paddingLeft:"50%", paddingTop:"10%" ,color:'gray' }} >
          <CircularProgress /> 
        </Box>
      </div>
    );
  }
  else{
    return(

          
      <List sx={styleList} component="nav" aria-label="Reop">
        {/* {currentDir !=='/' &&  <ListItem button onClick={() => props.backout()}><ArrowBackIcon sx={styleIcon}></ArrowBackIcon  > <ListItemText primary='Back' />  </ListItem>} */}
        {currentDir !=='/' && currentDir.substring(0,currentDir.lastIndexOf("/"))!=='' && <ListItem button onClick={() => props.backout()}><ArrowBackIcon sx={styleIcon}></ArrowBackIcon  > <ListItemText primary='Back' />  </ListItem>}
        {currentDir !=='/' && currentDir.substring(0,currentDir.lastIndexOf("/"))==='' && <ListItem button onClick={() => props.backout()}><ArrowBackIcon sx={styleIcon}></ArrowBackIcon  > <ListItemText primary='Select another Library/Collab' />  </ListItem>}
        {currentDirFliter(props.RepoContent,).map(d=>(
      
          <ListItem    >
          <ListItemButton onClick={() => {props.updatecurrentDirAndopencode(d.name,d.type,d.getpath);}}    >
          {(d.type ==="repo"||d.type ==="dir"||d.type ==="grepo") &&       <FolderIcon sx={styleIcon}></FolderIcon>      }
          {(d.type ==="file" && d.name.split('.').pop()!=="py") &&       <CodeIcon sx={styleIcon}></CodeIcon>        }
          {(d.type ==="file" && d.name.split('.').pop()==="py") &&       <CodeIcon sx={styleFileIcon}></CodeIcon>        }
          {currentDir =='/' && d.name==props.Collab && <ListItemText style={{ color: "blue" }} primary={d.name+' (current Collab)'} />  }
          {d.name!==props.Collab && <ListItemText primary={d.name} /> }
          </ListItemButton>

          { (d.type !=="repo"&& d.type !=="grepo") && 
          <Checkbox
          edge="end"
          // onChange={handleToggle([d.name,d.type,d.getpath,d.repoid])}
          onChange={handleToggle([d.name,d.type,d.parent_dir,d.repoid])}
          // checked={isItemInArray(checked,[d.name,d.type,d.getpath,d.repoid]) !== -1}
          checked={isItemInArray(checked,[d.name,d.type,d.parent_dir,d.repoid]) !== -1}

        />

          }
          </ListItem>
      

        ))}
      </List>
    )




  }
}
import React from 'react';

import DriveFilesExplorerExport from'./DriveFilesExplorerExport'

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef, useEffect, useCallback } from 'react'
import {timeFormat,currentDate,currentDateFileFormat} from '../Utils';



export default function ExportToDrive(props) {

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setDriveFilesExplorerStatus(false);
  };


    const [FolderContent, setFolderContent] = React.useState({});
    //const [filesList, setfilesList] = React.useState({});
    let filesList =[];
    const [currentDir,setcurrentDir]= React.useState('/')
    //const [currentDirUrl,setcurrentDirUrl]= React.useState('')
    let currentDirUrl = ''
    function updatecurrentDirAndopencode(dir,type,getlink){

      if (type==="file" && dir.split('.').pop()!=="py") {return}
      if(type==="file"){
  
     let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+getlink;
      let config = {
        
        headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
      };


/*       axios.get(query_url, config).then(function(res) {
        console.log("given link",res.data)
         axios.get("https://corsproxy-sa.herokuapp.com/"+res.data, config).then(function(res) {
          //setCode(res.data)
          //setTab(0)
          console.log(res)
        }) 
  
      }) */

        return
      }
      if (currentDir==="/"){    
      setcurrentDir(currentDir+dir)
      return
      }
      setcurrentDir(currentDir+"/"+dir)
    }
    function backout(){
      if(currentDir.substring(0,currentDir.lastIndexOf("/").length!==0||currentDir.substring(0,currentDir.lastIndexOf("/"))==="")){
        setcurrentDir(currentDir.substring(0,currentDir.lastIndexOf("/")))
        return null
      }
      setcurrentDir("/")
    }
  
    function uploadFile(destination,singularFile,fileName)
  {

    let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+currentDirUrl+'/upload-link/';
    let config = {
      
      headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
    };

    //let iterableFileslist = filesList


const FormData = require('form-data');
const fileData = new FormData() 
const newBlob = new Blob([singularFile.data], {
  type: 'text/plain'
});


let currentFolder =currentDir.split('/').slice(2).join('/');

let relativePath= currentFolder+'/Exported_Job_'+props.jobId+'_'+currentDateFileFormat()
if (relativePath.indexOf('/') === 0){relativePath = relativePath.substring(1);}

fileData.append("parent_dir", '/');
fileData.append("relative_path", relativePath);
fileData.append("replace", "1");
fileData.append("file",newBlob,fileName)




axios.get(query_url, config).then(function(res) {

  let configPost = {
      
    headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
    
  };

   axios.post("https://corsproxy-sa.herokuapp.com/"+res.data,fileData, configPost).then(function(res) {

    console.log("post result",res)
  }.catch((errPost)=>{console.log(errPost)


    
  }
  
  
  ))

}).catch((err) =>{
  
  console.log("error",err)




})


  }

  function downloadFiles(destination)
  {      let config = {
        
    headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
  };
  let currentFilesList=[]
  for ( const file of props.files)
  {

  let fileName= file.url.split('/').pop()
    axios.get("https://corsproxy-sa.herokuapp.com/"+file.url, config).then(function(res) {  
        
      uploadFile(destination,res,fileName)
    currentFilesList.push(res)

    })

  }

  filesList = currentFilesList
 

  }

 function exportToDrive()
{
 
let iterableFolderContent = FolderContent


let currentRepoId =''
for ( const d of iterableFolderContent)
{ 
    if (d.name===currentDir.split('/').pop()){currentDirUrl=d.repoid 
        currentRepoId=d.repoid

break

} }
downloadFiles(currentDirUrl)

handleClose()
setOpenAlert(true)



}

    useEffect(() => {
 
        let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/";
        let config = {
          
          headers: { Authorization: "Bearer " + props.auth.token },
        };
        let ids_query_url=query_url+"/?type=mine"
        axios.get(ids_query_url, config).then(function(res) {
          let axios_requests=[];
          
          let repoContent=[]
          let ids=[]
          for(let i=0;i<res.data.length;i++){
              ids.push(res.data[i].id)
              axios_requests.push(new axios.get(query_url+res.data[i].id+"/dir/?t&recursive=1",config))
              repoContent.push({name:res.data[i].name,type:res.data[i].type,parent_dir:"/",repoid:res.data[i].id})
          }
          axios.all(axios_requests).then(axios.spread((...responses) => {
            console.log(responses)
            let parent_dir=''
            let repoid=''
            for(let i=0;i<responses.length;i++){
              repoid=ids[i]
              for(let j=0;j<responses[i].data.length;j++){
                parent_dir=repoContent[i].name+responses[i].data[j].parent_dir
                if(parent_dir.slice(-1)==="/"){
                  parent_dir=parent_dir.slice(0,-1)
                }
                if(responses[i].data[j].type==="file")
                {
                  repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,getpath:repoid+"/file/?p="+responses[i].data[j].parent_dir+"/"+responses[i].data[j].name,repoid:repoid})}else{
                  repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,repoid:repoid})
                }
    
              }
            }
            setFolderContent(repoContent)
          }))
    
          
    
          
    
        }).catch((err) => {console.log("Error: ", err.message) });
      }, [props.DriveFilesExplorerStatus]);
    
      useEffect(() => 
      {

        setOpen(props.DriveFilesExplorerStatus)

      }, [props.DriveFilesExplorerStatus]);


    return (
      <div className="ExportToDrive">

      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={ true } maxWidth={"xl"}
    >
      <DialogTitle id="alert-dialog-title">
      <h5 style={{ display: 'inline' }} >{"Select the destination folder: "}</h5>
      <h5 style={{ color: 'blue',display: 'inline' }}>{currentDir}</h5>
        
      </DialogTitle>
      <DialogContent  >
      <DriveFilesExplorerExport RepoContent={FolderContent} currentDir={currentDir} updatecurrentDirAndopencode={updatecurrentDirAndopencode} backout={backout} ></DriveFilesExplorerExport>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={exportToDrive} autoFocus>
          Export
        </Button>
      </DialogActions>
    </Dialog>

    <Box sx={{ width: '100%' }}>
    <Collapse in={openAlert}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        Files exported successfully
      </Alert>
    </Collapse>

  </Box>



      </div>
    );
  }
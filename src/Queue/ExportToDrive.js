import React from 'react';

import DriveFilesExplorerExport from'./DriveFilesExplorerExport'

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef, useEffect, useCallback } from 'react'
import {timeFormat,currentDate,currentDateFileFormat} from '../utils';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import GroupIcon from '@mui/icons-material/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 'auto',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ExportToDrive(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlertCopy, setOpenAlertCopy] = useState(false);
  const [openAlertDone, setOpenAlertDone] = useState(false);
  const [openAlertSize, setOpenAlertSize] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [existingFiles, setExistingFiles] = useState([])
  const [oversizeFiles, setOversizeFile] = useState([])
  const [allfiles, setAllFiles] = useState(true);
  const [size_error, setError] = useState(false);
  const [driveTarget, setDriveTarget] = React.useState("");
  const [collabType, setCollabType] = React.useState("group");
  const [refreshRepoContent, setRefreshRepoContent] = React.useState(0);

  const [FolderContent, setFolderContent] = React.useState({});
  //const [filesList, setfilesList] = React.useState({});
  let filesList =[];
  const [currentDir,setcurrentDir]= React.useState('/'+props.collab);
  const [addDetail,setaddDetails]= React.useState(' (current Collab)')


  const handleClose = () => {
    // setOpen(false);
    props.setDriveFilesExplorerStatus(false);
  };

  function handleClickCollabType(currentCollabType)
  {
    setFolderContent({});
    setcurrentDir('');
    setaddDetails(' ')
    setRefreshRepoContent(refreshRepoContent+1);
    setCollabType(currentCollabType);
  }

  //const [currentDirUrl,setcurrentDirUrl]= React.useState('')
  let currentDirUrl = ''

  function updatecurrentDirAndopencode(dir,type,getlink){

    // if(type==="file" && dir.split('.').pop()!=="py") {return}
    // if(type==="file"){

    //   let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+getlink;
    //   let config = {
    //     headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
    //   };

    //   return
    // }
    if (currentDir==="/"){    
      setcurrentDir(currentDir+dir)
      if((currentDir+dir)===('/'+props.collab)) setaddDetails(' (current Collab)')
      else setaddDetails(' ')
      return
    }
    setcurrentDir(currentDir+"/"+dir)
    if((currentDir+"/"+dir)===('/'+props.collab)) setaddDetails(' (current Collab)')
    else setaddDetails(' ')
  }

  function backout(){
    if(currentDir.substring(0,currentDir.lastIndexOf("/").length!==0||currentDir.substring(0,currentDir.lastIndexOf("/"))==="")){
      setcurrentDir(currentDir.substring(0,currentDir.lastIndexOf("/")))
      if(currentDir.substring(0,currentDir.lastIndexOf("/"))===('/'+props.collab)) setaddDetails(' (current Collab)')
      else setaddDetails(' ')
      return null
    }
    setcurrentDir("/")
    setaddDetails(' ')
  }

  // function uploadFile(destination,singularFile,fileName){

  //   let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+currentDirUrl+'/upload-link/';
  //   let config = {
  //     headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
  //   };

  //   //let iterableFileslist = filesList

  //   const FormData = require('form-data');
  //   const fileData = new FormData() 
  //   const newBlob = new Blob([singularFile.data], {
  //     type: 'text/plain'
  //   });


  //   let currentFolder =currentDir.split('/').slice(2).join('/');

  //   let relativePath= currentFolder+'/Exported_Job_'+props.jobId+'_'+currentDateFileFormat()
  //   if (relativePath.indexOf('/') === 0){relativePath = relativePath.substring(1);}

  //   fileData.append("parent_dir", '/');
  //   fileData.append("relative_path", relativePath);
  //   fileData.append("replace", "1");
  //   fileData.append("file",newBlob,fileName)

  //   axios.get(query_url, config)
  //     .then(function(res) {

  //       let configPost = {
  //         headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
  //       };

  //       axios.post("https://corsproxy-sa.herokuapp.com/"+res.data,fileData, configPost).then(function(res) {
  //       }.catch((errPost)=>{
  //       })
  //       )
  //     }).catch((err) =>{
  //     })

  // }



  // function downloadFiles(destination){
  //   let config = {
  //     headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
  //   };
  //   let currentFilesList=[]
  //   for ( const file of props.files){
  //     let fileName= file.url.split('/').pop()
    
  //     axios.get("https://corsproxy-sa.herokuapp.com/"+file.url, config)
  //       .then(function(res) {  
  //         uploadFile(destination,res,fileName)
  //         currentFilesList.push(res)

  //       })

  //   } 

  //   filesList = currentFilesList
 
  // }

  const handleCloseResult = () => {
    setOpenResult(false);
    setAllFiles(true)
    setOversizeFile([])
    setExistingFiles([])
  };


  const handleCopy = async(path) =>{
    let target = 'drive'
    const url = 'https://127.0.0.1:8000/copydata/' + target + '/' + `${props.jobId}`;
    const config = {headers: {'Authorization': 'Bearer ' + props.auth.token},
                    params: {
                      path: path
                    }};

    // const config2 = {headers: {'Authorization': 'Bearer ' + props.auth.token}}
    // let ids_query_url="https://corsproxy-sa.herokuapp.com/" + "https://data-proxy.ebrains.eu/api/buckets/nmpi-testing-msenoville"
    // const rr = axios.get(ids_query_url, config2)
    // console.log(rr)
    setDriveTarget(path)
    const response = await axios.get(url, config)
    setOpenAlertCopy(false)
    setOpenAlertDone(true)
    for (let i = 0; i < response.data[1].length; i++) {
      if (response.data[1][i] != 'Copied') {
        setAllFiles(false)
        if (response.data[1][i] == 'Exists') {
          existingFiles.push(response.data[0][i])
        }
        else{
          setError(true)
          oversizeFiles.push([response.data[0][i], parseFloat(response.data[1][i][1]).toFixed(2)])
          setOpenAlertDone(false)
          setOpenAlertSize(true)
        }
      }
    }
    setOpenResult(true);
    // if(size_error){
    //   setOpenAlertSize(true)
    // }
    // else{
    //   setOpenAlertDone(true);
    // }

  }

  function exportToDrive(){
      let iterableFolderContent = FolderContent

      let currentRepoId =''
      for ( const d of iterableFolderContent)
      { 
        if (d.name===currentDir.split('/').pop()){
          currentDirUrl=d.repoid 
          currentRepoId=d.repoid
          break
        } 
      }
      handleCopy(currentDir)
      handleClose()
      setOpenAlertCopy(true)

  }

  useEffect(() => {

    let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/";
    let config = {
      headers: { Authorization: "Bearer " + props.auth.token },
    };
    // let ids_query_url=query_url+"/?type=group"
    let ids_query_url="https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos" + "?nameContains=" + props.collab
    // axios.get(ids_query_url, config)
    //   .then(function(res) {
    //     let axios_requests=[];
    //     // console.log('useeffect: after axios.get', ids_query_url)
    //     let repoContent=[]
    //     let ids=[]
    //     // console.log('useeffect: after axios.get - res', res)
    //     // return
    //     for(let i=0;i<res.data.length;i++){
    //         ids.push(res.data[i].id)
    //         axios_requests.push(new axios.get(query_url+res.data[i].id+"/dir/?t&recursive=1",config))
    //         // console.log('data.lenght, etc... ', res.data.length,query_url+res.data[i].id, "/dir/?t&recursive=1" )
    //         repoContent.push({name:res.data[i].name,type:res.data[i].type,parent_dir:"/",repoid:res.data[i].id})
    //         // console.log('repo content ', )

    //     }

        let query_url2 = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/";
        let config2 = {
          headers: { Authorization: "Bearer " + props.auth.token },
        };
        let ids_query_url2=query_url+"/?type="+collabType
        // let ids_query_url="https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos" + "?nameContains=" + props.collab
        axios.get(ids_query_url2, config)
          .then(function(res) {
            let axios_requests=[];
            let repoContent=[]
            let ids=[]
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].permission=='rw'){
                  ids.push(res.data[i].id)
                  axios_requests.push(new axios.get(query_url+res.data[i].id+"/dir/?t&recursive=1",config))
                  repoContent.push({name:res.data[i].name,type:res.data[i].type,parent_dir:"/",repoid:res.data[i].id})
                }
            }
        
        axios.all(axios_requests)
          .then(axios.spread((...responses) => {
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
                  repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,getpath:repoid+"/file/?p="+responses[i].data[j].parent_dir+"/"+responses[i].data[j].name,repoid:repoid})
                }else{
                  repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,repoid:repoid})
                }
              }
            }
            setFolderContent(repoContent)
          }))

      }).catch((err) => {console.log("Error: ", err.message) });

    // }, [collabType, props.DriveFilesExplorerStatus, refreshRepoContent]);
  }, [collabType, refreshRepoContent]);


    useEffect(() => 
      {
        setOpen(props.DriveFilesExplorerStatus)
      }, [props.DriveFilesExplorerStatus]);

      useEffect(() =>
      {
        setRefreshRepoContent(refreshRepoContent+1);
        if (refreshRepoContent==1){
            setcurrentDir('/'+props.collab)
            setaddDetails(' (current Collab)')
        }
      }
      , [open]
      );

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
      <h5 style={{ display: 'inline' }}>{addDetail}</h5> 

      </DialogTitle>

      <DialogContent  >
          <div style={{ display: "flex" }}>
            <Button startIcon={<FolderSharedIcon />} variant={(collabType==="mine")?"contained":"outlined"} onClick={()=>{handleClickCollabType("mine")}} >
                My libraries
            </Button>
            <Button startIcon={<GroupIcon />} variant={(collabType==="group")?"contained":"outlined"}  onClick={()=>{handleClickCollabType("group")}} >
              Shared libraries
            </Button>
          </div>
                {/* <DriveFilesExplorer RepoContent={FolderContent} currentDir={currentDir} updatecurrentDirAndopencode={updatecurrentDirAndopencode} backout={backout} Collab={props.collab}></DriveFilesExplorer> */}
            <DriveFilesExplorerExport RepoContent={FolderContent} 
                                      currentDir={currentDir} 
                                      updatecurrentDirAndopencode={updatecurrentDirAndopencode} 
                                      backout={backout}
                                      setCollabType={setCollabType} 
                                      Collab={props.collab}></DriveFilesExplorerExport>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={exportToDrive} autoFocus>
          Export
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog
        open={openResult}
        onClose={handleCloseResult}
        maxWidth='xl'
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>Copy output files to the Drive </h3>
          <hr></hr>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h4>Target repository <strong>/{driveTarget.split('/').slice(2).join('/')}/job_{props.jobId}</strong> in Library <strong>{props.collab}</strong></h4>
            <br></br>
          </DialogContentText>
            {(() => {
            if (allfiles) {
              return (
                <DialogContentText id="alert-dialog-description2">
                  <h5> All output files have been copied to the Drive. </h5>
                </DialogContentText>
              )
            } else{
              return (
                <DialogContentText id="alert-dialog-description3">
                  <h5> Copy done, except: </h5> 
                </DialogContentText>
              )          
            }
          })()}
          {(() => {
            if (existingFiles.length >=1) {
              const listItems1 = existingFiles.map((f) =>
                  <li>{f} : already exists in the Drive</li>
              );
              return ( 
                  <DialogContentText id="alert-dialog-description4">
                    <ul>{listItems1}</ul>
                  </DialogContentText>
              )
            }
          })()}
          {(() => {
            if (oversizeFiles.length >=1) {
              const listItems2 = oversizeFiles.map((f) =>
                  <li>{f[0]} : the size ({f[1]} GB) exceeds the limit allowed of 1GB</li>
              );
              return (
                <DialogContentText id="alert-dialog-description5">
                    <ul>{listItems2}</ul>
                </DialogContentText>
            )
          }
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>  
    <Collapse in={openAlertCopy}>
      <Alert
        severity="info"
        icon={<CircularProgress size="1.3rem" />}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlertCopy(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
      File copy in progress
      </Alert>
    </Collapse>
    <Collapse in={openAlertDone}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlertDone(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
       File copy done with success
      </Alert>
    </Collapse>
    <Collapse in={openAlertSize}>
      <Alert
        severity="warning"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlertSize(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        Some files exceed the size limit of 1 GB. 
        Please use the Bucket. 
      </Alert>
    </Collapse>

      </div>
    );
  }
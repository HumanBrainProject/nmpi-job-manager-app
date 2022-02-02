import React from 'react';

import DriveFilesExplorer from'./DriveFilesExplorer'

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import Alert from '@mui/material/Alert';

import { useState, useRef, useEffect, useCallback } from 'react'
import {timeFormat,currentDate,currentDateFileFormat} from '../Utils';

export default function DriveFileExplorer(props) {
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
    console.log("currentdirurl", currentDirUrl)
    let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+currentDirUrl+'/upload-link/';
    let config = {
      
      headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
    };

    //let iterableFileslist = filesList

console.log("singularFile",singularFile)
const FormData = require('form-data');
const fileData = new FormData() 
const newBlob = new Blob([singularFile.data], {
  type: 'text/plain'
});


let currentFolder =currentDir.split('/').slice(2).join('/');
let relativePath= currentFolder+'/Exported_Job_'+props.jobId+'_'+currentDateFileFormat()
console.log("destination 2", relativePath)
fileData.append("parent_dir", '/');
fileData.append("relative_path", relativePath);
fileData.append("replace", "1");
fileData.append("file",newBlob,fileName)



axios.get(query_url, config).then(function(res) {

  let configPost = {
      
    headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
    
  };

  console.log("given link",res.data)
  console.log("token",props.auth.token)
   axios.post("https://corsproxy-sa.herokuapp.com/"+res.data,fileData, configPost).then(function(res) {
    //setCode(res.data)
    //setTab(0)
    console.log("post result",res)
  }) 

}).catch((err) =>{console.log("error",err)})


  }
    function uploadFiles(destination)
  { console.log("currentdirurl", currentDirUrl)
    let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+currentDirUrl+'/upload-link/';
      let config = {
        
        headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
      };
      
      //let iterableFileslist = filesList

  console.log("before_iteration",filesList)
  console.log("before_iteration length",filesList.length)
  
  for(let i=0;i<filesList.length;i++)
  {
    
        const fileData = new FormData() 
        fileData.append(String(filesList[i].name), filesList[i].data,filesList[i].name)


       
        console.log("before axios",query_url)
      
     axios.get(query_url, config).then(function(res) {
        console.log("given link",res.data)
         axios.post("https://corsproxy-sa.herokuapp.com/"+res.data,fileData, config,).then(function(res) {
          //setCode(res.data)
          //setTab(0)
          console.log("post result",res)
        }) 
  
      }) 
    }
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
  //setfilesList(currentFilesList)
// removed filelist

  filesList = currentFilesList
  //console.log("download filelist length",filesList,filesList.length)

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
downloadFiles(currentRepoId)

//uploadFiles(currentRepoId)

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
            console.log("repocontent",repoContent)
            setFolderContent(repoContent)
          }))
    
          
    
          
    
        }).catch((err) => {console.log("Error: ", err.message) });
      }, []);
    
    function handleOnClick()
    {
      exportToDrive()



    }


    return (
      <div className="DriveFileExplorer">

        <DriveFilesExplorer RepoContent={FolderContent} currentDir={currentDir} updatecurrentDirAndopencode={updatecurrentDirAndopencode} backout={backout} ></DriveFilesExplorer>
        <Tooltip title="Export files to Drive">
        <Button onClick={handleOnClick} style={{backgroundColor:'#101b54', color:'white' ,textTransform: 'none' ,width:"10%",left:"45%",marginTop:"1%" }}  variant="contained"  > Export here
         </Button> 
         </Tooltip>
      </div>
    );
  }
import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DriveFilesExplorerImport from'./DriveFilesExplorerImport'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Paper from '@material-ui/core/Paper';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodeIcon from '@material-ui/icons/Code';
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { jobQueueServer, hw_options } from "../globals-prod";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import BackupIcon from '@mui/icons-material/Backup';
import GroupIcon from '@mui/icons-material/Group';
// import {apiV2Url} from '../Globals';
import {
    useParams
  } from "react-router-dom";
  import {handleAddToList,isItemInArray} from '../utils';


const ebrainsCollabUrl = "https://validation-v2.brainsimulation.eu/";
// const ebrainsCollabUrl = "https://wiki.ebrains.eu/rest/v1/";


function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}



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

const config_example = {
  SpiNNaker: {
    example: `{
"spynnaker_version": "master",
"spinnaker_tools_version": "3.1.0",
"extra_pip_installs": ["elephant"],
"extra_git_repositories": ["https://github.com/SpiNNakerManchester/SpiNNakerGraphFrontEnd"],
"extra_makes": ["SpiNNakerGraphFrontEnd/spinnaker_graph_front_end/examples"],
"extra_python_setups": ["SpiNNakerGraphFrontEnd"]
}`,
  },
  BrainScaleS: {
    example: `{
"WAFER_MODULE": 33, 
"HICANN": 297, 
"SOFTWARE_VERSION":'nmpm_software/current'
}`,
  },
  "BrainScaleS-ESS": {
    example: ``,
  },
  Spikey: {
    example: ``,
  },
  "BrainScaleS-2": {
    example: ``,
  },
  "Test": {
    example: ``
}
};

const command_example = {
  SpiNNaker: {
    example: `run.py {system} --option1=42`,
  },
  BrainScaleS: {
    example: `run.py {system} --option1=42`,
  },
  "BrainScaleS-ESS": {
    example: ``,
  },
  Spikey: {
    example: ``,
  },
  "BrainScaleS-2": {
    example: ``,
  },
  "Test": {
    example : ``
}
};

const thetext = ''


export default function CreateJob(props) {

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [importFiles, setImportFiles] = React.useState(0);
  const [collabType, setCollabType] = React.useState("group");
  const [refreshRepoContent, setRefreshRepoContent] = React.useState(0);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleExcludeFile(name)
  {
    let fileIndex=-1
    for(let j=0;j<sourceFiles.length;j++){
      if(sourceFiles[j].name == name){
        fileIndex = j
      }
    }
    if(fileIndex!==-1){
    
      setSourceFiles([
        ...sourceFiles.slice(0, fileIndex),
        ...sourceFiles.slice(fileIndex + 1)
      ]);

      let fileIndex2=-1
      for(let j=0;j<checkedFiles.length;j++){
      if(checkedFiles[j][0] == name){
        fileIndex2 = j
      }
    }
      setCheckedFiles([
        ...checkedFiles.slice(0, fileIndex2),
        ...checkedFiles.slice(fileIndex2 + 1)
      ]);

    }

  }
  function importSelected()
  {
    setImportFiles(importFiles+1)
    handleClose()
    setOpenAlert(true)
  }
  
  const classes = useStyles();
  const [checkedFiles, setCheckedFiles] = React.useState([]);
  const [hw, set_hw] = React.useState('');
  const [hwIsSelected, set_hwIsSelected] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [hwlabel, set_hwlabel] = React.useState('');
  const [tab, setTab] = React.useState(0);
  const [selectedtab, setSelectedTab] = React.useState('"code_editor"');
  const [code, setCode] = React.useState("# write your code here");
  const [configExample, setConfigExample] = React.useState('');
  const [commExample, setCommExample] = React.useState('');
  const [hardwareConfig, setHardwareConfig] = React.useState('');
  const [command, setCommand] = React.useState('');
  const [git, setGit] = React.useState('');
  const [mymodel, setModel] = React.useState('');
  const [tags, setTags] = React.useState([])
  const [sourceFiles, setSourceFiles] = React.useState([])
  const [errorMessage, setErrorMessage] = React.useState('');
  const [FolderContent, setFolderContent] = React.useState({});
  const [allRepos, setAllRepos] = React.useState([]);
  const [currentDir,setcurrentDir]= React.useState(props.collab);
  const [addDetail,setaddDetails]= React.useState('')


  useEffect(() => {


  for ( const element of checkedFiles) {
    let fileIndex=-1
    for(let j=0;j<sourceFiles.length;j++){
      if(sourceFiles[j].name == element[0]){
        fileIndex = j
      }
    }
    if(fileIndex==-1){
      let config = { 
        headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
      };
      if (element[1]==="file"){
        // Get file details
        let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" 
                                                              + "/api2/repos/" + element[3]
                                                              + "/file/detail/?p=/" + element[0];
        axios.get(query_url, config).then(function(res) {
          let file = 
          {
            name: element[0], 
            size: formatBytes(res.data.size)
          }
          setSourceFiles(sourceFiles=>[...sourceFiles,file]);
        })
      }

      else {
        // get list of items
        let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" 
                                                              + "/api/v2.1/repos/"+element[3]
                                                              + "/dir/?p=/" + element[0] + '&t=f&recursive=1';

        axios.get(query_url, config).then(function(res) {  
          let folder_size = 0
          for(let j=0;j<res.data.dirent_list.length;j++){
            folder_size += res.data.dirent_list[j].size
          }
          let folder = 
          {
            name: element[0], 
            size: formatBytes(folder_size)
          }
          setSourceFiles(sourceFiles=>[...sourceFiles,folder]);

      } ).catch((err) => {console.log("folder request Error: ", err.message) });

      }
    }
  
  }   

}, [importFiles]);


  function updatecurrentDirAndopencode(dir,type,getlink){
    if (type==="file" && dir.split('.').pop()!=="py") {return}
    if(type==="file"){

   let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/"+getlink;

   let config = {
      
      headers: {crossDomain: true , Authorization: "Bearer " + props.auth.token },
    };
    axios.get(query_url, config).then(function(res) {
  

       axios.get("https://corsproxy-sa.herokuapp.com/"+res.data, config).then(function(res) {
        setCode(res.data)
        setTab(0)

      }) 

    })
   
      return
    }
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


  useEffect(() => {
    if(hwIsSelected) {
      setConfigExample(config_example[hw].example);
      setCommExample(command_example[hw].example);
    }
    }, [hw]);
  
  useEffect(() => {
    if(code==="") {
      setCode("# write your code here")
    }
  }, [code]);

  useEffect(() => {
    if(tab === 0) {
      setModel(code)
      setSelectedTab("code_editor")
    };
    if(tab === 1) {
      setModel(git)
      setSelectedTab("upload_link")
    };
    if(tab === 2) {
      setModel(checkedFiles)
      setSelectedTab("upload_script")
    };
  }, [tab, code, git, checkedFiles]);

  // Job resubmission
  let { collabid ,id} = useParams();
  useEffect(() => {

if (props.resubmit==="true")

    {
        let config = {
        headers: {
            'Authorization': 'Bearer ' + props.auth.token,
        }
        }
        
        const resultUrl = jobQueueServer +`/api/v2/results/${id}`;

        const fetchData = async () => {
        const result = await axios(resultUrl, config);
        //await setJob(result.data);

        set_hw(result.data.hardware_platform)
        set_hwIsSelected(true)
        setCode(result.data.code)
        setTab(1)
        setTab(0)
        setCommand(result.data.command)
        setTags(result.data.tags)

        };
        fetchData();
    }
  }, []);

// drive part
   useEffect(() => {
    setcurrentDir('/'+props.collab)
    setaddDetails(' (current Collab)')

    let query_url = "https://corsproxy-sa.herokuapp.com/" + "https://drive.ebrains.eu" + "/api2/repos/";
    let config = {
      
      headers: { Authorization: "Bearer " + props.auth.token },
    };
    let ids_query_url=query_url+"/?type="+collabType
    //let ids_query_url=query_url+"/?type=mine"
    axios.get(ids_query_url, config).then(function(res) {
    
      let axios_requests=[];
      
      let repoContent=[]
      let ids=[]
      for(let i=0;i<res.data.length;i++){
          ids.push(res.data[i].id)
          axios_requests.push(new axios.get(query_url+res.data[i].id+"/dir/?t&recursive=1",config))
          repoContent.push({name:res.data[i].name,type:res.data[i].type,parent_dir:"/"})
      }
      axios.all(axios_requests).then(axios.spread((...responses) => {

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
            }
            else{
              // repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,getpath:repoid+"/zip-task/?parent_dir="+responses[i].data[j].parent_dir+"&dirents="+responses[i].data[j].name,repoid:repoid})
              repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,repoid:repoid,getpath:repoid+"/dir/?parent_dir="+responses[i].data[j].parent_dir+"&dirents="+responses[i].data[j].name})
              // repoContent.push({name:responses[i].data[j].name,type:responses[i].data[j].type,parent_dir:"/"+parent_dir,getpath:"/"+parent_dir+'/'+responses[i].data[j].name,repoid:repoid})
            }

          }
        }

        setFolderContent(repoContent)
      }))

      

    }).catch((err) => {console.log("Error: ", err.message) });
  }, [collabType,refreshRepoContent]);


 


  function handleEditorChange(value, event) {
    setCode(value);
  }

  function handleHardwareConfig(event){
    setHardwareConfig(event.target.value)
  }

  function handleCommand(event){
    setCommand(event.target.value)
  }

  function handleCodeURL(event){
    setGit(event.target.value)
  }

  function handleTags(event){
    let string = event.target.value
    let array = string.split(/[,;]+/)
    setTags(array)
  }

  function handleHW(event) {
    set_hwIsSelected(true)
    set_hw(event.target.value)
  }

  const handleChangeTab = (event, newValue) => {

    setTab(newValue);

  };

function handleSubmitClick()
{
  setHasError(!hwIsSelected)
  if (hasError===false){handleSubmit()}

}

function handleClickCollabType(currentCollabType)
{

  setFolderContent({});
  setcurrentDir('/');
  setRefreshRepoContent(refreshRepoContent+1);
  setCollabType(currentCollabType);
}

function handleSubmit(){
    // const Url = jobQueueServer
    const Url = 'https://127.0.0.1:8000' + '/api/v2/queue';

    const requestConfig = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
        'Content-type': 'application/json'
      }
    }
    setHasError(!hwIsSelected)
    let job = {
    // job.id = null;
    // job.log = " ";
    status : 'submitted',
    code : mymodel,
    command : command,
    hardware_platform : hw,
    collab_id: props.collab??collabid,
    tags : tags,
    user_id: props.auth.tokenParsed["preferred_username"],
    selected_tab : selectedtab
    // job.tags = [];
    // job.input_data = [];
    // job.output_data = []; 
    // job.resource_uri = ""; 
    // inputs = [];
    }
    if (hardwareConfig) {
      job.hardware_config = JSON.parse(hardwareConfig);
    }
 

    axios.post(Url, job, requestConfig)
    .then(response => {
      console.log(response);
      setSubmitStatus(true);
    })
    .catch(error => {
      setErrorMessage(error);
    })
  }

  return (
    <div id="container" >

    <h2>New job</h2>

      <h5>Hardware Platform</h5>

      <div>
      <FormControl className={classes.formControl}  data-testid ='hardwareList'>
        <InputLabel id="hardware-simple-select">Hardware</InputLabel>
        <Select
        required
          labelId="hardware-simple-select"
          id="hardware-simple-select"
          value={hw}
          onChange={handleHW}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {hw_options.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
        </Select>
        <FormHelperText>Please choose a simulation platform</FormHelperText>
      </FormControl>
      </div>
      <br/>

      <h5>Code</h5>

        <Tabs
          value={tab}
          onChange={handleChangeTab}
          // variant="scrollable"
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs for code input"
          centered
        >
          <Tab label="Editor" icon={<CodeIcon />} {...a11yProps(0)} />
          <Tab label="From Git repository or zip archive" icon={<GitHubIcon />} {...a11yProps(1)} />
          <Tab label="From the Drive"  icon={<StorageIcon />} {...a11yProps(2)} />
          <Tab label="Graphical model builder" disabled icon={<CreateIcon />} {...a11yProps(3)} />
        </Tabs>
      <TabPanel value={tab} index={0}>
         
      <div>

        <Editor
        height="40vh"
        onChange={handleEditorChange}
        // onMount={handleEditorDidMount}
        // beforeMount={handleEditorWillMount}
        // onValidate={handleEditorValidation}
        defaultLanguage="python"
        defaultValue={code}
        
        />
      </div>
      
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <TextField
            id="code-location-url"
            label="URL"
            style={{ margin: 8 }}
            placeholder="https://github.com/MyGitAccount/my_git_repository.git"
            helperText="Please type the URL of a version control repository"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleCodeURL}
          />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <div>

          <Button
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<BackupIcon />}
          >
            Import Files or Folders
          </Button>
        
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={ true } maxWidth={"xl"}
           >
            <DialogTitle id="alert-dialog-title">
              <h5 style={{ display: 'inline' }} >{"Select files and/or folders: "}</h5>
              <h5 style={{ color: 'blue',display: 'inline' }}>{currentDir}</h5>
              <h5 style={{ display: 'inline' }}>{addDetail}</h5> 
                
            </DialogTitle>
            <DialogContent  >
              <Button startIcon={<FolderSharedIcon />} variant={(collabType==="mine")?"contained":"outlined"} onClick={()=>{handleClickCollabType("mine")}} >
                My libraries
              </Button>
            <Button startIcon={<GroupIcon />} variant={(collabType==="group")?"contained":"outlined"}  onClick={()=>{handleClickCollabType("group")}} >
                Shared directories
            </Button>
            <DriveFilesExplorerImport RepoContent={FolderContent} 
                                      currentDir={currentDir} 
                                      updatecurrentDirAndopencode={updatecurrentDirAndopencode} 
                                      backout={backout} 
                                      checkedFiles={checkedFiles}
                                      setCheckedFiles={setCheckedFiles}
                                      sourceFiles={sourceFiles}
                                      setSourceFiles={setSourceFiles}
                                      setCollabType={setCollabType}
                                      Collab={props.collab} ></DriveFilesExplorerImport>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={importSelected}  color="success"> Import Selected </Button>
            </DialogActions>
          </Dialog>
          
          <Box>
            <Paper elevation={(sourceFiles.length===0)?0:3} style={{paddingLeft:"1%", paddingBottom:"0.1%",width:"90%",marginBottom:"1%",marginTop:"1%"}} >
              <List>
                {sourceFiles.map(file=>(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete"              onClick={() => {
                        handleExcludeFile(file.name);
                      }}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={file.name}
                      secondary={file.size}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper> 
          </Box>     

        </div>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        Coming soon...
      </TabPanel>

      <h5>Command</h5>
      <div>
        <TextField
          id="command-field"
          label="Command:"
          style={{ margin: 8 }}
          placeholder={commExample}
          value={command}
          helperText="Optional: specify the path to the main Python script, with any command-line arguments."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleCommand}
        />
      </div>
      <br/>
                
      <h5>Hardware Configuration</h5>
      
      <div>
      <TextField
          id="hw-config-field"
          label="Hardware config"
          style={{ margin: 8 }}
          placeholder = {configExample}
          helperText="Please type a JSON-formatted object. See the Guidebook for more details"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          loatingLabelText="MultiLine and FloatingLabel"
          autoFocus = {false}
          multiline
          variant="outlined"
          onChange={handleHardwareConfig}
        />

      </div>

      <br/>
                
      <h5>Tags</h5>
      <div>
        <TextField
          id="tag"
          label="tags"
          value={tags}
          style={{ margin: 8 }}
          placeholder= "Tag1,Tag2;This is Tag3"
          helperText="Please type job tags, separated by a comma, or semicolon. Tags can have spaces."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleTags}
        />
      </div>

      <br/>
                
      <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<CancelIcon />}
        component={ Link } to={"/"+"?collab_id="+props.collab}
      >
        Cancel
      </Button>
      <Button
        onClick={handleSubmitClick}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        //component={ Link } to={"/"+"?collab_id="+props.collab}
      >
        Submit
      </Button>
      <Link to={"/"+"?collab_id="+props.collab}>
      <Dialog open={submitStatus} >
        <Alert
          severity="success"
          color="success"
          role="button"
          icon={<CloudDoneIcon />}
          onClose={() => {}}
          closeText="Go back to Jobs list"
          sx={{
            // width: '80%',
            // margin: 'auto',
            "& .MuiAlert-icon": {
              color: "blue"
            }
            //backgroundColor: "green"
          }}
        >
          <AlertTitle>Done !</AlertTitle>
          The Job has been submitted successfully
        </Alert>
      </Dialog>
      </Link>

      
      </div>

    </div>
  );
}
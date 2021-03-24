import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useForm, Controller } from "react-hook-form";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodeIcon from '@material-ui/icons/Code';
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';


import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropzoneDialogBase } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import Icon from '@material-ui/core/Icon';

const ebrainsCollabUrl = "https://validation-v2.brainsimulation.eu/";
// const ebrainsCollabUrl = "https://wiki.ebrains.eu/rest/v1/";


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
  "SpiNNaker": {
      example: 
`{
"spynnaker_version": "master",
"spinnaker_tools_version": "3.1.0",
"extra_pip_installs": ["elephant"],
"extra_git_repositories": ["https://github.com/SpiNNakerManchester/SpiNNakerGraphFrontEnd"],
"extra_makes": ["SpiNNakerGraphFrontEnd/spinnaker_graph_front_end/examples"],
"extra_python_setups": ["SpiNNakerGraphFrontEnd"]
}`
  },
  "BrainScaleS": {
      example : 
`{
"WAFER_MODULE": 33, 
"HICANN": 297, 
"SOFTWARE_VERSION":'nmpm_software/current'
}`
  },
  "BrainScaleS-ESS": {
    example: 
``
},
  "Spikey": {
    example : 
``
}
};

const command_example = {
  "SpiNNaker": {
      example: `run.py {system} --option1=42`
  },
  "BrainScaleS": {
      example : `run.py {system} --option1=42`
  },
  "BrainScaleS-ESS": {
    example: ``
},
  "Spikey": {
    example : ``
}
};

const hw_options = ["BrainScaleS", "SpiNNaker", "BrainScaleS-ESS", "Spikey"];

  const thetext = ''


export default function CreateJob(props) {
// class CreateJob extends React.Component {

  const classes = useStyles();

  const [hw, set_hw] = React.useState('');
  const [hwIsSelected, set_hwIsSelected] = React.useState(false);
  const [hwlabel, set_hwlabel] = React.useState('');

  const [tab, setTab] = React.useState(0);

  const [code, setCode] = React.useState("# write your code here");

  const [configExample, setConfigExample] = React.useState('');
  const [commExample, setCommExample] = React.useState('');
  const [hardwareConfig, setHardwareConfig] = React.useState('');
  const [command, setCommand] = React.useState('');
  const [git, setGit] = React.useState('');
  const [mymodel, setModel] = React.useState('');
  const [tags, setTags] = React.useState([])


  useEffect(() => {
    if(hwIsSelected) {
      setConfigExample(config_example[hw].example);
      setCommExample(command_example[hw].example);
    }
    }, [hw]);

  useEffect(() => {
    if(tab == 0) setModel(code);
    if(tab == 1) setModel(git);
  }, [tab, code, git]);


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
    console.log(newValue)
    setTab(newValue);
  };

function handleSubmit(){
    const Url = 'https://nmpi.hbpneuromorphic.eu/api/v2/queue';

    const requestConfig = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
        'Content-type': 'application/json'
      }
    }

    let job = {
    // job.id = null;
    // job.log = " ";
    status : 'submitted',
    code : mymodel,
    command : command,
    hardware_config: JSON.parse(hardwareConfig),
    hardware_platform : hw,
    collab_id: props.collab,
    tags : tags,
    user_id: props.auth.tokenParsed["preferred_username"]
    // job.selected_tab = "code_editor";
    // job.tags = [];
    // job.input_data = [];
    // job.output_data = []; 
    // job.resource_uri = ""; 
    // inputs = [];
    }
    console.log(job.hardware_platform)

    axios.post(Url, job, requestConfig)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error submitting a job'})
    })
  }

  return (
    <div id="container" >

    <h2>New job</h2>

    {/* */}
      <h5>Hardware Platform</h5>

      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="hardware-simple-select">Hardware</InputLabel>
        <Select
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

      {/* <AppBar position="static" color="default"> */}
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
          <Tab label="From the Drive" disabled icon={<StorageIcon />} {...a11yProps(2)} />
          <Tab label="Graphical model builder" disabled icon={<CreateIcon />} {...a11yProps(3)} />
        </Tabs>
      {/* </AppBar> */}
      <TabPanel value={tab} index={0}>
         
      <div>

        <Editor
        height="20vh"
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
        Coming soon...
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
      {/* <AppBar position="static" color="default"> */}
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
          autoFocus = {true}
          multiline
          variant="outlined"
          onChange={handleHardwareConfig}
        />

      {/* </AppBar> */}
      </div>

      <br/>
                
      <h5>Tags</h5>
      <div>
        <TextField
          id="tag"
          label="tags"
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
                
      {/* <h5>Input Files</h5>
      <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Files
      </Button>

      <DropzoneDialogBase
        dialogTitle={dialogTitle()}
        acceptedFiles={['image/*']}
        fileObjects={fileObjects}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onAdd={newFileObjs => {
          console.log('onAdd', newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={deleteFileObj => {
          console.log('onDelete', deleteFileObj);
        }}
        onClose={() => dialogTitle.setOpen(false)}
        onSave={() => {
          console.log('onSave', fileObjects);
          dialogTitle.setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div> */}
      <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<CancelIcon />}
        component={ Link } to="/"
      >
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        component={ Link } to="/"
      >
        Submit
      </Button>

      </div>

    </div>
  );
}
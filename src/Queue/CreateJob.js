

// // // //     constructor(props) {
// // // //       super(props);
// // // //       this.state = {
// // // //         hw: null,
// // // //       };
  
// // // //       this.handleChange = this.handleChange.bind(this);
// // // //     }
  
// // // //     handleChange(e) {
// // // //       console.log("Hardware Selected");
// // // //       this.setState({ hw: e.target.value });
// // // //     }
  


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
// import { useFormContext, Controller } from "react-hook-form";
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
import useProgressPercentage from './../Components/Progress';




// // import files from "./files";

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
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 'auto',
    // width: {width},
    // height: {height}
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

const hw_options = ["BrainScaleS", "SpiNNaker", "BrainScaleS-ESS", "Spikey"];

  const thetext = ''


export default function CreateJob(props) {
// class CreateJob extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     // jobs: [],
  //     // error: ''
  //     hw
  //   }
  // }

  // constructor(props) {
  //   super(props)
  //   this.state = {value: ''}

  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleSubmit = this.handleSubmit.bind(this)
  // }

  

  const classes = useStyles();

  const [hw, set_hw] = React.useState('');
  const [hwIsSelected, set_hwIsSelected] = React.useState(false);
  const [hwlabel, set_hwlabel] = React.useState('');

  const [tab, setTab] = React.useState(0);

  const [code, setCode] = React.useState("# write your code here");

  const [example, setExample] = React.useState('');
  const [config, setConfig] = React.useState('');
  const [command, setCommand] = React.useState('');
  const [git, setGit] = React.useState('');
  const [mymodel, setModel] = React.useState('');

  useEffect(() => {
    if(hwIsSelected) setExample(config_example[hw].example);
  }, [hw]);

  useEffect(() => {
    if(tab == 0) setModel(code);
    if(tab == 1) setModel(git);
    console.log('model:', mymodel)
  }, [tab, code, git]);


  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    setCode(value);
  }
  
  const [index, setindex] = React.useState('');

  const [value2, setValue2] = useState("");


  async function handlesetHW(event){
    setValue2(event.target.value)
    console.log('----------- state -------- ', event.target.value, value2)
   
  }
  
  function handleConfig(event){
    setConfig(event.target.value)
    console.log(event.target.value)
  }

  function handleCommand(event){
    setCommand(event.target.value)
    console.log(event.target.value)
  }

  function handleGit(event){
    setGit(event.target.value)
    console.log(event.target.value)
  }

  function handleHW(event) {
    set_hwIsSelected(true)
    console.log('1 -',hw);
    set_hw(event.target.value)
    console.log('2 -',hw);
}

 

  const handleChangeTab = (event, newValue) => {
    console.log(newValue)
    setTab(newValue);
  };

  const [fileName, setFileName] = React.useState("run.py");

  // const files = {
  //   "run.py": {
  //     name: "run.py",
  //     language: "javascript",
  //     value: 'someJSCodeExample'
  //   },
  //   "style.css": {
  //     name: "style.css",
  //     language: "css",
  //     value: 'someCSSCodeExample'
  //   },
  //   "index.html": {
  //     name: "index.html",
  //     language: "html",
  //     value: 'someHTMLCodeExample'
  //   }
  // };


//   const file = files[fileName];

//   const [open, setOpen] = React.useState(false);
//   const [fileObjects, setFileObjects] = React.useState([]);

//   const dialogTitle = () => {

//   // const [open, setOpen] = React.useState(false);

//   return ( 
//   <>
//     <span>Upload file</span>
//     <IconButton
//       style={{right: '12px', top: '8px', position: 'absolute'}}
//       onClick={() => setOpen(false)}>
//       <CloseIcon />
//     </IconButton>
//   </>
// );
//   }

function handleSubmit(){
    const Url = 'https://nmpi.hbpneuromorphic.eu/api/v2/queue';
  
    const config = {
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
    // command : "run.py",
    hardware_config : {},
    hardware_platform : hw,
    collab_id: 'neuromorphic-testing-private',

    // job.selected_tab = "code_editor";
    // job.tags = [];
    // job.input_data = [];
    // job.output_data = []; 
    // job.resource_uri = ""; 
    // inputs = [];
    }
    console.log(job.hardware_platform)
  
    axios.post(Url, job, config)
    // axios.get(Url, config)
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

      {/* <button onClick={handleShowValue} disabled={!isEditorReady}>
        Show value
      </button> */}

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
          <Tab label="From the Drive" icon={<StorageIcon />} {...a11yProps(2)} />
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
            id="github-url"
            label="Github link"
            style={{ margin: 8 }}
            placeholder="https://github.com/MyGitAccount/my_git_repository.git"
            helperText="Please type the URL of a version control repository"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleGit}
          />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        to do...
      </TabPanel>
      <TabPanel value={tab} index={3}>
        Coming soon...
      </TabPanel>

      <h5>Command</h5>
      <div>
        <TextField
          id="command-field"
          label="Command: to do"
          style={{ margin: 8 }}
          placeholder="The command "
          helperText="helper for command"
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
          placeholder = {example}
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
          onChange={handleConfig}
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
          placeholder= "Tags"
          helperText="helper for tags - to do"
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

        {/* <button type="submit"  onClick={handleSubmit}>Submit</button>
        <button type="button" >Cancel</button> */}
      </div>

    </div>
  );
}


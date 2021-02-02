

//     constructor(props) {
//       super(props);
//       this.state = {
//         hw: null,
//       };
  
//       this.handleChange = this.handleChange.bind(this);
//     }
  
//     handleChange(e) {
//       console.log("Hardware Selected");
//       this.setState({ hw: e.target.value });
//     }
  


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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

import Editor from "@monaco-editor/react";
// import files from "./files";

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
    width: '10ch',
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
}));

const hw_options = [
    {
      label: "BrainScaleS",
      value: "bss",
    },
    {
      label: "SpiNNaker",
      value: "spnn",
    },
    {
      label: "BrainScaleS-ESS",
      value: "ess",
    },
    {
      label: "Spikey",
      value: "spikey",
    },
  ];

  const thetext = ''

  // MONACO
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

export default function CreateJob() {
  const classes = useStyles();

  const [hw, set_hw] = React.useState('');

  const handleChange = (event) => {
    set_hw(event.target.value);
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [fileName, setFileName] = React.useState("run.py");

  const files = {
    "run.py": {
      name: "run.py",
      language: "javascript",
      value: 'someJSCodeExample'
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: 'someCSSCodeExample'
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: 'someHTMLCodeExample'
    }
  };

  const file = files[fileName];

  return (
    <div className={classes.root}>
      <h5>Hardware Platform</h5>

      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="hardware-simple-select">Hardware</InputLabel>
        <Select
          labelId="hardware-simple-select"
          id="hardware-simple-select"
          value={hw}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {hw_options.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
        </Select>
        <FormHelperText>Please choose a simulation platform</FormHelperText>
      </FormControl>
      </div>
      <br/>

      <h5>Code</h5>

      {/* <AppBar position="static" color="default"> */}
        <Tabs
          value={value}
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
      <TabPanel value={value} index={0}>
         
      <div>

        <Editor
        height="20vh"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
        defaultLanguage="python"
        defaultValue="// some comment"
        />
      </div>
      
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField
            id="github-url"
            label="Github link"
            style={{ margin: 8 }}
            placeholder=""
            helperText="Please type the URL of a version control repository"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
      </TabPanel>
      <TabPanel value={value} index={2}>
        to do...
      </TabPanel>
      <TabPanel value={value} index={3}>
        Coming soon...
      </TabPanel>

      <h5>Command</h5>
      <div>
        <TextField
          id="outlined-full-width"
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
        />
      </div>
      <br/>
                
      <h5>Hardware Config</h5>
      <div>
      {/* <AppBar position="static" color="default"> */}
        <TextField
          id="hw-config"
          label="Hardwae config"
          style={{ margin: 8 }}
          placeholder= {file.value}
          helperText="helper"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
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
          placeholder={handleEditorChange}
          helperText="helper for tags - to do"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>

      <br/>
                
      <h5>Input Files</h5>
      <div>
        <TextField
          id="input-files"
          label="input to do"
          style={{ margin: 8 }}
          placeholder="Input Files: to do"
          helperText="to do"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
}

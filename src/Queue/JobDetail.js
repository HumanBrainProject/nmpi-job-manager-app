import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";

import { makeStyles,withStyles } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CodeIcon from '@material-ui/icons/Code';
import StorageIcon from '@material-ui/icons/Storage';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LaunchIcon from '@material-ui/icons/Launch';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@mui/material/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Link } from "react-router-dom";
import { jobQueueServer } from "../globals-prod";
import {timeFormat} from '../utils';
import ExportToDrive from './ExportToDrive';
import ExportToBucket from './ExportToBucket';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Popover from '@mui/material/Popover';
import DownloadIcon from '@mui/icons-material/Download';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const imgLink =
  "https://drive.ebrains.eu/media/avatars/default.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0b6623',
    },
    secondary: {
      main: red[500],
    },
    warning: {
      main: yellow[500],
    },

  },

  });



const useStyles = makeStyles((theme) => ({

  root: {
    margin: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    //fontWeight: theme.typography.fontWeightRegular,
    fontWeight: '550',




  },
  expansion_panel_details:{

    backgroundColor:'#f8f8ff',
    fontFamily:'Futura',
    'font-size': '14px',

  },
  expansion_panel_summary:{
    margin: {right:2},
    fontStyle: 'bold',
    fontFamily:'Helvetica',
    backgroundColor:'#f2f2f2',

  },
  comments_panel:{
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#f2f2f2',
      opacity: [0.9, 0.8, 0.7],
    },
  },
  chip_styling:{
    color:'#FFFFFF',
    fontSize:"h7.fontSize",
      fontWeight:"fontWeightMedium",
    backgroundColor: '#292965',
    '&:hover': {
      backgroundColor: '#44449E',
      opacity: [0.9, 0.8, 0.7],
    },
  },
  download_button_info:{
    backgroundColor: '#404188',
    color:'#FFFFFF',
    textTransform: 'none',


  },
  download_button_icon:{
    backgroundColor: '#2F3178',
    color:'#FFFFFF',

  },


}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function JobDetail(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [copy2bucket, setCopy2Bucket] = React.useState(false);
  const handleCopy2Bucket = () => setCopy2Bucket(true);
  let { collab_id,endpoint,id } = useParams();
  const [job, setJob] = useState({});
  const [comments, setComments] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [editedTagsList, seteditedTagsList] = useState([]);
  const [log, setLog] = useState(null);
  const [refreshComments, setRefreshComments] = useState(0);
  const [commentField, setCommentField] = useState("");
  const [editedCommentField, setEditedCommentField] = useState("");
  const [openCommentEdit, setOpenCommentEdit] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState(0);
  const [openTagsEdit, setOpenTagsEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAlertCopy, setOpenAlertCopy] = useState(false);
  const [openAlertDone, setOpenAlertDone] = useState(false);
  const [openAlertSize, setOpenAlertSize] = useState(false);
  const [openAlertCopy2, setOpenAlertCopy2] = useState(false);
  const [openAlertDone2, setOpenAlertDone2] = useState(false);
  const openPopover = Boolean(anchorEl);
  const popoverid = open ? 'simple-popover' : undefined;
  let queueUrl= `${jobQueueServer}/api/v2/` +`/queue/${id}`;
  let resultUrl = `${jobQueueServer}/api/v2/` +`/results/${id}`

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


function handlesubmit(){
  const jobUrl=`/api/v2/results/${id}`;

  const options = {
    method: 'POST',
    url: 'https://nmpi.hbpneuromorphic.eu/api/v2/comment/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.auth.token,
    },
    data: {
      content: commentField,
      job: jobUrl,
      user: props.auth.tokenParsed["preferred_username"]
    }
  };
  
  axios.request(options).then(function (response) {setRefreshComments(refreshComments+1);
    setCommentField("");
  }).catch(function (error) {
    console.error(error);
  });


}
function handleAddTag()
{
  const jobUrl=`/api/v2/results/${id}`;
  let requestUrl="";
  if (endpoint==="f"){requestUrl=resultUrl;}
  else{requestUrl = queueUrl}
  const options = {
    method: 'patch',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.auth.token,
    },
    data: {
tags:[...job.tags,...editedTagsList],
    }
  };
  
  axios.request(options).then(function (response) {

    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });




}

function handleEditcomment()

{
  const resultUrl = `${jobQueueServer}/api/v2/results/${id}`;
  const jobUrl=`/api/v2/results/${id}`;

  const options = {
    method: 'patch',
    url: 'https://nmpi.hbpneuromorphic.eu/api/v2/comment/'+editedCommentId,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.auth.token,
    },
    data: {
      content: editedCommentField,
      job: jobUrl,
      user: props.auth.tokenParsed["preferred_username"]
    }
  };
  
  axios.request(options).then(function (response) {setRefreshComments(refreshComments+1);
    setEditedCommentField("");
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });




}

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
      }
    }

    console.log("token",props.auth.token)
    let requestUrl=""

    if (endpoint==="f"){requestUrl=resultUrl;}
   else{requestUrl = queueUrl}

  
    axios(requestUrl, config).then((result)=>{ 
        setJob(result.data);
      console.log(result.data)}).catch((error)=>{
        console.log(error)
      })
      
   
    
  }, []);


useEffect(()=>{
  const tagsUrl = `${jobQueueServer}/api/v2/` + '/tags/?collab_id=' + collab_id;
  const config = {headers: {'Authorization': 'Bearer ' + props.auth.token}};
  let currentAvailableTags = [];
   axios.get(tagsUrl, config)
      .then(res => {
        
        res.data.objects.forEach(tag => {
          currentAvailableTags.push(tag.name);
            }
        );
        currentAvailableTags.sort();
        console.log("current tags",currentAvailableTags.map(String));

          }
          )
      .catch(error => {
        console.log(error)
        //this.setState({errorMsg: 'Error retreiving data'})
      })
/*       this.setState({
        tagList: availableTags.map(String)
      }); */

      setAvailableTags(currentAvailableTags)
      console.log('---taglist?---', availableTags)
},[]);


  function compare( a, b ) {
    if ( timeFormat(a.created_time) > timeFormat(b.created_time)){
      return -1;
    }
    if ( timeFormat(a.created_time) < timeFormat(b.created_time) ){
      return 1;
    }
    return 0;
  }
  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
      }
    }
    const commentstUrl = `${jobQueueServer}/api/v2/` +`/comment`;
    let currentJobComments=[]
    let currentJobID= `/api/v2/results/${id}`
    const fetchData = async () => {
      const result = await axios(commentstUrl, config);      

      for ( const comment of result.data.objects) 
      
          { 
            
            if (comment.job===currentJobID) 
              {
                currentJobComments.push(comment)
                currentJobComments.sort(compare);
              }
    
       }

      await setComments(currentJobComments);
    };
    fetchData();
  }, [refreshComments]);





  const classes = useStyles();

  const getLog = async (jobId) => {
    const logUrl = `${jobQueueServer}/api/v2/log/${jobId}`;
    const config = {headers: {'Authorization': 'Bearer ' + props.auth.token}};
    return axios.get(logUrl, config)
  };

  const handleOpenLog = async (event, expanded) => {
    if (expanded) {
      if (log === null) {
        getLog(id)
        .then(res => {
          setLog(res.data.content);
        })
        .catch(err => {
          console.log("error getting log");
        })
      }
    }
  };

  return(
    <ThemeProvider theme={theme}>

    <div style={{marginBottom:"2%",marginTop:"1%"}}>



        <div style={{marginLeft:"1%",marginRight:"2%",}}>
        <div style={{ display: 'flex'}}>
        <Paper elevation={3} style={{paddingLeft:"1%", paddingBottom:"0.1%",width:"30%",marginBottom:"1%"}} >
        <Box component="span" display="block" fontSize="h4.fontSize"  fontWeight="fontWeightMedium">Job {id}</Box>

        <p>
        <div style={{ display: 'flex'}}>
          <div style={{ float: 'left'}}>
            {job.status === 'finished' ? <Chip avatar={<Avatar><CheckCircleOutlineIcon /></Avatar>} label="Finished"
              color="primary"  /> :job.status === 'error'
            ? (  <Chip avatar={<Avatar><ErrorOutlineIcon /></Avatar>} label={job.status}
              color="secondary" /> ) :
              (  <Chip avatar={<Avatar style={{backgroundColor:'#dbc300' , color:'white'}}><LoopOutlinedIcon /></Avatar>} label={job.status}
                style={{backgroundColor:'#dbc300', color:'white'}}  /> ) }
          </div>


      </div>
        </p>

        <p>

        <Box hover="true" component="span" display="block" fontSize="13px"  > Submitted on <strong >{timeFormat(job.timestamp_submission)}</strong> by <strong >{job.user_id}</strong> to <strong >{job.hardware_platform}</strong>
        </Box>
        
        {(job.status==="finished"||job.status==="error")?<Box component="span" display="block" fontSize="13px"  > Completed on <strong> {timeFormat(job.timestamp_completion)}</strong></Box>:<Box component="span" display="block" fontSize="13px"  > <strong></strong></Box> }
  
        </p>

        </Paper>
<div style={{ float: 'left', paddingBottom:"2%",paddingLeft:"2%",paddingTop:"0.5%", width:"20%"}} >
        <div style={{  paddingBottom:"5%",paddingLeft:"2%",paddingTop:"0.5%"}}>
        <Tooltip title="Edit & Resubmit">
        <Link to={'/'+collab_id+'/'+ job.id+'/resubmit'}> <Button  style={{backgroundColor:'#134e6f', color:'white' ,textTransform: 'none',width:"100%"}}  variant="contained" startIcon={<EditIcon />} > Resubmit
          </Button> </Link>
          </Tooltip>
       </div>
       <div style={{paddingBottom:"5%",paddingLeft:"2%",paddingTop:"0.5%"}} key='drive' className="drive-button">
       <Box sx={style}>

       <Tooltip title="Copy output files to the Drive">
        
       <Button disabled={(job.output_data && job.output_data.length>0)? false:true} onClick={handleOpen}  style={{backgroundColor:'#101b54', color:'white',disabledBackground: 'grey' ,textTransform: 'none' ,width:"100%"}}  variant="contained" startIcon={<CloudDownloadIcon />} > Export to the Drive
         </Button> 
         </Tooltip>

        <ExportToDrive auth={props.auth} 
                      files={job.output_data} 
                      jobId={job.id} collab={job.collab_id} 
                      DriveFilesExplorerStatus={open} setDriveFilesExplorerStatus={setOpen}
                      openAlertCopy={openAlertCopy} setOpenAlertCopy={setOpenAlertCopy}
                      openAlertDone={openAlertDone} setOpenAlertDone={setOpenAlertDone}
                      openAlertSize={openAlertSize} setOpenAlertSize={setOpenAlertSize}/>
        <Collapse in={openAlertCopy} >
            <Alert severity="info" 
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
        <Collapse in={openAlertDone} >
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
        <Collapse in={openAlertSize} >
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
         </Box>


      </div>
      
       <div style={{paddingBottom:"5%",paddingLeft:"2%",paddingTop:"0.5%"}} key='bucket' className="bucket-button">
       <Box sx={style}>

       <Tooltip title="Copy output files to the Collab's Bucket">
        
       <Button disabled={(job.output_data && job.output_data.length>0)? false:true} onClick={handleCopy2Bucket}  style={{backgroundColor:'#101b54', color:'white',disabledBackground: 'grey' ,textTransform: 'none' ,width:"100%"}}  variant="contained" startIcon={<CloudDownloadIcon />} > Export to the Bucket
         </Button> 
         </Tooltip>

         <ExportToBucket auth={props.auth} 
                        files={job.output_data} 
                        jobId={job.id} collab={job.collab_id} 
                        copy2bucket={copy2bucket} // setDriveFilesExplorerStatus={setOpen}
                        openAlertCopy={openAlertCopy2} setOpenAlertCopy={setOpenAlertCopy2}
                        openAlertDone={openAlertDone2} setOpenAlertDone={setOpenAlertDone2}/>
        {console.log(openAlertCopy2)}
         <Collapse in={openAlertCopy2} >
            <Alert severity="info" 
              icon={<CircularProgress size="1.3rem" />}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlertCopy2(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
            File copy in progress
            </Alert>
        </Collapse>
        <Collapse in={openAlertDone2} >
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlertDone2(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
          File copy done with success
          </Alert>
        </Collapse>
        </Box>


      </div>
      </div>
              </div>

              <div>
              {(job.tags?.length!==0)? <Paper elevation={3} style={{paddingLeft:"1%", paddingBottom:"0.1%",width:"30%",marginBottom:"1%",}} >
              <Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
> 

<Grid item xs="auto"   style={{paddingTop:"2%",paddingLeft:"0.5%", paddingBottom:"1%",paddingRight:"2%",marginBottom:"1%",}}>
              
              <Chip className={classes.chip_styling} 
              
                label={"Tags:"}
                
              />
            
            </Grid>
            
            
            {job.tags?.map((data) => {
      
/*               if (data.label === 'React') {
                icon = <TagFacesIcon />;
              } */
      
              return (
                <Grid item xs="auto" style={{paddingTop:"2%",paddingLeft:"1%", paddingBottom:"1%",paddingRight:"1%",marginBottom:"1%",}}>
                
                  <Chip
                  className={classes.chip_styling}
                    icon={<LocalOfferIcon sx={{ color: "#FFFFFF" }} />}
                    label={data}
                    
                  />
                
                </Grid>
              );
            })}

            <Grid item xs="auto"   style={{paddingTop:"2%",paddingLeft:"0.5%", paddingBottom:"1%",paddingRight:"1%",marginBottom:"1%",}}>
              
            <Chip className={classes.chip_styling} 
            icon={<AddCircleIcon sx={{ color: "#FFFFFF" }} />}
            onClick={()=>{setOpenTagsEdit(true);seteditedTagsList(job.tags)}}
              label="Add"
            />
          
          </Grid>

            </Grid>


            </Paper>
            
          :(        <Tooltip title="Add a tag">
          <Button onClick={()=>{setOpenTagsEdit(true);seteditedTagsList(job.tags)}} style={{backgroundColor:'#44449E', color:'white' ,textTransform: 'none',width:"30%"}}  variant="contained" startIcon={<EditIcon />} >  Add a tag
            </Button> 
            </Tooltip>
            
            )}

            <div >
            <Dialog
            open={openTagsEdit}
            onClose={()=>{
              
              
              //handleCloseCommentEdit
            setOpenTagsEdit(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={ true } maxWidth={"xl"}
            >
            <DialogTitle id="alert-dialog-title">
            <h5 style={{ display: 'inline' }} >{"Add a tag: "}</h5>
            
            </DialogTitle>
            <DialogContent  >
            <Autocomplete
            style={{marginTop:"1%"}}
            multiple
            id="Tag"
            
            options={availableTags}
            getOptionLabel={(option) => option}
            defaultValue={editedTagsList??[]}
            onChange={(event, newValue)=> {
             
              seteditedTagsList([...editedTagsList,newValue]);
            
            }}
            
            renderInput={(params) => <TextField {...params} label="Attributed tags" variant="outlined"   onChange={console.log(availableTags)}     
             />}
            />


            
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOpenTagsEdit(false);seteditedTagsList([]);;console.log("test")/* handleCloseCommentEdit */}}>Close</Button>
              <Button onClick={()=>{setOpenTagsEdit(false);handleAddTag();seteditedTagsList([]);console.log("test")/* handleEditComment */}}  color="success">
                Add
              </Button>
            </DialogActions>
            </Dialog>

            </div>

          </div>
        <Accordion defaultExpanded={true} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
          <Typography className={classes.heading}><DescriptionIcon /> Output files </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.expansion_panel_details}>
        {(job.output_data && job.output_data.length>0)? ( job.output_data.map((out_file,index) =>
        
        
        <div style={{marginTop:"0.5%",display:"flex",marginLeft:"1%"}}>
        <div style={{display:"inline-block",float:"left"}}>
        <Button style={{  backgroundColor: '#404188',
    color:'#FFFFFF', textTransform: 'none',width:"100%"}} variant="contained" onClick={handlePopoverClick}>
         <AttachFileIcon />  
         
        {"Output file "+(index+1)} </Button> 
        <Popover
  id={popoverid}
  open={openPopover}
  anchorEl={anchorEl}
  onClose={handlePopoverClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <Typography sx={{ p: 2 }}> {String(out_file.url)}</Typography>
</Popover>


</div>
<div style={{display:"inline-block",float:"left" }}>
        <Button style={{  backgroundColor: '#2F3178',
    color:'#FFFFFF', textTransform: 'none',width:"100%",}} variant="contained" >

<a style={{textTransform:'none',color:'#FFFFFF',textDecoration:'none',}} href= {String(out_file.url)} >

<DownloadIcon />



</a>

    </Button>
    </div>
        
        </div>
        ))
          : ('No files available')}


        </AccordionDetails>
      </Accordion>





        <Accordion defaultExpanded={true} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
          <Typography className={classes.heading} > <CodeIcon /> Code</Typography>
        </AccordionSummary>
        <AccordionDetails   className={classes.expansion_panel_details}>
          <Typography>
          <SyntaxHighlighter language="python" style={docco}>
          {String(job.code)}
        </SyntaxHighlighter>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion defaultExpanded={true} >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} >     <LaunchIcon /> Command</Typography>
      </AccordionSummary>
      <AccordionDetails  className={classes.expansion_panel_details}>

        <Typography>
        <SyntaxHighlighter language="bash" style={docco}>
        {String(job.command)}
      </SyntaxHighlighter>
        </Typography>
      </AccordionDetails>
    </Accordion>


    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} ><StorageIcon /> Hardware Config</Typography>
      </AccordionSummary>
      <AccordionDetails  className={classes.expansion_panel_details}>
      <List component="nav" aria-label="mailbox folders">
      <ListItem Box>
      <Box component="div" display="inline" width="300px">Platform:</Box>
<Box component="div" display="inline">{job.hardware_platform} </Box>

      </ListItem>

      <ListItem Box>
      <Box component="div" display="inline" width="300px">Ressource allocation ID:</Box>
      <Box component="div" display="inline">{(job.hardware_config)? (job.hardware_config.resource_allocation_id) : ("Undefined")} </Box>
      </ListItem>
      </List>




      </AccordionDetails>
    </Accordion>




    <Accordion defaultExpanded={true} >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} ><LocationOnIcon />Provenance</Typography>
      </AccordionSummary>
      <AccordionDetails  className={classes.expansion_panel_details}>
      <Box component="div" display="inline" width="300px" style={{paddingLeft:"15px"}}>Machine's IP :</Box>
      <Box component="div" display="inline">{(job.provenance) ?
        (String(job.provenance.spinnaker_machine)) : ("No details")
      }</Box>



      </AccordionDetails>
    </Accordion>

    <Accordion defaultExpanded={false} onChange={handleOpenLog} >
    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary} >
      <Typography className={classes.heading} >Log</Typography>
    </AccordionSummary>
    <AccordionDetails className={classes.expansion_panel_details}>


      <pre>{log}</pre>


    </AccordionDetails>
  </Accordion>

  <Box component="span" marginTop="3%" display="block" fontSize="h4.fontSize"  fontWeight="fontWeightMedium">Comments </Box>
  
</div>
<div>
  <Paper elevation={2} style={{marginLeft:"1%",paddingLeft:"1%", paddingBottom:"0.1%",width:"90%",marginBottom:"1%",paddingTop:"1%",marginTop:"1%"}} >


  <Box
  component="form"
  sx={{
    '& > :not(style)': { m: 10, width: '100ch' },

  }}
  noValidate
  autoComplete="off"
>

  <TextField 
  style={{ marginTop: "1%",width:"100%",paddingRight:"1%", marginBottom:"1%", textAlign: "left" }}
  id="outlined-basic" 
  multiline
  value={commentField}
  onChange={(event) => {setCommentField(event.target.value)}}
  label={"Comment on Job "+job.id} 
  
  variant="outlined" />

</Box>


  <Button
  onClick={handlesubmit}
  variant="contained"
  style={{marginBottom:"1%",textTransform: 'none',}}
  className={classes.button}
  endIcon={<SendIcon />}

>
  Post Comment
</Button>

</Paper>
      </div>

        
  
  {comments.map ((comment)=> (
  <div >
  <Paper elevation={3} className={classes.comments_panel} style={{marginLeft:"1%",paddingLeft:"1%", paddingBottom:"0.1%",width:"90%",marginBottom:"1%",paddingTop:"1%",marginTop:"1%"

}} >
  <Grid container wrap="nowrap" spacing={2}  >
  <Grid item>
    <Avatar alt="Remy Sharp" src={imgLink} />
  </Grid>
  <Grid justifyContent="left" item xs zeroMinWidth onClick={()=>{if (props.auth.tokenParsed["preferred_username"]===comment.user){setOpenCommentEdit(true);setEditedCommentId(comment.id);setEditedCommentField(comment.content)}}}>
    <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user}</h4>
    <p style={{ textAlign: "left" }}>
    <Typography style={{whiteSpace: "pre-line"}}>
      {comment.content}
      </Typography>
    </p>
    <p style={{ textAlign: "left", color: "gray" }}>
      {"Posted on "+ timeFormat(comment.created_time)}
    </p>
  </Grid>
</Grid>
</Paper>

<Dialog
open={openCommentEdit}
onClose={()=>{
  
  
  //handleCloseCommentEdit
setOpenCommentEdit(false)
}}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
fullWidth={ true } maxWidth={"xl"}
>
<DialogTitle id="alert-dialog-title">
<h5 style={{ display: 'inline' }} >{"Edit the selected comment: "}</h5>

</DialogTitle>
<DialogContent  >
<TextField 
  style={{ marginTop: "1%",width:"100%",paddingRight:"1%", marginBottom:"1%", textAlign: "left" }}
  id="outlined-basic" 
  multiline
  value={editedCommentField}
  onChange={(event) => {setEditedCommentField(event.target.value)}}
  label={"Edited comment "+editedCommentId+ " on Job "+job.id} 
  
  variant="outlined" />

</DialogContent>
<DialogActions>
  <Button onClick={()=>{setOpenCommentEdit(false);setEditedCommentField("");console.log("test")/* handleCloseCommentEdit */}}>Close</Button>
  <Button onClick={()=>{setOpenCommentEdit(false);handleEditcomment();console.log("test")/* handleEditComment */}}  color="success">
    Edit
  </Button>
</DialogActions>
</Dialog>


</div>
  
))}
  
  
  

    </div>
    </ThemeProvider>
  );
}

export default JobDetail;
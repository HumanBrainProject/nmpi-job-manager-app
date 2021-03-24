import React from 'react';
import axios from 'axios';
import {MdSearch, MdAddCircle,MdRefresh} from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { createMuiTheme, makeStyles, ThemeProvider,withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CodeIcon from '@material-ui/icons/Code';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import StorageIcon from '@material-ui/icons/Storage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

//const resultsUrl = 'https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json';
//const resultsUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=neuromorphic-testing-private';
const baseUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=';
const baseQueueUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/queue/?collab_id=';
// url used to get collabs' ids 
const baseGlobalUrl = "https://validation-v2.brainsimulation.eu";


/*const useStyles = makeStyles((theme) => ({

  spinIcon: { spin: false,

  },

}));
*/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0b6623',
    },
    secondary: {
      main: red[500],
    },
    running: {
      main: yellow[500],
    },
  },
  tableRow: {
    hover: {
       /// your styles...
      },
    },
    flexBox:{

      display: "flex",
    
    flexDirection:"row",

    },
  
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 16,
    fontWeight:"bold"
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  head: {

  },
  body: {

  },
}))(TableRow);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);
class JobList extends React.Component {

  constructor(props) {
    
    
    super(props)
    this.state = {
      jobs: [],
      provJobList: [],
      filteredJobs:[],
      tagList:[], 
      error: '',
      authToken: props.auth.token,
      refreshState: false,
      refreshDate :'',
      currentCollab:'neuromorphic-testing-private',
      collabList:[],
      page :0,
      rowsPerPage:10,
      orderBy:'jobID',
      order:'desc',
      filterBy:'',
      statusFilter:null,
      hardwareSystemFilter:null,
    }
    this.routeChange = this.routeChange.bind(this);
  }

  getTagsList = async()=> {
    const tagsUrl = baseUrl + 'tags/?collab_id=' + this.props.collab;
    const config = {headers: {'Authorization': 'Bearer ' + this.state.authToken}};
    await axios.get(tagsUrl, config)
        .then(res => {
          console.log(res);
          // this.setState({jobs: response.data.objects});
          let availableTags = [];
          res.data.objects.forEach(tag => {
              console.log(tag.name);
              availableTags.push(tag.name);
              }
          );
          availableTags.sort();
          console.log(availableTags);
          this.setState({
            tagList: availableTags.map(String)
          });
            }
            )
        .catch(error => {
          console.log(error)
          this.setState({errorMsg: 'Error retreiving data'})
        })
    
        console.log('---taglist?---', this.tagList)
}
async filterJobs(statusFilter,hardwareSystemFilter){
  console.log("hardware is "+hardwareSystemFilter+"status is "+statusFilter)
    function isStatus(x) {
  
      return x.status===statusFilter;
  }
  function isHardware(x) {
  
    return String(x.hardware_platform)===hardwareSystemFilter;
    
  }
  
  if ((statusFilter===null )  && (hardwareSystemFilter===null ))
  {
    
    
    
    await this.setState({
  
    filteredJobs: this.state.jobs,
    hardwareSystemFilter:null,
    statusFilter:null,
  });
  
  
  }
  else {
  
    if (statusFilter===null ) {
      console.log("here null status")
      await this.setState({
        statusFilter:null,
        filteredJobs: this.state.jobs,
      });
  
  
     }
  
     if (hardwareSystemFilter===null ) {
      console.log("here null hardware")
      await this.setState({
        hardwareSystemFilter:null,
        filteredJobs: this.state.jobs,
      });
  
  
     }
    if (statusFilter!==null )
  {var filteredJobs1;
  filteredJobs1 = this.state.filteredJobs.filter(isStatus);
  await this.setState({
    filterBy: "status",
    filteredJobs: filteredJobs1,
    statusFilter:statusFilter,
  
  });
  console.log(this.state.statusFilter)
  }
  
  if (hardwareSystemFilter!==null )
  {var filteredJobs2;
    console.log("here not null hardware")
  
  filteredJobs2 = this.state.filteredJobs.filter(isHardware);
  await this.setState({
    filterBy: "hardware",
    filteredJobs: filteredJobs2,
    hardwareSystemFilter:hardwareSystemFilter,
  
  });
  console.log(this.state.hardwareSystemFilter)
  }
  
  
  }
  }
  
  routeChange(id) {
    let path = '/'+String(id); 
    this.props.history.push(path);
  }
  

   getCollabList= async()=> {
    const url = baseGlobalUrl + "/projects";
    const config = {headers: {'Authorization': 'Bearer ' + this.state.authToken}};
    await axios.get(url, config)
        .then(res => {
            let editableProjects = [];
            res.data.forEach(proj => {
                if (proj.permissions.UPDATE) {
                    editableProjects.push(proj.project_id);
                }
            });
            editableProjects.sort();
            this.setState({
              collabList: editableProjects.map(String)
            });
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });


}
handleChangePage = async (event, newPage) => {
  console.log(this.state.page);
  console.log("page num");
 await this.setState({page:newPage});
};

handleChangeRowsPerPage = (event) => {
 let nextRowsPerPage =parseInt(event.target.value, 10);
 this.setState({rowsPerPage:nextRowsPerPage});
 this.setState({page:0});
 //let currEmptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - page * rowsPerPage);
};

sortData = (sortBy, sortOrder) => {
 var itemsToSort = this.state.filteredJobs;
 var sortedItems = [];
 var compareFn = null;
 switch (sortBy) {
   case "jobID":
     compareFn = (i, j) => {
       if (i.id < j.id) {
         return sortOrder === "asc" ? -1 : 1;
       } else {
         if (i.id > j.id) {
           return sortOrder === "asc" ? 1 : -1;
         } else {
           return 0;
         }
       }
     };
     break;
/*     case "creator":
     compareFn = (i, j) => {
       var indexOfI = monthMap.indexOf(i.bmonth);
       var indexOfJ = monthMap.indexOf(j.bmonth);
       if (indexOfI < indexOfJ) {
         return sortOrder === "asc" ? -1 : 1;
       } else {
         if (indexOfI > indexOfJ) {
           return sortOrder === "asc" ? 1 : -1;
         } else {
           return 0;
         }
       }
     };
     break; */
   default:
     break;
 }
 sortedItems = itemsToSort.sort(compareFn);
 return sortedItems;
};

requestSort(pSortBy) {
 var sortBy = this.state.sortBy;
 var sortOrder = this.state.sortOrder;
 return event => {
   if (pSortBy === this.state.sortBy) {
     sortOrder = sortOrder === "asc" ? "desc" : "asc";
   } else {
     sortBy = pSortBy;
     sortOrder = "desc";
   }
   var sortedItems = this.sortData(sortBy, sortOrder);
   this.setState({
     sortOrder: sortOrder,
     sortBy: sortBy,
     filteredJobs:sortedItems
   });
 };
}

  fetchData=async ()=>{

    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.authToken,
      }
    }
    let resultsUrl = baseUrl+this.props.collab;
    let queueUrl = baseQueueUrl +this.props.collab;


    let currentdate = new Date();
    let fetchDataDate = "Last updated: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

    await axios.get(resultsUrl, config)
    .then(response => {
      let initial_list = []
      console.log(response);
      this.setState({provJobList: initial_list.concat(response.data.objects)});
      var mydate = new Date(response.data.objects.date);
      var date = mydate.toString("jj/MM/yyyy");
      console.log("date : " + date);
      this.setState({date: date});
      // this.state.jobs.map(job => {
      //   handleTags(job, this.tagList)
      // })
      console.log(this.state.date)
      this.setState({refreshState:false});
      this.setState({refreshDate:fetchDataDate})
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })

   await axios.get(queueUrl, config)
    .then(response => {
      console.log(response);
      console.log("queue response");
      this.setState({provJobList: this.state.provJobList.concat(response.data.objects)});
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })
    console.log(this.state.jobs);
    console.log(this.state.provJobList);
    const sortedJobs = [].concat(this.state.provJobList)
    .sort((a, b) => parseFloat(b.id) - parseFloat(a.id) );

    this.setState({jobs: sortedJobs});
    this.setState({filteredJobs: sortedJobs});


  }


onCollabChange= async (newValue)=>{
// setState is asynchronous, i added await
  await this.props.setCollab(newValue);
  if (newValue) {
    this.fetchData();
  }
}

  async componentDidMount(){
    //this.setState({authToken: this.props.auth.token});
    await this.getCollabList();
    if (this.props.collab) {
      await this.fetchData();
    }

    console.log(this.state.collabList);


  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <div >
      <Paper elevation={1} style={{marginTop:"1%",paddingTop:"0.5%" ,marginBottom:"1%", marginLeft:"1%", marginRight:"2%"}} >
      <div style={{position:"relative",}} >
      <div style={{ height: 80 , marginLeft:"1%", marginTop:"1%",paddingRight:"1%",   position: "relative"}}>
      <Autocomplete
      id="Collab-list"
      options={this.state.collabList}
      getOptionLabel={(option) => option}
      defaultValue={this.props.collab}
      onChange={(event, newValue)=> { this.onCollabChange(newValue);}}
      style={{ width: 300 ,display:"inline-block"}}
      renderInput={(params) => <TextField {...params} label="Collab List" variant="outlined" />}
    />


    <div style={{ marginLeft :"1%" ,height: "60%" ,
              display:"inline-block", marginRight:"1%",position:"absolute", bottom:"30"}} >
              <Tooltip title="Reload Jobs">
              <Button style={{ marginLeft :"1%" ,height: "100%" ,
              display:"inline-block"}} onClick={()=>{this.fetchData();this.setState({refreshState:true});   } } color="primary ">  <FontAwesomeIcon icon={faRedo} color="#007bff" onClick={() => {}} spin={ this.state.refreshState=== true ? true : false } />        
              </Button>
              </Tooltip>
              </div>
              <div style={{ width: 200 ,display:"inline-block",float:"right",marginRight:"1%",}}>
              <Autocomplete
              id="Filter by platform"
              options={["BrainScaleS","SpiNNaker"]}
              getOptionLabel={(option) => option}
              defaultValue={null}
              onChange={(event, newValue)=> { console.log("the new value is "+newValue);this.filterJobs(this.state.statusFilter,newValue);}}
              
              renderInput={(params) => <TextField {...params} label="Filter by platform" variant="outlined" />}
              />

              </div>

              <div style={{ width: 200 ,display:"inline-block",float:"right",marginRight:"1%",}}>
              <Autocomplete
              id="Filter by status"
              options={["finished","error","submitted","running"]}
              getOptionLabel={(option) => option}
              defaultValue={null}
              onChange={(event, newValue)=> { this.filterJobs(newValue,this.state.hardwareSystemFilter);}}
              
              renderInput={(params) => <TextField {...params} label="Filter by status" variant="outlined" />}
              />

              </div>
              
            </div>
          </div>

          </Paper>

    <div style={{fontSize: '40 px'  ,marginLeft:"1%", marginRight:"2%" }} >
    <TableContainer component={Paper} >
      <Table  aria-label="Job list" style={{fontSize: "40px"}}>
        <TableHead>
          <TableRow  style={{ height: 'auto !important' }} >
          <StyledTableCell width="120 px" >
                        <Tooltip title="Create job">
                          <Link to="/new" ><MdAddCircle /></Link>
                          </Tooltip>
                          <Tooltip title="Reload Jobs">
                          <Button onClick={()=>{this.fetchData();this.setState({refreshState:true});   } } color="primary ">  <FontAwesomeIcon icon={faRedo} color="#007bff" onClick={() => {}} spin={ this.state.refreshState=== true ? true : false } />        
                           </Button>
                           </Tooltip>
                           </StyledTableCell>
                           <StyledTableCell component="td" style={{fontSize: "16px", fontWeight: "bold"}}>
                           <TableSortLabel
                           active={this.state.sortBy === "jobID"}
                           direction={this.state.sortOrder}
                           onClick={this.requestSort("jobID")}
                         >
                 
                          ID 
                 
                 
                         </TableSortLabel>
                           </StyledTableCell>
                 
                 
                           <StyledTableCell component="td" style={{fontSize: "16px", fontWeight: "bold"}}><DoneAllIcon /> Status </StyledTableCell>
                           <StyledTableCell component="td" style={{fontSize: "16px", fontWeight: "bold"}}><StorageIcon /> System </StyledTableCell>
                           <StyledTableCell component="td" style={{fontSize: "16px", fontWeight: "bold"}}><CodeIcon /> Code  </StyledTableCell>
                           <StyledTableCell component="td" style={{fontSize: "16px", fontWeight: "bold"}}> <ScheduleIcon /> Submitted on</StyledTableCell>
                           <StyledTableCell component="td" style={{fontSize: "16px", fontWeight: "bold"}}><AccountCircleIcon /> Submitted by </StyledTableCell>
                           
                           </TableRow>
                         </TableHead>
                         <TableBody  >
                         {
                          this.state.filteredJobs.slice(this.state.page * this.state.rowsPerPage,this.state.page * this.state.rowsPerPage +this.state.rowsPerPage ).map((job,index) =>
                          // if(this.state.jobs.tags==this.selectedTag){
                            // used striped rows shading 
                            <TableRow  component={Link}to={'/' + job.id}  key={job.id} hover='true' style ={ index % 2? {textDecoration: "none",background : "#f2f2f2" }:{textDecoration: "none", background : "white" }}>
                            
                            <StyledTableCell  component="td" scope="row"><Link to={'/' + job.id}> <MdSearch /></Link></StyledTableCell>
                            <StyledTableCell   component="td" scope="row"  >
                
                            {job.id}
                            
                
                            
                            </StyledTableCell>
                            
                            <StyledTableCell  component="td" scope="row">
                              <div>
                                {job.status === 'finished' ? <Chip avatar={<Avatar><CheckCircleOutlineIcon /></Avatar>} label="Finished" 
                                  color="primary"  /> :job.status === 'error' 
                                ? (  <Chip avatar={<Avatar><ErrorOutlineIcon /></Avatar>} label={job.status} 
                                  color="secondary" /> ) :
                                  (  <Chip avatar={<Avatar style={{backgroundColor:'#dbc300' , color:'white'}}><LoopOutlinedIcon /></Avatar>} label={job.status} 
                                     style={{backgroundColor:'#dbc300', color:'white'}}  /> ) }
                              </div>
                            </StyledTableCell> 
                            <StyledTableCell  component="td" scope="row">{job.hardware_platform}</StyledTableCell> 
                            <StyledTableCell  component="td" scope="row"><code>{job.code.substring(0,50) + "..."}</code></StyledTableCell> 
                            <StyledTableCell  component="th" scope="row">{String(job.timestamp_submission).slice(0,4)+"/"+String(job.timestamp_submission).slice(5,7)+"/"+String(job.timestamp_submission).slice(8,10)+" "+String(job.timestamp_submission).slice(11,19)}</StyledTableCell> 
                            <StyledTableCell  component="td" scope="row">{job.user_id}</StyledTableCell> 
                            </TableRow>)
                          // }
                        }
                
                
                
                
                        </TableBody>
                       </Table>
                       
                        </TableContainer>
                
                    </div>
                    <Paper elevation={1} style={{marginTop:"1%",paddingTop:"0.5%" ,marginBottom:"1%", marginLeft:"1%", marginRight:"2%"}} >
                <div >
                
                    <div  style={{ float:"left", paddingBottom:"2%",paddingLeft:"2%",paddingTop:"0.5%" }}  >
                    <WatchLaterIcon />  { this.state.refreshDate}
                    </div>
                
                
                
                    <div Style={{  paddingLeft:"20%", paddingBottom:"2%",paddingRight:"2%",paddingTop:"2%"}}>
                    <TablePagination
                    
                    component="div"
                    rowsPerPageOptions={[10,15,20,50]}
                    count={this.state.filteredJobs.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={(e,n)=>this.handleChangePage(e,n) }
                    onChangeRowsPerPage={ (e)=>this.handleChangeRowsPerPage(e)}
                
                  />
                  </div>
                  </div>
                  </Paper>
                      </div>
                      </ThemeProvider>
                      
                    )
                  };
                }
                
                
                
                export default JobList;
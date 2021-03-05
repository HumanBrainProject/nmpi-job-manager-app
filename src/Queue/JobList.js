import React from 'react';
import axios from 'axios';
import {MdSearch, MdAddCircle,MdRefresh} from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';


//const resultsUrl = 'https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json';
//const resultsUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=neuromorphic-testing-private';
const baseUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=';
// url used to get collabs' ids 
const baseGlobalUrl = "https://validation-v2.brainsimulation.eu";


/*const useStyles = makeStyles((theme) => ({

  spinIcon: { spin: false,

  },

}));
*/
class JobList extends React.Component {

  constructor(props) {
    
    
    super(props)
    this.state = {
      jobs: [],
      error: '',
      authToken: props.auth.token,
      refreshState: false,
      refreshDate :'',
      currentCollab:'neuromorphic-testing-private',
      collabList:[],
    }
    
  }

  // fetchData is a class method either bind it in constructor or use arrow functions


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

  fetchData=()=>{

    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.authToken,
      }
    }
    let resultsUrl = baseUrl+this.state.currentCollab;

 
    let currentdate = new Date();
    let fetchDataDate = "Last Sync on : " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();

    axios.get(resultsUrl, config)
    .then(response => {
      console.log(response);
      this.setState({jobs: response.data.objects});
      var mydate = new Date(response.data.objects.date);
      var date = mydate.toString("jj/MM/yyyy");
      console.log("date : " + date);
      this.setState({date: date});
      console.log(this.state.date)
      this.setState({refreshState:false});
      this.setState({refreshDate:fetchDataDate})
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })

  }


onCollabChange= async (newValue)=>{
// setState is asynchronous, i added await 
  await this.setState({currentCollab:newValue});
console.log(this.state.currentCollab);
 this.fetchData();

}

  async componentDidMount(){
    //this.setState({authToken: this.props.auth.token});
    await this.getCollabList();
    this.fetchData();
    
    console.log(this.state.collabList);

    
  }
  
  render() {
    return (
      <div >

<div style={{ height: 80 , marginLeft:"1%", marginTop:"1%",   position: "relative"}}>
      <Autocomplete
      id="Collab-list"
      options={this.state.collabList}
      getOptionLabel={(option) => option}
      defaultValue={this.state.currentCollab}
      onChange={(event, newValue)=> { this.onCollabChange(newValue);}}
      style={{ width: 300 ,display:"inline-block"}}
      renderInput={(params) => <TextField {...params} label="Collabs List" variant="outlined" />}
    />
    <Tooltip title="Reload Jobs">
    <Button style={{ marginLeft :"1%" ,height: "60%" ,     position: "absolute",
    bottom: 30,
     display:"inline-block"}} onClick={()=>{this.fetchData();this.setState({refreshState:true});   } } color="primary ">  <FontAwesomeIcon icon={faRedo} color="#007bff" onClick={() => {}} spin={ this.state.refreshState=== true ? true : false } />        
    </Button>
    </Tooltip>
    </div>
        <div className="row-fluid" >
          <div className="col-md-12">
            <table className="table table-striped table-condensed">
              <thead>
                  <tr>
                      <th  width="120 px">
                        
                          <a aria-hidden="true" href="/new" ><MdAddCircle /></a>
                          <Tooltip title="Reload Jobs">
                          <Button onClick={()=>{this.fetchData();this.setState({refreshState:true});   } } color="primary ">  <FontAwesomeIcon icon={faRedo} color="#007bff" onClick={() => {}} spin={ this.state.refreshState=== true ? true : false } />        
                           </Button>
                           </Tooltip>
                      </th>

                      <th>ID</th>
                      <th>Status</th>
                      <th>System</th>
                      <th>Code</th>
                      <th>Collab</th>
                      <th>Submitted on</th>
                      <th>Submitted by</th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.state.jobs.map(job =>
                  <tr>
                    <td><Link to={'/' + job.id}><MdSearch /></Link></td>
                    <td>{job.id}</td>
                    <td><span className={job.status === 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span></td>
                    <td>{job.hardware_platform}</td>
                    <td><code>{job.code.substring(0,77) + "..."}</code></td>
                    <td>{job.collab_id}</td>
                    <td>{job.timestamp_submission}</td>
                    <td>{job.user_id}</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>

        <div color="gray" style={{position: "relative", bottom:0, paddingLeft:"20px", paddingBottom:"20px"}}  >
        {this.state.refreshDate}
        </div>




      </div>

      
    )
  };
}



export default JobList;
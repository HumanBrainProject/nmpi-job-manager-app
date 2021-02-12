import React from 'react';
import axios from 'axios';
import {MdSearch, MdAddCircle,MdRefresh} from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core';


//const resultsUrl = 'https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json';
const resultsUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=neuromorphic-testing-private';
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
    }
    
  }

  // fetchData is a class method either bind it in constructor or use arrow functions
  fetchData=()=>{

    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.authToken,
      }
    }

 
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
      this.setState({refreshState:false});
      this.setState({refreshDate:fetchDataDate})
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })

  }
  componentDidMount(){
    //this.setState({authToken: this.props.auth.token});

    this.fetchData();
    
  }
  
  render() {
    return (
      <div >
        <div className="row-fluid" >
          <div className="col-md-12">
            <table className="table table-striped table-condensed">
              <thead>
                  <tr>
                      <th  width="120 px">
                        
                          <a aria-hidden="true" href="/new" ><MdAddCircle /></a>
 
                          <Button onClick={()=>{this.fetchData();this.setState({refreshState:true});   } } color="primary ">  <FontAwesomeIcon icon={faRedo} color="blue" onClick={() => {}} spin={ this.state.refreshState=== true ? true : false } />        
                           </Button>
   
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

        <div color="gray" style={{position: "absolute", bottom:0, paddingLeft:"20px", paddingBottom:"20px"}}  >
        {this.state.refreshDate}
        </div>
      </div>

      
    )
  };
}



export default JobList;
import React from 'react';
import axios from 'axios';
import {MdSearch, MdAddCircle} from 'react-icons/md';

import { Link } from "react-router-dom";

class JobList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      error: '',
    }
    //console.log("job.code : " + this.state.jobs.code);
  }
  componentDidMount(){
    axios.get('https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json')
    .then(response => {
      console.log(response);
      this.setState({jobs: response.data.objects});
      var mydate = new Date(response.data.objects.date);
      var date = mydate.toString("jj/MM/yyyy");
      console.log("date : " + date);
      this.setState({date: date});
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })
  }


  render() {
    //const { jobs } = this.state
    return (
      <div>
        <div className="row-fluid">
          <div className="col-md-12">
            <table className="table table-striped table-condensed">
              <thead>
                  <tr>
                      <th>
                          <a aria-hidden="true" href="/new" ><MdAddCircle /></a>
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
                    <td><span className={job.status == 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span></td>
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
      </div>
    )
  };
}



export default JobList;
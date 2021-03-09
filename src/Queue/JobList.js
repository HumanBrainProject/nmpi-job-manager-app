import React from 'react';
import axios from 'axios';
import {MdSearch, MdAddCircle} from 'react-icons/md';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { Link } from "react-router-dom";


//const resultsUrl = 'https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json';
const baseUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/';
const resultsUrl = baseUrl + 'results/?collab_id=neuromorphic-testing-private';
// const tagsUrl = baseUrl + 'tags/?collab_id=neuromorphic-testing-private';


function handleTags(job, tagList){
  if(job.tags != ''){ 
    console.log('---------- TAGS -----------', job.tags)
    tagList.push(job.tags)}
}

class JobList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      tagList:[], 
      error: '',
      // selectedTag: 'tag1'
    }
  }

  getTagsList = async()=> {
    const tagsUrl = baseUrl + 'tags/?collab_id=neuromorphic-testing-private';
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

  async componentDidMount(){
    await this.getTagsList();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.props.auth.token,
      }
    }
    axios.get(resultsUrl, config)
    .then(response => {
      console.log(response);
      this.setState({jobs: response.data.objects});
      var mydate = new Date(response.data.objects.date);
      var date = mydate.toString("jj/MM/yyyy");
      console.log("date : " + date);
      this.setState({date: date});
      // this.state.jobs.map(job => {
      //   handleTags(job, this.tagList)
      // })
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retreiving data'})
    })
  }
      
  render() {
    return (
      <div>
        <Autocomplete
        multiple
        id="tags-outlined"
        options={this.state.tagList}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search by tags"
            placeholder="Tags..."
            helperText="Please type a tags"
          />
        )}
      />
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
                  this.state.jobs.map(job =>{
                  // if(this.state.jobs.tags==this.selectedTag){
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
                  // }
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
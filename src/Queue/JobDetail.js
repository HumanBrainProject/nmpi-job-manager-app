import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";


function JobDetail(props) {
  let { id } = useParams();
  const[job, setJob] = useState({});

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
      }
    }
    // const resultUrl = `https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db_${id}.json`;
    const resultUrl = `https://nmpi-staging.hbpneuromorphic.eu/api/v2/results/${id}/?collab_id=neuromorphic-system-user-creation-workfl`;

    const fetchData = async () => {
      const result = await axios(resultUrl, config);
      setJob(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  return(
    <div>
      <h2>Job {id}</h2>
          <div>
            <p>
              <span className={job.status === 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span>
            </p>
            <p>
              <small class="ng-binding">
                Submitted {job.timestamp_submission} by {job.user_id} to <strong class="ng-binding">{job.hardware_platform}</strong>
              </small>
            </p>
            <div class="row-fluid">
              <div class="panel panel-default">
                <div class="panel-heading">Code</div>
                <div class="panel-body ng-pristine ng-untouched ng-binding ng-scope ng-valid ng-valid-required">
                  <pre>
                    {job.code}
                  </pre>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default JobDetail;
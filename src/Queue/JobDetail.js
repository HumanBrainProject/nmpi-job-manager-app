import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";

function JobDetail() {
  let { id } = useParams();
  const[jobs, setJobs] = useState({objects : []});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db_' + id + '.json',
      );
      setJobs(result.data);
    };
    fetchData();
  }, []);

  return(
    <div>
      <h2>Job {id}</h2>
        {jobs.objects.map(job => (
          <div>
            <p>
              <span className={job.status === 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span>
            </p>
            <p>
              <small class="ng-binding">Submitted {job.timestamp_submission}
                    by DUPERRIER Jonathan
                    to <strong class="ng-binding">{job.hardware_platform}</strong>
              </small>
            </p>
            <div class="row-fluid">
              <div class="panel panel-default">
                <div class="panel-heading">Code</div>
                <div class="panel-body ng-pristine ng-untouched ng-binding ng-scope ng-valid ng-valid-required">
                  {job.code}
                </div>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
}

export default JobDetail;
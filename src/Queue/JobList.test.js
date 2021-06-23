import React from 'react';
import { render , cleanup, fireEvent} from '@testing-library/react';
import { within } from '@testing-library/dom'
import JobList from './JobList.js';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';  
import {validationV2Url,apiV2Url } from '../Globals';
const collab = "neuromorphic-testing-private";
const baseUrl = apiV2Url+'/results/?collab_id=';
const baseQueueUrl =  apiV2Url +'/queue/?collab_id=';

const urlProjects = validationV2Url + "/projects";
//jest.mock('axios');
jest.mock('axios', () => ({ post: jest.fn(),create: jest.fn(),get: jest.fn() }));
const auth={key: 5000,};
afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

}));




test('renders job list', () => {

  const responseJobsList ={data:
    
    
  
    {objects:[
    {
      code: "https://github.com/msenoville/SpNN-test.git",
      collab_id: "neuromorphic-testing-private",
      command: "",
      comments: [],
      hardware_platform: "SpiNNaker",
      id: 153800,
      resource_uri: "/api/v2/results/153800",
      resource_usage: 15,
      status: "finished",
      tags: [],
      timestamp_completion: "2021-04-09T10:19:35.347000+00:00",
      timestamp_submission: "2021-04-09T10:17:11.752000+00:00",
      user_id: "msenoville"
    },
    {
      code: "# test of empty hardware config (in production)\n\nimport pyNN.spiNNaker\n",
      collab_id: "neuromorphic-testing-private",
      command: "",
      comments: [],
      hardware_platform: "SpiNNaker",
      id: 151471,
      resource_uri: "/api/v2/results/151471",
      resource_usage: 0,
      status: "finished",
      tags: [],
      timestamp_completion: "2021-03-24T10:41:48.800000+00:00",
      timestamp_submission: "2021-03-24T10:40:47.952000+00:00",
      user_id: "adavison"
    },
  
  ]
  }
}


const responseQueue = [ 
  {
    data: {
      meta: {
        limit: 1000,
        next: null,
        offset: 0,
        previous: null,
        total_count: 0
      },
      objects: []
    },
    status: 200,
    statusText: "OK",
    headers: {
      cacheControl: "no-cache",
      contentLength: "103",
      contentType: "application/json"
    },
    config: {
      url: "https://nmpi.hbpneuromorphic.eu/api/v2/queue/?collab_id=neuromorphic-testing-private",
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2MjM5ODE4MTMsImlhdCI6MTYyMzk4MDkxMywiYXV0aF90aW1lIjoxNjIzNzY5MjkyLCJqdGkiOiI2NWY4ODA1ZC00NTI1LTQxYzEtYmMxMC02MDU3NDYwYzUxYTQiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJqdXB5dGVyaHViIiwieHdpa2kiLCJ0ZWFtIiwiZ3JvdXAiXSwic3ViIjoiYWU2YmQ4NDQtNTA2Yy00ZGJhLWE0ZTAtNTNiYjlmYzdhYzljIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmV1cm9tb3JwaGljLXJlbW90ZS1hY2Nlc3MiLCJub25jZSI6ImNkZjczMDRiLTY3OTMtNGJhYi05NWI3LTJjOWU1ZDU0Mzk5NCIsInNlc3Npb25fc3RhdGUiOiI1YTBhMGM0MS1lNWI0LTQ0ZjMtYWIyZC05Zjk5MDY3ZTIzOTciLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbm1waS5oYnBuZXVyb21vcnBoaWMuZXUiLCJodHRwczovL2pvYi1tYW5hZ2VyLmhicG5ldXJvbW9ycGhpYy5ldSJdLCJzY29wZSI6InByb2ZpbGUgY29sbGFiLmRyaXZlIGNsYi53aWtpLndyaXRlIGNsYi53aWtpLnJlYWQgY2xiLmRyaXZlOndyaXRlIGVtYWlsIG9wZW5pZCBjbGIuZHJpdmU6cmVhZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFzc2VuIEFndWlsaSIsIm1pdHJlaWQtc3ViIjoiMzEwMjEwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFndWlsaSIsImdpdmVuX25hbWUiOiJIYXNzZW4iLCJmYW1pbHlfbmFtZSI6IkFndWlsaSIsImVtYWlsIjoiaGFzc2VuLmFndWlsaUBjbnJzLmZyIn0.VsOBUcQ2Ngsh4ozzz30vOw2MKipiSrllU_z_PQwVLR77XT45U9WxjYJ9j0_YQEvQ6iU7PjFloW-Cr3_KODR07HtgPhW2eqbx2weMWEdr6-gtX1iNKUidqLhEj4Fv9iNdANJWJyvCt8huKtnaZXZBw6K8OPQD5uVayHIQs-FKufttYqQhwb8ERKe_0C0oQZvMVjHqlbCaGsyGPbHT_dGh-rWcsualBaVWp3_D3uukje_CVKPsz8_g8FOzgpGlUv3WqiTEd6vRkJrUVgfc-QFC6Q8bYl9xRX88jPdEwhIvxawaQJKPcaZngJEb3D1IIJgdAsfMjHIexaSJrrgXaAFpPQ"
      },
      transformRequest: [
        null
      ],
      transformResponse: [
        null
      ],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1
    },
    reques: {}
  }



]


const responseCollabList ={
  data: [
    {
      project_id: "diversity-and-equal-opportunities-commit",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "nmc-jupytertestcollab",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "neuromorphic-testing-private",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "ebrains-tools-and-resource-documentation",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "innovation",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "multi-simulator-interaction-and-co-simul",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "wp1-sga3-coordination",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "reporting",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "neuromorphic",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "distributed-hackaton",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "wp5-files-for-hbp",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "kpi-sga3-work-in-progress",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "hbp-ebrains-use-cases",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-sga2-use-cases",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-central-coordina",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "analysis-tools-on-service-accounts",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "highlighted-collabs-coordination",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "collab-sga3-wp6-t3",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "sga3-output-documents",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "oidc-clients",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "kubernetes",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "technical-coordination",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "sga3-outcomes",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "sga3-d5-3-material",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "brain-awareness-week-social-media",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "wp6-files-for-hbp",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "sga3-milestone-documents",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "20201102-ebrains-training-backup-collab",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "governance-handbook-resources",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "town-hall-meeting-at-the-hbp-summit-2020",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "jupyter-user-group",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "demo-collab",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "ebrains-2023-review-results",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "town-hall-meetings",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "sga3-proposal-hbp-comments",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "hbp-welcome-and-farewell",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "test-collabv1-features",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "network-level-technical-coordination",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "tech-coordination-weeklies",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "general-personal-data-annex-for-the-data",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-sga3-data-management-plan",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "horizon-europe-funding-opportunities-202",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "querying-kg",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "sga3-t6-4",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "collab-robot",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "sga3-wp6-internal",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "ebrains-infrastructure-trainings",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "sga3-amendment-1-preparation",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "ebrains-tc-kick-off",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "open-research-data-report",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "emdesk",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-event-participation",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "admin-rep-collab",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "i-include",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "sga3-wp6-t6-7-monitoring",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-summit-2020-athens-public-material-c",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "matrix-communication",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "sib-meetings-documents",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "collaboratory-user-group",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "collaboratory-migration",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "review-of-sga3-reporting-and-deliverable",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "tc-kick-off",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "sga3-review-showcase",
      permissions: {
        VIEW: true,
        UPDATE: true
      }
    },
    {
      project_id: "webinars",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-showcases",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-engagement-strategyguidelines",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "wp6admin-sharedwithpco",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
    {
      project_id: "hbp-wide-accessible-documents",
      permissions: {
        VIEW: true,
        UPDATE: false
      }
    },
  ],
  status: 200,
  statusText: "OK",
  headers: {
    contentLength: "5682",
    contentType: "application/json",
  },
  config: {
    url: "https://validation-v2.brainsimulation.eu/projects",
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2MjQwMTMxMDQsImlhdCI6MTYyNDAxMjIwNCwiYXV0aF90aW1lIjoxNjIzNzY5MjkyLCJqdGkiOiJiNDI4Y2RkZS0zNDRhLTRhYmYtYTJkZS05OGMxMGEzMGVkYTQiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJqdXB5dGVyaHViIiwieHdpa2kiLCJ0ZWFtIiwiZ3JvdXAiXSwic3ViIjoiYWU2YmQ4NDQtNTA2Yy00ZGJhLWE0ZTAtNTNiYjlmYzdhYzljIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmV1cm9tb3JwaGljLXJlbW90ZS1hY2Nlc3MiLCJub25jZSI6IjNlZjM4ZTk4LWRhYWUtNGRkYi05ZmJhLTg2Mzc5ZWI3MjlmYyIsInNlc3Npb25fc3RhdGUiOiI1YTBhMGM0MS1lNWI0LTQ0ZjMtYWIyZC05Zjk5MDY3ZTIzOTciLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbm1waS5oYnBuZXVyb21vcnBoaWMuZXUiLCJodHRwczovL2pvYi1tYW5hZ2VyLmhicG5ldXJvbW9ycGhpYy5ldSJdLCJzY29wZSI6InByb2ZpbGUgY29sbGFiLmRyaXZlIGNsYi53aWtpLndyaXRlIGNsYi53aWtpLnJlYWQgY2xiLmRyaXZlOndyaXRlIGVtYWlsIG9wZW5pZCBjbGIuZHJpdmU6cmVhZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFzc2VuIEFndWlsaSIsIm1pdHJlaWQtc3ViIjoiMzEwMjEwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFndWlsaSIsImdpdmVuX25hbWUiOiJIYXNzZW4iLCJmYW1pbHlfbmFtZSI6IkFndWlsaSIsImVtYWlsIjoiaGFzc2VuLmFndWlsaUBjbnJzLmZyIn0.zvQGIYlxOFt58gf1V6iZrpq6Ogfd4jKBQjFkCtEO1ftq0u8Vph0HA1-F8ilJc87s5hIClsRJcySSEXHXXxazfdLRkC0JtGYEKVFx-BTx2oEC2VMg_hwycJ0wyv2Bw7QwGn_AUxYdUm5AZ8XnM7CotpMIodvhQPOQreJ1hwpjNHsKLNF_oEIMVCfAo2Yu-7U5JvhqoQtldc0YqaRvJ2mlA3AYmY3viAKaFNNa50INTYhE_4bkGCEs6XsQ_9aT_Lu6TzCQuxpqgyfhjrta6E1571MM5mrjNEaQnzQx-EDNev94qeBfq_CWhmVDnKhcmdpgyRez4ImeGbBqUIU-t_HWCg"
    },
    transformRequest: [
      null
    ],
    transformResponse: [
      null
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
  },
  request: {}
}

/*   const mockedResponse = Promise.resolve({responseJobsList
    
 });
 axios.get.mockResolvedValue(mockedResponse); */

 axios.get.mockImplementation((url) => {
  switch (url) {
    case urlProjects:
      return Promise.resolve({responseCollabList})
    case baseUrl+collab:
      return Promise.resolve({responseJobsList})
    case baseQueueUrl+collab:
      return Promise.resolve({responseQueue})
    default:
      return Promise.reject(new Error('not found')) 
  }
})

    const { getByText,getByTestId } = render(<BrowserRouter><JobList auth={auth} collab={collab} /></BrowserRouter> );

    const autocomplete = getByTestId('autocomplete');
    const input = within(autocomplete).getByRole('textbox')

    autocomplete.focus()

    fireEvent.change(input, { target: { value: collab } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(input.value).toEqual(collab)
 /* const testingCollab = getByTestId(collab);
    expect(testingCollab).toBeInTheDocument();  */
    const listAccordians = ["Status","System","ID","Code","Submitted on"];
    listAccordians.forEach(attribute=>
    {
     const columnName = getByText(attribute);
     expect(columnName).toBeInTheDocument();

    
    })
  });
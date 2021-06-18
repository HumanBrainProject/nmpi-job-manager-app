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

  const responseJobsList =[
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


/*   const mockedResponse = Promise.resolve({responseJobsList
    
 });
 axios.get.mockResolvedValue(mockedResponse); */

 axios.get.mockImplementation((url) => {
  switch (url) {
    case urlProjects:
      return Promise.resolve({responseJobsList})
    case baseUrl+collab:
      return Promise.resolve({responseJobsList})
    case baseQueueUrl+collab:
      return Promise.resolve({responseQueue})
/*     case '/items.json':
      return Promise.resolve({data: [{id: 1}, {id: 2}]})
    default:
      return Promise.reject(new Error('not found')) */
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
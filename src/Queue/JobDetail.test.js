import React from 'react';
import { render , cleanup, fireEvent,wait} from '@testing-library/react';
import axios from 'axios';
import JobDetail from './JobDetail.js';
import {apiV2Url} from '../Globals';
import { act } from 'react-dom/test-utils';

const auth={key: 5000,};


let config = {
  headers: {
    'Authorization': 'Bearer ' + auth.token,
  }
}
//afterEach(cleanup);


//jest.mock('axios', () => ({ post: jest.fn(),create: jest.fn(),get: jest.fn() }));
jest.mock('axios');

jest.setTimeout(30000);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1192652
  })
}));


test('mocking axios request', async () => {

  const jobExemple = {
    data: 
    
      {
    code: "https://github.com/msenoville/SpNN-test.git",
    hardware_platform: "SpiNNaker",
    hardware_config: {resource_allocation_id: 865},
    timestamp_completion: "2021-04-09T10:19:35.347000+00:00",
    timestamp_submission: "2021-04-09T10:17:11.752000+00:00",
    status: "finished",
    user_id: "msenoville",
    output_data:{
      id: 1192652,
      resource_uri: "/api/v2/dataitem/1192652",
      url: "http://spinnaker.cs.man.ac.uk/services/rest/output/neuromorphic-testing-private/153800/reports.zip"
    },
  }
  
    
  }

  const resultUrl = apiV2Url +`/results/`+jobExemple.data.output_data.id;
  axios.mockImplementation((url) => {
 switch (url) {
      case resultUrl: 
        return Promise.resolve({jobExemple})
/*       case baseUrl+collab:
        return Promise.resolve({responseJobsList})
      case baseQueueUrl+collab:
        return Promise.resolve({responseQueue}) */
  /*     case '/items.json':
        return Promise.resolve({data: [{id: 1}, {id: 2}]})*/
      default:
        return Promise.reject(new Error('not found '+url+' '+resultUrl)) 
    
    
  }
  })



  const { getByText } = render(<JobDetail auth={auth}  />);

/*   await wait(() => {
    expect(getByText('Output file 1'));
  }); */

  console.log("output test");

    const listAccordians = ["Code","Command","Log","Provenance","Hardware Config","Output files"];
    listAccordians.forEach(attribute=>
    {
     const accordianElement = getByText(attribute);
     expect(accordianElement).toBeInTheDocument();
     fireEvent.click(getByText(attribute));
    
    })


    await act(()=> Promise.resolve() )
  });
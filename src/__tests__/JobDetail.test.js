import React from 'react';
import { render , cleanup, fireEvent,wait} from '@testing-library/react';
import axios from 'axios';
import JobDetail from '../Queue/JobDetail.js';
import {apiV2Url} from '../Globals';
import {act} from 'react-dom/test-utils'

const auth={token: 5000,};


let config = {
  headers: {
    'Authorization': 'Bearer ' + auth.token,
  }
}
afterEach(cleanup);


//jest.mock('axios', () => ({ post: jest.fn(),create: jest.fn(),get: jest.fn() }));
jest.mock('axios');

//jest.setTimeout(30000);

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



  const logExemple  = {

      data: {
          content: "# [Machine]\n# #spalloc_server=192.168.240.254\n# spalloc_server=10.11.192.11\n# spalloc_user=JupyterUser\n\n[Reports]\nreports_enabled = True\nwrite_energy_report = TrueRunning from /tmp/job822657299473123837.tmp/SpNN-test; changing to spinnaker\nPATH environment variable\n/usr/local/gcc-arm-none-eabi-9-2019-q4-major/bin:/home/spinnaker/spinnaker3.6/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games\n/usr/local/gcc-arm-none-eabi-9-2019-q4-major/bin/arm-none-eabi-gcc\narm-none-eabi-gcc (GNU Tools for Arm Embedded Processors 9-2019-q4-major) 9.2.1 20191025 (release) [ARM/arm-9-branch revision 277599]\nCopyright (C) 2019 Free Software Foundation, Inc.\nThis is free software; see the source for copying conditions.  There is NO\nwarranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\n\nPython 3.6.8\nGoing back to /tmp/job822657299473123837.tmp/SpNN-test\ntotal 8\n-rw-rw-r-- 1 spinnaker spinnaker 2643 Apr  9 11:06 run.py\n-rw-rw-r-- 1 spinnaker spinnaker  163 Apr  9 11:06 spynnaker.cfg\n2021-04-09 11:18:20 INFO: Read cfg files: /home/spinnaker/spinnaker/SpiNNFrontEndCommon/spinn_front_end_common/interface/spinnaker.cfg, /home/spinnaker/spinnaker/sPyNNaker/spynnaker/pyNN/spynnaker.cfg, ./spynnaker.cfg\n2021-04-09 11:18:20 INFO: Will search these locations for binaries: /home/spinnaker/spinnaker/SpiNNFrontEndCommon/spinn_front_end_common/common_model_binaries : /home/spinnaker/spinnaker/sPyNNaker/spynnaker/pyNN/model_binaries\n2021-04-09 11:18:20 WARNING: A timestep was entered that has forced sPyNNaker to automatically slow the simulation down from real time by a factor of 10. To remove this automatic behaviour, please enter a timescaleFactor value in your .spynnaker.cfg\n2021-04-09 11:18:20 INFO: Setting time scale factor to 10.\n2021-04-09 11:18:20 INFO: Setting machine time step to 100 micro-seconds.\n2021-04-09 11:18:21 INFO: Simulating for 1000 0.1ms timesteps using a hardware timestep of 10us\n2021-04-09 11:18:21 INFO: Starting execution process\n2021-04-09 11:18:25 INFO: Time 0:00:04.542201 taken by HBPMaxMachineGenerator\nPreallocating resources for chip power monitor\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:26 INFO: Time 0:00:00.410422 taken by PreAllocateResourcesForChipPowerMonitor\nPre allocating resources for Extra Monitor support vertices\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:26 INFO: Time 0:00:00.301405 taken by PreAllocateResourcesForExtraMonitorSupport\nPartitioning graph vertices\n|0%                          50%                         100%|\n ============================================================\nPartitioning graph edges\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:36 INFO: Time 0:00:09.735951 taken by PartitionAndPlacePartitioner\n2021-04-09 11:18:46 INFO: Time 0:00:10.060128 taken by HBPAllocator\n2021-04-09 11:18:46 INFO: Creating transceiver for 10.11.196.9\n2021-04-09 11:18:46 INFO: Working out if machine is booted\n2021-04-09 11:18:50 INFO: Attempting to boot machine\n2021-04-09 11:18:56 INFO: Found board with version [Version: SC&MP 3.2.5 at SpiNNaker:0:0:0 (built Thu Aug  1 09:15:06 2019)]\n2021-04-09 11:18:56 INFO: Machine communication successful\n2021-04-09 11:18:56 INFO: Detected a machine on IP address 10.11.196.9 which has 856 cores and 120.0 links\n2021-04-09 11:18:56 INFO: Time 0:00:09.669730 taken by MachineGenerator\nGenerating partitioner report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.000562 taken by PartitionerReport\n2021-04-09 11:18:56 INFO: Time 0:00:00.000267 taken by NetworkSpecificationReport\nAllocating virtual identifiers\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.000879 taken by MallocBasedChipIDAllocator\nAdding Chip power monitors to Graph\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.003681 taken by InsertChipPowerMonitorsToGraphs\nInserting extra monitors into graphs\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.004439 taken by InsertExtraMonitorVerticesToGraphs\nWriting the board chip report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.010596 taken by BoardChipReport\nFiltering edges\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.011083 taken by GraphEdgeFilter\nPlacing graph vertices\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.013317 taken by OneToOnePlacer\nInserting edges between vertices which require FR speed up functionality.\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.004785 taken by InsertEdgesToExtraMonitorFunctionality\nGenerating routing tables for data in system processes\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.002186 taken by DataInMulticastRoutingGenerator\nGenerating fixed router routes\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.000905 taken by FixedRouteRouter\nGenerating placement report\n|0%                          50%                         100%|\n ============================================================\nGenerating placement by core report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.004892 taken by PlacerReportWithApplicationGraph\nRouting\n|0%                          50%                         100%|\n ============================================================\n\n2021-04-09 11:18:56 INFO: Time 0:00:00.001447 taken by NerRoute\nDiscovering tags\n|0%                          50%                         100%|\n ============================================================\nAllocating tags\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.003778 taken by BasicTagAllocator\nReporting Tags\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.000230 taken by TagReport\nGetting number of keys required by each edge using application graph\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.002004 taken by EdgeToNKeysMapper\nGetting constraints for application graph\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.001530 taken by ProcessPartitionConstraints\nAllocating routing keys\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.032493 taken by MallocBasedRoutingInfoAllocator\nGenerating Routing info report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.001687 taken by routingInfoReports\nGenerating routing tables\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.000807 taken by BasicRoutingTableGenerator\nFinding executable start types\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.004468 taken by LocateExecutableStartType\nInitialising buffers\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.041468 taken by BufferManagerCreator\nGenerating data specifications\n|0%                          50%                         100%|\n ======================================================/home/spinnaker/spinnaker3.6/lib/python3.6/site-packages/scipy/stats/_continuous_distns.py:6443: RuntimeWarning: invalid value encountered in multiply\n  mu2 = 1 + (a*pA - b*pB) / d - mu*mu\n======\n2021-04-09 11:18:56 INFO: Time 0:00:00.469965 taken by SpynnakerDataSpecificationWriter\nPreparing Routing Tables\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.002874 taken by RoutingSetup\nFinding binaries\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:18:56 INFO: Time 0:00:00.006254 taken by GraphBinaryGatherer\nRunning routing table compression on chip\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:01 INFO: Time 0:00:04.706898 taken by MundyOnChipRouterCompression\nGenerating Router table report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:01 INFO: Time 0:00:00.000603 taken by unCompressedRoutingTableReports\nloading fixed routes\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:01 INFO: Time 0:00:00.021674 taken by LoadFixedRoutes\nExecuting data specifications and loading data for system vertices\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:01 INFO: Time 0:00:00.168480 taken by HostExecuteSystemDataSpecification\nLoading system executables onto the machine\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:07 INFO: Time 0:00:05.889302 taken by LoadSystemExecutableImages\nClearing tags\n|0%                          50%                         100%|\n ============================================================\nLoading Tags\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:07 INFO: Time 0:00:00.003301 taken by TagsLoader\nWriting data\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:07 INFO: Time 0:00:00.044973 taken by WriteMemoryIOData\nExecuting data specifications and loading data for application vertices\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:09 INFO: Time 0:00:01.419219 taken by HostExecuteApplicationDataSpecification\nExpanding Synapses\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:16 INFO: Time 0:00:07.107463 taken by SynapseExpander\nWriting fixed route report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:16 INFO: Time 0:00:00.019859 taken by FixedRouteFromMachineReport\nLoading executables onto the machine\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: Time 0:00:12.829526 taken by LoadApplicationExecutableImages\nReading Routing Tables from Machine\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: Time 0:00:00.007078 taken by RoutingTableFromMachineReport\nGenerating compressed router table report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: Time 0:00:00.000433 taken by compressedRoutingTableReports\nGenerating comparison of router table report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: Time 0:00:00.000313 taken by comparisonOfRoutingTablesReport\n2021-04-09 11:19:29 INFO: Running for 1 steps for a total of 100.0ms\n2021-04-09 11:19:29 INFO: Run 1 of 1\nGenerating SDRAM usage report\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: Time 0:00:00.007806 taken by SdramUsageReportPerChip\nUpdating run time\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: Time 0:00:00.027049 taken by ChipRuntimeUpdater\n2021-04-09 11:19:29 INFO: Time 0:00:00.000164 taken by DatabaseInterface\n2021-04-09 11:19:29 INFO: ** Notifying external sources that the database is ready for reading **\n2021-04-09 11:19:29 INFO: Time 0:00:00.000590 taken by NotificationProtocol\n2021-04-09 11:19:29 INFO: *** Running simulation... *** \nLoading buffers\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:29 INFO: ** Awaiting for a response from an external source to state its ready for the simulation to start **\n2021-04-09 11:19:29 INFO: ** Sending start / resume message to external sources to state the simulation has started or resumed. **\n2021-04-09 11:19:29 INFO: ** Awaiting for a response from an external source to state its ready for the simulation to start **\n2021-04-09 11:19:29 INFO: Application started; waiting 1.1s for it to stop\n2021-04-09 11:19:30 INFO: ** Sending pause / stop message to external sources to state the simulation has been paused or stopped. **\n2021-04-09 11:19:30 INFO: Time 0:00:01.176756 taken by ApplicationRunner\nExtracting buffers from the last run\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:31 INFO: Time 0:00:01.007896 taken by BufferExtractor\nGetting provenance data from machine graph\n|0%                          50%                         100%|\n ============================================================\nGetting provenance data from application graph\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:31 INFO: Time 0:00:00.003055 taken by GraphProvenanceGatherer\nGetting provenance data\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:31 INFO: Time 0:00:00.012616 taken by PlacementsProvenanceGatherer\nGetting Router Provenance\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:31 INFO: Time 0:00:00.036283 taken by RouterProvenanceGatherer\nGetting profile data\n|0%                          50%                         100%|\n ============================================================\n2021-04-09 11:19:31 INFO: Time 0:00:00.006761 taken by ProfileDataGatherer\nDetected PyNN version 0.9.4 and Neo version 0.6.1\n['/home/spinnaker/spinnaker/SpiNNFrontEndCommon/spinn_front_end_common/interface/spinnaker.cfg', '/home/spinnaker/spinnaker/sPyNNaker/spynnaker/pyNN/spynnaker.cfg', './spynnaker.cfg']\n",
          resource_uri: "/api/v2/log/153800"
      },
      status: 200,
      statusText: "OK",
      config: {
          url: "https://nmpi.hbpneuromorphic.eu/api/v2/log/153800",
          method: "get",
          headers: {
              Accept: "application/json, text/plain, */*",
              Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2MjgyMDgzNDIsImlhdCI6MTYyODIwNzQ0MiwiYXV0aF90aW1lIjoxNjI4MTc4MjQ2LCJqdGkiOiI3MjhlNmUxYy0yY2EyLTQ0MWEtYjhiZC1mY2U3YmE0ZDcxYjQiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJqdXB5dGVyaHViIiwieHdpa2kiLCJ0ZWFtIiwiZ3JvdXAiXSwic3ViIjoiYWU2YmQ4NDQtNTA2Yy00ZGJhLWE0ZTAtNTNiYjlmYzdhYzljIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibmV1cm9tb3JwaGljLXJlbW90ZS1hY2Nlc3MiLCJub25jZSI6IjQ4NWFkNTYzLTg1ZWQtNDU0Zi04NmI5LTgxNzM3OWRlMjI2NiIsInNlc3Npb25fc3RhdGUiOiJkMGRkNDgzYy0zM2QyLTQ4NmItYWE1My03NmY5NGFhZTdlN2IiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbm1waS5oYnBuZXVyb21vcnBoaWMuZXUiLCJodHRwczovL2pvYi1tYW5hZ2VyLmhicG5ldXJvbW9ycGhpYy5ldSJdLCJzY29wZSI6InByb2ZpbGUgY29sbGFiLmRyaXZlIGNsYi53aWtpLndyaXRlIGNsYi53aWtpLnJlYWQgY2xiLmRyaXZlOndyaXRlIGVtYWlsIG9wZW5pZCBjbGIuZHJpdmU6cmVhZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFzc2VuIEFndWlsaSIsIm1pdHJlaWQtc3ViIjoiMzEwMjEwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFndWlsaSIsImdpdmVuX25hbWUiOiJIYXNzZW4iLCJmYW1pbHlfbmFtZSI6IkFndWlsaSIsImVtYWlsIjoiaGFzc2VuLmFndWlsaUBjbnJzLmZyIn0.inE6a4QTYyVWo-LV1wT8tG3ZGaicLINlT86aBMcbHp0kyPp81pFG47NGH0RoJx9gLpcFn2L9RRTHrpH-LdyuKM0xYeSVKbAyxlpqpaTMp1oYcZ1Sldq4GlKAyE_4COf9koHKfzhQl2FqNeZNLs-U-08j-IRgYkg1Pl6caeBS5YnYcNphGcqhxybbpz0JalesHKVDj5nGVC1w-O4eZlVsMtTw_evXvWSMqVo6nm-174_9tym4aGf3r-Ik9xRDhhg_dM58f_JThKsjCJwVg9gvgQyDhkur9GFLHGF44U7DmXhWq-eWHrKVTh_3IXByyd-pT67sAM8UVRQ2esXOq307Gw"
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
      request: {}

  }

  const resultUrl = apiV2Url +`/results/`+jobExemple.data.output_data.id;
  const logUrl = apiV2Url + `/log/`+jobExemple.data.output_data.id;
  axios.mockImplementation((url) => {
 switch (url) {
      case resultUrl: 
      console.log("used url",resultUrl)
        return Promise.resolve(jobExemple)
 case logUrl:
        return Promise.resolve(logExemple)
  /*
      case baseQueueUrl+collab:
        return Promise.resolve({responseQueue}) */
  /*     case '/items.json':
        return Promise.resolve({data: [{id: 1}, {id: 2}]})*/
      default:
        return Promise.reject(new Error('wrong url')) 
    
    
  }
  })

  console.log("test output");

  const { getByText } = render(<JobDetail auth={auth}  />);
  await act (() => Promise.resolve())


expect(axios).toHaveBeenCalledWith(resultUrl,config)

/*   await wait(() => {
    expect(getByText('Output file 1'));
  }); */



    const listAccordiansHeaders = ["Code","Command","Log","Provenance","Hardware Config","Output files"];
    listAccordiansHeaders.forEach(attribute=>
    {
     const accordianHeader = getByText(attribute);
     expect(accordianHeader).toBeInTheDocument();
     fireEvent.click(getByText(attribute));
    
    })



  });
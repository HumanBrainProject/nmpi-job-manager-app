import React, {Component} from 'react';

class CreateJob extends Component {
    constructor(){
      super();
      this.state = {
        curPage: 0,
        pageSize: 20,
        with_ctx: true,
        tags_list: {},
        status_list: {},
        hardware_list: {},
        hardware_choices: ["BrainScaleS", "SpiNNaker", "BrainScaleS-ESS", "Spikey"],
        status_choices:  ["submitted", "running", "finished", "error"],
      }
    }

    render() {
      return (
        <div>
          <h2>Create new job</h2>
        </div>
      );
    }
}

export default CreateJob;
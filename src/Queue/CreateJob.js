import React, {Component} from 'react';

const hw_options = [
  {
    label: "BrainScaleS",
    value: "bss",
  },
  {
    label: "SpiNNaker",
    value: "spnn",
  },
  {
    label: "BrainScaleS-ESS",
    value: "ess",
  },
  {
    label: "Spikey",
    value: "spikey",
  },
];

class CreateJob extends Component {

    constructor(props) {
      super(props);
      this.state = {
        hw: null,
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      console.log("Hardware Selected");
      this.setState({ hw: e.target.value });
    }
  
    render() {
      return (
        <div id="App">
          <h5>Hardware Platform</h5>
          <div className="select-container">
            <select onChange={this.handleChange}>
            <option disabled selected value> -- Please choose a simulation platform -- </option>
              {hw_options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <h5>Code</h5>
        </div>
      );
    }
  }

export default CreateJob;
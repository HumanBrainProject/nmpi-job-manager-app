import React, {Component} from 'react';
// import React from "react";
import Tabs from "./../Components/Tabs";


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

          <br/>
          
          <h5>Code</h5>

            <Tabs>
              <div label="Editor">
                to do
              </div>
              <div label="From Git repository or zip archive">
                to do 
              </div>
              <div label="From the Drive">
                to do
              </div>
            </Tabs>

          <br/>
          
          <h5>Command</h5>
          
            <form>
                <input type="text" name="command" />
            </form>

          <br/>
          
          <h5>Hardware Config</h5>

            <form>
                <input type="text" name="config" />
            </form>

          <br/>
          
          <h5>Tags</h5>

            <form>
                <input type="text" name="tag" />
            </form>

          <br/>
          
          <h5>Input Files</h5>

            <form>
                <legend>Enter temperature in :</legend>
                <input type="text" name="input" />
            </form>

        </div>
      );
    }
  }

export default CreateJob;
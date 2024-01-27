import { TextField } from "@mui/material";
import { parseArray, formatArray } from "../utils";

function BrainScaleSConfig(props) {
  // SOFTWARE_VERSION str;
  // WAFER_MODULE int;
  // HICANN int | list[int];
  // FPGA int;

  const expectsIntegerArray = ["HICANN"];

  const expectsInteger = ["WAFER_MODULE", "FPGA"];

  const handleChange = (configKey, value) => {
    const config = { ...props.config };
    if (expectsIntegerArray.includes(configKey)) {
      config[configKey] = parseArray(value).map((item) => parseInt(item.trim()) || null);
    } else if (expectsInteger.includes(configKey)) {
      config[configKey] = parseInt(value) || null;
    } else {
      config[configKey] = value;
    }
    props.onChange(config);
  };

  const removeEmptyItems = (configKey) => {
    const config = { ...props.config };
    if (config[configKey]) {
      config[configKey] = config[configKey].filter((item) => item !== null);
    }
    props.onChange(config);
  };

  return (
    <div>
      <TextField
        id="bss-config-software-version"
        label="Software version"
        helperText="The version of the BrainScaleS software stack to use."
        fullWidth
        variant="outlined"
        value={props.config.SOFTWARE_VERSION || ""}
        onChange={(event) => handleChange("SOFTWARE_VERSION", event.target.value)}
      />
      <TextField
        id="bss-config-wafer-module"
        label="Wafer module"
        helperText="The number of the wafer module to use."
        fullWidth
        variant="outlined"
        value={props.config.WAFER_MODULE || ""}
        onChange={(event) => handleChange("WAFER_MODULE", event.target.value)}
      />
      <TextField
        id="bss-config-hicann"
        label="HICANN"
        helperText="(Optional) A comma-separated list of HICANN numbers to use."
        fullWidth
        variant="outlined"
        value={formatArray(props.config.HICANN)}
        onChange={(event) => handleChange("HICANN", event.target.value)}
        onBlur={() => removeEmptyItems("HICANN")}
      />
      <TextField
        id="bss-config-fpga"
        label="FPGA"
        helperText="(Optional) The number of the FPGA to use."
        fullWidth
        variant="outlined"
        value={props.config.FPGA || ""}
        onChange={(event) => handleChange("FPGA", event.target.value)}
      />
    </div>
  );
}

export default BrainScaleSConfig;

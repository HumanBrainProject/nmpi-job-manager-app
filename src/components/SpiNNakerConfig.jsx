import { TextField } from "@mui/material";
import { parseArray, formatArray } from "../utils";

function SpiNNakerConfig(props) {
  //   extra_pip_installs: list[str];
  //   spynnaker_version: str;
  //   spinnaker_tools_version: str;
  //   extra_python_setups: list[str];
  //   extra_git_repositories: list[str];
  //   extra_makes: list[str];
  //   pyNN_version: str;

  const expectsArray = [
    "extra_pip_installs",
    "extra_python_setups",
    "extra_git_repositories",
    "extra_git_repositories",
    "extra_makes",
  ];

  const handleChange = (configKey, value) => {
    const config = { ...props.config };
    if (expectsArray.includes(configKey)) {
      config[configKey] = parseArray(value);
    } else {
      config[configKey] = value;
    }
    props.onChange(config);
  };

  const removeEmptyItems = (configKey) => {
    const config = { ...props.config };
    if (config[configKey]) {
      config[configKey] = config[configKey].filter((item) => item.length > 0);
    }
    props.onChange(config);
  };

  return (
    <div>
      <TextField
        id="spinn-config-spynnaker-version"
        label="sPyNNaker version"
        helperText="(Optional) The git tag or branch to run. If a “semantic” version is specified, each part of the tools will download a “matching” semantic version if possible, or use git master if no match is found. If any other name is used, each part of the tools will attempt to use a matching branch or tag from git, or git master if no match is found."
        fullWidth
        variant="outlined"
        value={props.config.spynnaker_version || ""}
        onChange={(event) => handleChange("spynnaker_version", event.target.value)}
      />
      <TextField
        id="spinn-config-spinnaker-tools-version"
        label="SpiNNaker tools version"
        helperText="(Optional) By default, a version of spinnaker tools will be used that works with the software version used above. If another version is required for any reason, this can be overridden here."
        fullWidth
        variant="outlined"
        value={props.config.spinnaker_tools_version || ""}
        onChange={(event) => handleChange("spinnaker_tools_version", event.target.value)}
      />
      <TextField
        id="spinn-config-extra-pip-installs"
        label="Extra Python packages to install"
        helperText="(Optional) Enter a comma-separated list of additional Python packages that should be installed using pip."
        fullWidth
        variant="outlined"
        value={formatArray(props.config.extra_pip_installs)}
        onChange={(event) => handleChange("extra_pip_installs", event.target.value)}
        onBlur={(event) => removeEmptyItems("extra_pip_installs")}
      />
      <TextField
        id="spinn-config-extra_git_repositories"
        label="Extra Git repositories"
        helperText="(Optional) Enter a comma-separated list of additional git repositories that should be cloned. The repository will be cloned into a sub-folder of the “current working directory” on the system, and so can be made use of when specifying the options below."
        fullWidth
        variant="outlined"
        value={formatArray(props.config.extra_git_repositories)}
        onChange={(event) => handleChange("extra_git_repositories", event.target.value)}
        onBlur={(event) => removeEmptyItems("extra_git_repositories")}
      />
      <TextField
        id="spinn-config-extra_makes"
        label="Extra makes"
        helperText="(Optional) Enter a comma-separated list of additional folders in which “make” should be called."
        fullWidth
        variant="outlined"
        value={formatArray(props.config.extra_makes)}
        onChange={(event) => handleChange("extra_makes", event.target.value)}
        onBlur={(event) => removeEmptyItems("extra_makes")}
      />
      <TextField
        id="spinn-config-extra-python-setups"
        label="Extra Python setups"
        helperText="(Optional) Enter a comma-separated list of additional folders in which to run “python setup.py install”."
        fullWidth
        variant="outlined"
        value={formatArray(props.config.extra_python_setups)}
        onChange={(event) => handleChange("extra_python_setups", event.target.value)}
        onBlur={(event) => removeEmptyItems("extra_python_setups")}
      />
      <TextField
        id="spinn-config-pyNN_version"
        label="PyNN version"
        helperText="(Optional) The version of the PyNN API to use"
        fullWidth
        variant="outlined"
        value={props.config.pyNN_version || ""}
        onChange={(event) => handleChange("pyNN_version", event.target.value)}
      />
    </div>
  );
}

export default SpiNNakerConfig;

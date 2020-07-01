import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  option: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  const [state, setState] = useState({});
  const [options, setOptions] = useState([...props.options]);
  const createOption = (optionObj) => {
    return (
      <div
        key={optionObj.name}
        value={optionObj.value || optionObj.code}
        className={classes.option}
      >
        <span>{optionObj.name}</span>
        <img alt={optionObj.name} src={optionObj.flagUrl} />
      </div>
    );
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log("selected", event.target.name);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="filter-chart-data">Filter by...</InputLabel>
      <Select
        value={state.age}
        onChange={handleChange}
        inputProps={{
          name: "filter by...",
          id: "filter-chart-data",
        }}
      >
        <option aria-label="None" value="" />
        {options.map((option) => createOption(option))}
      </Select>
      <FormHelperText>Some important helper text</FormHelperText>
    </FormControl>
  );
}

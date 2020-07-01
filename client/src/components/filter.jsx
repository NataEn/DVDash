import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  const [selectProps, setSelectProps] = useState({ value: "", name: "select" });
  const [options, setOptions] = useState([...props.options]);
  const createOption = (optionObj) => {
    return (
      <MenuItem
        key={optionObj.name}
        value={optionObj.value || optionObj.name}
        name={optionObj.name}
        className={classes.option}
      >
        <span>{optionObj.name}</span>
        <img alt={optionObj.name} src={optionObj.flagUrl} />
      </MenuItem>
    );
  };

  const handleChange = (event) => {
    console.log("selected", event.target);
    setSelectProps({
      value: event.target.value,
      name: event.target.name,
    });
    if (props.onSelect) {
      props.onSelect(event.target.value);
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="filter-chart-data" id="filter-chart-data">
        Filter by...
      </InputLabel>
      <Select
        value={selectProps.value}
        name={selectProps.name}
        onChange={handleChange}
        labelId="filter-chart-data"
      >
        <MenuItem aria-label="None" value="" />
        {options.map((option) => createOption(option))}
      </Select>
      <FormHelperText>Some important helper text</FormHelperText>
    </FormControl>
  );
}

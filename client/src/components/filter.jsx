import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    question: "",
    name: "hi",
  });
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions([...props.options]);
  });
  const createOption = (optionObj) => {
    return (
      <option key={optionObj.name} value={optionObj.value}>
        {optionObj.name}
      </option>
    );
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="filter-chart-data">Filter by...</InputLabel>
      <NativeSelect
        value={state.age}
        onChange={handleChange}
        inputProps={{
          name: "filter by...",
          id: "filter-chart-data",
        }}
      >
        <option aria-label="None" value="" />
        {options.map((option) => createOption(option))}
      </NativeSelect>
      <FormHelperText>Some important helper text</FormHelperText>
    </FormControl>
  );
}

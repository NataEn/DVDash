import React, { useState } from "react";
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

export default function FilterPie() {
  const classes = useStyles();
  const [state, setState] = useState({
    question: "",
    name: "hai",
  });

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
        <option value={10}>Residental proximity</option>
        <option value={20}>Gender</option>
        <option value={30}>Janre</option>
        <option value={30}>Rental rate</option>
        <option value={30}>
          Rental rate vs Proximity to Branch (make pie chart with inner and
          outer radius)
        </option>
      </NativeSelect>
      <FormHelperText>Some important helper text</FormHelperText>
    </FormControl>
  );
}

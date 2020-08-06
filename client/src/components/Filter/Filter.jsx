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

const Filter = ({ options, helperText, onSelect, type }) => {
  const classes = useStyles();
  const [selectProps, setSelectProps] = useState({ value: "", name: "select" });
  const [filterOptions, setFilterOptions] = useState([...options]);
  const createOption = (optionObj) => {
    return (
      <MenuItem
        key={optionObj.name}
        value={
          type === "genre" ? optionObj.id : optionObj.value || optionObj.name
        }
        name={optionObj.name}
        className={classes.option}
      >
        <span>{optionObj.name}</span>
        {optionObj.flagUrl && (
          <img alt={optionObj.name} src={optionObj.flagUrl} />
        )}
      </MenuItem>
    );
  };

  const handleChange = (event) => {
    console.log("selected", event.target);
    setSelectProps({
      value: event.target.value,
      name: event.target.name,
    });
    if (onSelect) {
      console.log("selected", event.target.value);
      if (type === "genre") {
        const selectedValue = options.find(
          (option) => option.id === event.target.value
        ).name;
        console.log("value selected", selectedValue);
        onSelect({
          id: event.target.value,
          value: selectedValue,
        });
      } else {
        onSelect(event.target.value);
      }
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
        {filterOptions.map((option) => createOption(option))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default Filter;

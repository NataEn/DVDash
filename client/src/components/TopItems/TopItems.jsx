import React, { useState, useEffect } from "react";
import { titleCase } from "../../utils";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
    maxHeight: "90%",
  },
  container: {
    maxHeight: 200,
  },
});
export default function TopItems(props) {
  const classes = useStyles();
  const title = props.title;
  const filter = props.filter;
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows([...props.rows]);
    console.log("rows", props.rows);
  }, []);
  console.log("rows", props.rows);
  debugger;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader small padding={"none"} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>{title}</TableCell>
              <TableCell>Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              debugger;
              console.log("top row", row);
              return (
                <TableRow hover key={index}>
                  <TableCell key={`${index}_${filter}`} align={"left"}>
                    {titleCase(row[`top_${filter}`])}
                  </TableCell>
                  <TableCell key={`${index}_${row[filter]}`} align={"left"}>
                    {row["total_sales"]} $
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

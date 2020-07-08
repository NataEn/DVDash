import React, { useState, useEffect } from "react";
import "./TopItems.css";
import { titleCase } from "../../utils";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {},
  container: {
    boxShadow: "none",
  },
});
export default function TopItems(props) {
  const classes = useStyles();
  const filter = props.filter;
  const title = props.title;

  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows([...props.rows]);
    console.log("rows", props.rows);
  }, [filter]);

  console.log("rows", props.rows);
  return (
    <Paper>
      <TableContainer className={classes.root}>
        <Table
          stickyHeader
          aria-label="simple table"
          className={classes.container}
        >
          <TableHead>
            <TableRow>
              <TableCell>{title}</TableCell>
              <TableCell>Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              debugger;
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

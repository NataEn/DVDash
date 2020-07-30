import React, { useState, useEffect } from "react";
import "./TopItems.css";
import noImage from "../../noImage.png";
import { titleCase } from "../../utils";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function TopItems(props) {
  const theme = useTheme();

  const useStyles = makeStyles({
    root: {},
    container: {
      boxShadow: "none",
    },
    cell: {
      maxWidth: 150,
    },
    span: {
      maxWidth: 50,
      display: "inline-block",
      padding: theme.spacing(1),
    },
  });
  const classes = useStyles();
  const filter = props.filter;
  const title = props.title;
  const urls = {
    top_actor: "https://image.tmdb.org/t/p/w92/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg",
    top_title: "https://image.tmdb.org/t/p/w92/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg",
    top_category:
      "https://image.tmdb.org/t/p/w92/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg",
  };

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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell
                    key={`${index}_${filter}`}
                    align={"left"}
                    className={classes.cell}
                  >
                    {/* {urls ? ( */}
                    <img
                      src={urls ? urls[`top_${filter}`] : noImage}
                      alt={`${row[`top_${filter}`]} image`}
                      width="30%"
                    />
                    {/* ) : (
                       <div className="loader"></div>
                     ) */}
                    <span className={classes.span}>
                      {titleCase(row[`top_${filter}`])}
                    </span>
                  </TableCell>
                  <TableCell key={`${index}_${row[filter]}`} align={"left"}>
                    {row["total_sales"]} $
                  </TableCell>
                  <TableCell>Promote</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

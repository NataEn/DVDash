import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, ButtonGroup } from "@material-ui/core";
import { Row, Col } from "reactstrap";

import { PromiseProvider } from "mongoose";

//this function returns an object
function createData(name, availability, sale) {
  return { name, availability, sale };
}

const columns = (filter) => [
  {
    id: filter,
    label: filter[0].toUpperCase() + filter.slice(1),
    minWidth: 20,
    align: "left",
  },
  {
    id: "total-sales",
    label: "Sale",
    minWidth: 30,
    align: "left",
    format: (value) =>
      `${Number(value / 100).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })} $`,
  },
];

const rows = [
  { name: "The Seven Samurai", availability: "In-stock", sale: 36750 },
  { name: "Bonnie and Clyde", availability: "In-stock", sale: 54320 },
  { name: "Reservoir Dogs", availability: "In-stock", sale: 246948 },
  { name: "Airplane!", availability: "In-stock", sale: 435424 },
  { name: "Pan's Labyrinth", availability: "In-stock", sale: 988118 },
  { name: "Doctor Zhivago", availability: "In-stock", sale: 166613 },
  { name: "The Deer Hunter", availability: "In-stock", sale: 395943 },
  { name: "Up", availability: "In-stock", sale: 312619 },
  { name: "Rocky", availability: "In-stock", sale: 438118 },
  { name: "Memento", availability: "In-stock", sale: 35925 },
];

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
  },
  container: {
    maxHeight: 200,
  },
});

export default function Top10(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([...props.data]);
  const [filter, setFilter] = useState("title");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handelFilterButton = (optionArr) => {
    console.log("on click", props.data, optionArr);
    // setFilter([...props.data[optionArr[0]]]);
    // setRows([...props.data[optionArr[1]]]);
  };

  return (
    <>
      <Row className="d-flex justify-content-between p-0">
        <h4 className="text-left d-inline">Top 10</h4>
        <ButtonGroup
          color="primary"
          aria-label="button group"
          size="small"
          className="d-inline"
        >
          <Button onClick={() => handelFilterButton(["movies", 2])}>
            Movies
          </Button>
          <Button onClick={() => handelFilterButton(["actors", 1])}>
            Actors
          </Button>
          <Button onClick={() => handelFilterButton(["janres", 0])}>
            Janres
          </Button>
        </ButtonGroup>
      </Row>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader small padding={"none"} aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns(filter).map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover key={row.name}>
                      {columns(filter).map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

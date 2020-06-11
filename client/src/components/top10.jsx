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

//this function returns an object
function createData(name, availability, sale) {
  return { name, availability, sale };
}

const columns = (filter, title) => [
  {
    id: filter,
    label: title,
    minWidth: 20,
    align: "left",
    format: (value) => value + 123,
  },
  {
    id: "total_sales",
    label: "Sale $",
    minWidth: 30,
    align: "left",
  },
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
  const [filter, setFilter] = useState("");
  const [title, setTitle] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handelFilterButton = (optionArr) => {
    console.log("on click", props.data, optionArr);
    setFilter(optionArr[1]);
    setTitle(optionArr[0]);
    setRows(props.data[optionArr[2]]);
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
          <Button onClick={() => handelFilterButton(["Movies", "title", 2])}>
            Movies
          </Button>
          <Button
            onClick={() => handelFilterButton(["Actors", "actor_name", 1])}
          >
            Actors
          </Button>
          <Button onClick={() => handelFilterButton(["Janres", "category", 0])}>
            Janres
          </Button>
        </ButtonGroup>
      </Row>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell key={`${index}_${filter}`} align={"left"}>
                        {row[filter]}
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

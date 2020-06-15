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
import { titleCase } from "../utils";
import { Row, Col } from "reactstrap";

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
    maxHeight: "90%",
  },
  container: {
    maxHeight: 200,
  },
});

export default function Top10(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    setFilter("actor_name");
    setTitle("Actors");
    setRows([...props.data[1]]);
    console.log("actors", props.data[1]);
  }, []);

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
        <h4 className="text-center d-inline">Top 10 {title}</h4>
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
                        {titleCase(row[filter])}
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

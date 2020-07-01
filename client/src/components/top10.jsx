import utils from "../utils";
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

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
    maxHeight: "90%",
  },
  container: {
    maxHeight: 200,
  },
});
// const rows = [
//   { top_actor: "SUSAN DAVIS", total_sales: "3538.74" },
//   { top_actor: "GINA DEGENERES", total_sales: "3442.49" },
//   { top_actor: "MATTHEW CARREY", total_sales: "2742.19" },
//   { top_actor: "MARY KEITEL", total_sales: "2689.25" },
//   { top_actor: "SCARLETT DAMON", total_sales: "2655.28" },
//   { top_actor: "WALTER TORN", total_sales: "2620.62" },
// ];

export default function Top10(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    setFilter("top_actor");
    setTitle("Actors");
    setRows([...props.data.actor]);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handelFilterButton = (optionArr) => {
    setFilter(`top_${optionArr[1]}`);
    setTitle(optionArr[0]);
    setRows(props.data[optionArr[1]]);
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
          <Button onClick={() => handelFilterButton(["Movies", "title"])}>
            Movies
          </Button>
          <Button onClick={() => handelFilterButton(["Actors", "actor"])}>
            Actors
          </Button>
          <Button onClick={() => handelFilterButton(["Janres", "category"])}>
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
                        {utils.titleCase(row[filter])}
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

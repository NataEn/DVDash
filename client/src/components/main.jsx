import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Button, ButtonGroup } from "@material-ui/core";
import Top10 from "./top10";
import PieChart from "./pieChart";
import SmallBarChart from "./smallBarChart";
import Icon from "@material-ui/core/Icon";
import FilterPie from "./filterPie";
import { VerticalChart } from "./verticalBarchart";
import Map from "./map";
import IncomPerMonth from "./incomePerMonth";
import {
  getTotals,
  getWeekRevenue,
  getWeekCustomers,
  getWeekData,
} from "../apiCalls/mysqlDataQuery";
import { week_data } from "../utils";

export default function Main() {
  const [totalRevenue, setTootalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topTen, setTopTen] = useState([]);

  useEffect(async () => {
    const totals = await getTotals({
      week: ["TOTAL_WEEK_REVENUE", "TOTAL_WEEK_CUSTOMERS"],
    });
    console.log("totals", totals);
    const week_revenue = week_data(totals[1][0]);
    const week_customers = week_data(totals[2][0]);
    console.log(
      "totals",
      totals[0][0][0],
      totals[0][0][1],
      totals[1][0],
      totals[2][0]
    );
    setTootalRevenue(totals[0][0][0][0]);
    setTotalCustomers(totals[0][0][1][0]);
    setWeekRevenue(week_revenue);
    setWeekCustomers(week_customers);
  }, []);

  return (
    <div className="bg-light ">
      <Row className="justify-content-around p-2">
        <Col
          sm={12}
          md={5}
          className="d-flex justify-content-around align-items=center flex-column"
        >
          <div>
            <Row className="pl-1 pr-1 bg-white">
              <Col sm={1}>
                <Icon className=" fas fa-dollar-sign text-success border border-success rounded-circle" />
              </Col>
              <Col className="d-flex flex-column align-items-start ml-2">
                <div>{totalRevenue["total"]} $</div>
                <div>Total Revenue</div>
              </Col>
              <Col></Col>
            </Row>
            <Row className="pl-1 pr-1 bg-white mb-2">
              <Col sm={1}>
                <Icon className="fas fa-cubes rounded-circle" />
              </Col>
              <Col className="d-flex flex-column align-items-start ml-2">
                <div>{totalRevenue["total_today"]} $</div>
                <div>Revenue Today</div>
              </Col>
              <Col></Col>
            </Row>
          </div>
          <div>
            <Row className="pl-1 pr-1 bg-white d-flex flex-row mt-2">
              <Col lg={4} className="pl-0">
                <Col className=" text-left">
                  <h5 className="font-weight-bold">
                    $ {totalRevenue["total_this_week"]}
                  </h5>
                </Col>
                <Col className="d-flex">
                  <span>Week Revenue</span>
                </Col>
              </Col>
              <Col>
                {weekRevenue.length ? (
                  <SmallBarChart data={weekRevenue} />
                ) : (
                  <div>No data available</div>
                )}
              </Col>
            </Row>
            <Row className="pl-1 pr-1 bg-white d-flex flex-row">
              <Col lg={4} className="pl-0">
                <Col className=" text-left">
                  <h5 className="font-weight-bold">
                    # {totalCustomers["total_customers_this_week"]}
                  </h5>
                </Col>
                <Col className="d-flex">
                  <div>Week Customers</div>
                </Col>
              </Col>
              <Col>
                {weekCustomers.length ? (
                  <SmallBarChart data={weekCustomers} />
                ) : (
                  <div>No data available</div>
                )}
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex justify-content-around align-items=center flex-column"
        >
          <Row className="d-flex justify-content-between">
            <h4 className="text-left d-inline">Top 10</h4>
            <ButtonGroup
              color="primary"
              aria-label="button group"
              size="small"
              className="d-inline"
            >
              <Button>Movies</Button>
              <Button>Actors</Button>
              <Button>Janres</Button>
            </ButtonGroup>
          </Row>
          <Top10 />
        </Col>
      </Row>
      <Row className="justify-content-around p-0">
        <Col sm={12} md={5} className="bg-white">
          <Row>
            <h4>World map</h4>
            <FilterPie />
          </Row>
          <Row>
            <Col ms={12} lg={6}>
              <Map />
            </Col>
            <Col ms={12} lg={6}>
              <VerticalChart />
            </Col>
          </Row>
        </Col>
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex flex-column justify-content-around align-items=center"
        >
          <Row className=" justify-content-around p-2">
            <Col className="bg-white">
              <h3>Rental Data In selected area</h3>
              <FilterPie />
              <PieChart />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className=" justify-content-around p-2">
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex flex-column justify-content-around align-items=center"
        >
          <h3>Net Incom for every month</h3>
          <IncomPerMonth data={"some data"} />
        </Col>
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex flex-column justify-content-around align-items=center"
        >
          <h3>Rents per store</h3>
          <IncomPerMonth data={"some data"} />
        </Col>
      </Row>
    </div>
  );
}

import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Top10 from "./top10";
import PieChart from "./pieChart";
import SmallBarChart from "./smallBarChart";
import Icon from "@material-ui/core/Icon";
import FilterPie from "./filterPie";
import { VerticalChart } from "./verticalBarchart";
import Map from "./map";
import IncomPerMonth from "./incomePerMonth";

export default function Main() {
  return (
    <div className="bg-light ">
      <Row className="justify-content-around p-2">
        <Col
          sm={12}
          md={5}
          className="d-flex justify-content-around align-items=center flex-column"
        >
          <div>
            <Row className="p-1 bg-white">
              <Col sm={1}>
                <Icon className="fas fa-dollar-sign text-success border border-success rounded-circle" />
              </Col>
              <Col className="d-flex flex-column align-items-start">
                <div>12345$</div>
                <div>Total Revenu</div>
              </Col>
              <Col></Col>
            </Row>
            <Row className="p-1 bg-white">
              <Col sm={1}>
                <Icon className="fas fa-cubes rounded-circle" />
              </Col>
              <Col className="d-flex flex-column align-items-start">
                <div>12345$</div>
                <div>revenu of the day</div>
              </Col>
              <Col></Col>
            </Row>
          </div>
          <div>
            <Row className="p-1 bg-white d-flex flex-row">
              <Col lg={2} className="pl-0">
                <Col sm={1}>
                  <h5 className="font-weight-bold">$1234</h5>
                </Col>
                <Col className="d-flex">
                  <div>Total Earnings</div>
                </Col>
              </Col>
              <Col>
                <SmallBarChart />
              </Col>
            </Row>
            <Row className="p-1 bg-white d-flex flex-row">
              <Col lg={2} className="pl-0">
                <Col sm={1}>
                  <h5 className="font-weight-bold">#12345</h5>
                </Col>
                <Col className="d-flex">
                  <div>Customers</div>
                </Col>
              </Col>
              <Col>
                <SmallBarChart />
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex justify-content-around align-items=center flex-column"
        >
          <Top10 />
        </Col>
      </Row>
      <Row className="justify-content-around p-2">
        <Col sm={12} md={5} className="bg-white">
          <h4>World map</h4>
          <Map />
          <VerticalChart />
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
          <h3>Rents in per store</h3>
          <IncomPerMonth data={"some data"} />
        </Col>
      </Row>
    </div>
  );
}

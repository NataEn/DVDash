import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Top10 from "./top10";
import Icon from "@material-ui/core/Icon";

export default function Main() {
  return (
    <div className="bg-light ">
      <Row className=" justify-content-around">
        <Col
          sm={12}
          md={5}
          className="d-flex justify-content-around align-items=center flex-column"
        >
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
              <Icon className="fas fa-dollar-sign text-success border border-success rounded-circle" />
            </Col>
            <Col className="d-flex flex-column align-items-start">
              <div>12345$</div>
              <div>Total Revenu</div>
            </Col>
            <Col></Col>
          </Row>
        </Col>

        <Col sm={12} md={5} className="bg-white">
          <Top10 />
        </Col>
      </Row>
      <Row className=" justify-content-around">
        <Col sm={12} md={6}>
          Rental By country map
        </Col>
        <Col sm={12} md={6}>
          Rental Data In selected area Pie chart
        </Col>
      </Row>
      <Row className=" justify-content-around">
        <Col sm={12} md={6}>
          Net Incom for every month
        </Col>
        <Col sm={12} md={6}>
          Rents in 2005, chart
        </Col>
      </Row>
    </div>
  );
}

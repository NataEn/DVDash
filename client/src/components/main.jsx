import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Top10 from "./top10";
import Icon from "@material-ui/core/Icon";

export default function Main() {
  return (
    <div>
      <Row>
        <Col sm={12} md={6}>
          <Row>
            <Col>
              <Icon className="fas fa-dollar-sign text-success border border-success rounded-circle" />
            </Col>
            <Col className="align-items-center">
              <div>12345$</div>
              <div>Total Revenu</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Icon className="fas fa-cubes rounded-circle" />
            </Col>
            <Col>
              <div>12345$</div>
              <div>revenu of the day</div>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Top10 />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          Rental By country map
        </Col>
        <Col sm={12} md={6}>
          Rental Data In selected area Pie chart
        </Col>
      </Row>
      <Row>
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

import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Top10 from "./top10";
export default function Main() {
  return (
    <div>
      <Row>
        <Col sm={12} md={6}>
          <Row>Total revenu</Row>
          <Row>% rented</Row>
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

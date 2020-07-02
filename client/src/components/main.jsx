import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

import Top10 from "./top10";
import PieChart from "./pieChart";
import SmallBarChart from "./smallBarChart";
import Icon from "@material-ui/core/Icon";
import Filter from "./filter";
import { VerticalChart } from "./verticalBarchart";
import Map from "./Map/Map.jsx";
import ColumnGrid from "./columnGrid";
import store from "../store/filterOptions";

export default function Main(props) {
  const data = props.data;
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
                <div>{data.totalRevenue["total_revenue"]} $</div>
                <div>Total Revenue</div>
              </Col>
              <Col></Col>
            </Row>
            <Row className="pl-1 pr-1 bg-white mb-2">
              <Col sm={1}>
                <Icon className="fas fa-cubes rounded-circle" />
              </Col>
              <Col className="d-flex flex-column align-items-start ml-2">
                <div>{data.totalRevenue["day_revenue"]} $</div>
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
                    $ {data.totalRevenue["week_revenue"]}
                  </h5>
                </Col>
                <Col className="d-flex">
                  <span>Week Revenue</span>
                </Col>
              </Col>
              <Col>
                {data.weekRevenue.length ? (
                  <SmallBarChart
                    data={data.weekRevenue}
                    valueKey={"week_revenue"}
                    nameKey={"day_name"}
                  />
                ) : (
                  <div>No data available</div>
                )}
              </Col>
            </Row>
            <Row className="pl-1 pr-1 bg-white d-flex flex-row">
              <Col lg={4} className="pl-0">
                <Col className=" text-left">
                  <h5 className="font-weight-bold">
                    # {data.totalCustomers["week_customers"]}
                  </h5>
                </Col>
                <Col className="d-flex">
                  <div>Week Customers</div>
                </Col>
              </Col>
              <Col>
                {data.weekCustomers.length ? (
                  <SmallBarChart
                    data={data.weekCustomers}
                    valueKey={"week_customers"}
                    nameKey={"day_name"}
                  />
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
          {data.topTen && data.topTen.actor ? (
            <Top10 data={data.topTen} />
          ) : (
            <div className="loader"></div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center p-0">
        <Col sm={12} md={5} className="bg-white">
          <Row>
            <h4>World map</h4>
            {props.data.countries.length && (
              <Filter
                options={props.data.countries}
                onSelect={data.setCountry}
              />
            )}
          </Row>
          <Row>
            <Map country={data.country} />

            {/* <Col ms={12} lg={6}>
              <VerticalChart />
            </Col> */}
          </Row>
        </Col>
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex flex-column justify-content-around align-items=center"
        >
          <Row className="justify-content-around p-2">
            <Col className="bg-white">
              <h3>Rental Data In selected area</h3>
              <Filter
                options={store.AREA_FILTERS}
                onSelect={data.setAreaDataReq}
              />
              {data.filteredAreaData && (
                <PieChart
                  areaData={data.filteredAreaData}
                  filter={data.areaDataReq}
                  country={data.country}
                />
              )}
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
          <h3>Monthly Revenue</h3>
          {data.monthRevenue.length ? (
            <ColumnGrid
              data={data.monthRevenue}
              dataXName={"month_name"}
              dataValue={"month_revenue"}
            />
          ) : (
            <div className="loader"></div>
          )}
        </Col>
        <Col
          sm={12}
          md={5}
          className="bg-white d-flex flex-column justify-content-around align-items=center"
        >
          <h3>Rents per store</h3>
          {data.monthCustomers.length ? (
            <ColumnGrid
              data={data.monthCustomers}
              dataXName={"month_name"}
              dataValue={"tot_female_customers_1"}
              secondaryData={{
                dataXName: "month_name",
                dataValue: "tot_female_customers_2",
              }}
            />
          ) : (
            <div className="loader"></div>
          )}
        </Col>
      </Row>
    </div>
  );
}

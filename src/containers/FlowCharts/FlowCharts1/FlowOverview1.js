import React, { Component } from "react";
import BarChart1 from "./BarChart1";
import HorizontalFlow from "./HorizontalFlow";
import SankeyChart from "./SankeyChart";
import VerticalChart from "./VerticalChart";

export default function FlowOverview1() {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-2">
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option defaultValue>Age Group</option>
            <option>18-24</option>
            <option>25-34</option>
            <option>35-44</option>
            <option>45-54</option>
            <option>55-64</option>
            <option>65+</option>
            <option>Unknown</option>
          </select>
        </div>
        <div className="col-2">
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option defaultValue>Gender</option>
            <option value="1">Female</option>
            <option value="2">Male</option>
            <option value="3">Unknown</option>
          </select>
        </div>
        <div className="col-2">
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option defaultValue>Locations</option>
            <option>Dublin</option>
            <option>Cork</option>
            <option>Galway</option>
            <option>Tipperary</option>
            <option>Trim</option>
            <option>Kildare</option>
            <option>Killarney</option>
            <option>Other cities (Ireland)</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Unknown</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div style={{ height: 600, width: 1000 }}>
          <HorizontalFlow />
        </div>
        <div style={{ height: 600, width: 400 }}>
          <BarChart1 />
        </div>
      </div>
      <div className="row justify-content-center">
        <div style={{ height: 600, width: 1000 }}>
          <SankeyChart />
        </div>
        <div style={{ height: 500, width: 400 }}>
          <VerticalChart />
        </div>
      </div>
    </>
  );
}

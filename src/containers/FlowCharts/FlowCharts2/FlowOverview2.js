import React, { Component } from "react";
import SmallTable from "./SmallTable";
import VennDiagram from "./VennDiagram";
import "../Charts.css";

export default function FlowOverview2() {
  return (
    <>
    <div className="row justify-content-center">
      <div style={{ height: 600, width: 1000 }}>
        <VennDiagram></VennDiagram>
      </div>
      </div>
      <div className="row justify-content-center">
      <div style={{ height: 620, width: 1200, marginTop:'7%' }}>
      <h2 className='jutify-content-center'>Table</h2>
        <SmallTable></SmallTable>
      </div>
      </div>
    </>
  );
}

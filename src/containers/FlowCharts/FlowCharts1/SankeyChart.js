import React, { Component } from "react";
import { Tooltip, Sankey } from "recharts";

export default function SankeyChart() {

  const data0 = {
    nodes: [
      {
        name: "Visit",
      },
      {
        name: "Direct-Favourite",
      },
      {
        name: "Page-Click",
      },
      {
        name: "Detail-Favourite",
      },
      {
        name: "Lost",
      },
    ],
    links: [
      {
        source: 0,
        target: 1,
        value: 3728.3,
      },
      {
        source: 0,
        target: 2,
        value: 354170,
      },
      {
        source: 2,
        target: 3,
        value: 62429,
      },
      {
        source: 2,
        target: 4,
        value: 291741,
      },
    ],
  };

  return (
    <>
     <h2 style={{marginTop:'7%'}}>VR Flow</h2>
     
      <Sankey
        width={1000}
        height={600}
        data={data0}
        nodePadding={50}
        margin={{
          left: 50,
          right: 200,
          top: 50,
          bottom: 100,
        }}
        link={{ stroke: "#77c878" }}
      >
        <text text-anchor="start" x="180" y="210" font-size="14" stroke="#333">Visit</text>
        <text text-anchor="start" x="180" y="223" font-size="12" stroke="#333" stroke-opacity="0.5">357898.3k</text>
        <text text-anchor="start" x="550" y="208" font-size="14" stroke="#333">Page-Click</text>
        <text text-anchor="start" x="550" y="223" font-size="12" stroke="#333" stroke-opacity="0.5">354170k</text>
        <text text-anchor="start" x="830" y="210" font-size="14" stroke="#333">Lost</text>
        <text text-anchor="start" x="830" y="223" font-size="12" stroke="#333" stroke-opacity="0.5">291741k</text>
        <text text-anchor="start" x="830" y="405" font-size="14" stroke="#333">Detail-Favourite</text>
        <text text-anchor="start" x="830" y="418" font-size="12" stroke="#333" stroke-opacity="0.5">62429k</text>
        <text text-anchor="start" x="830" y="505" font-size="14" stroke="#333">Direct-Favourite</text>
        <text text-anchor="start" x="830" y="518" font-size="12" stroke="#333" stroke-opacity="0.5">3728.3k</text>
        <Tooltip />
      </Sankey>
    </>
  );
}

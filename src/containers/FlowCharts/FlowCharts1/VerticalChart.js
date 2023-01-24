import React, { PureComponent } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "All visitors",
    Visits: 1000,
  },
  {
    name: "Product View",
    Visits: 800,
  },
  {
    name: "Cart",
    Visits: 600,
  },
  {
    name: "View",
    Visits: 400,
  },
  {
    name: "yy",
    Visits: 200,
  },
];

export default function VerticalChart() {
  return (
    <>
      <h2 style={{ marginTop: "18%" }}>Fallout</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 50,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />

          <Bar dataKey="Visits" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}

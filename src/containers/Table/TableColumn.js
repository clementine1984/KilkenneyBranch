import { Column } from "ag-grid-community";

const column = () => [
  {
    headerName: "Store Location",
    lockPosition: "left",
    cellStyle: { "background-color": "black" },
    children: [
      {
        field: "Name",
        lockPosition: "left",
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "Sales",
    children: [
      {
        field: "S-Actual",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
        id: "sales-actual",
      },
      {
        field: "S-Budget",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "S-Var %",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "S-Var €",
        width: 100,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "Margin",
    children: [
      {
        field: `M-Actual`,
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "M-Budget",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "M-Var %",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "M-Var €",
        width: 100,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "Margin Percentage",
    children: [
      {
        field: "MP-Actual",
        width: 110,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "MP-Budget",
        width: 110,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "MP-Var %",
        width: 110,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "ATV",
    children: [
      {
        field: `A-Actual`,
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "A-Budget",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "A-Var %",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "A-Var €",
        width: 100,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "Orders",
    children: [
      {
        field: `O-Actual`,
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "O-Budget",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "O-Var %",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "O-Var €",
        width: 100,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "Sessions/FF",
    children: [
      {
        field: `Se-Actual`,
        width: 110,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "Se-Budget",
        width: 110,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "Se-Var %",
        width: 110,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "Se-Var €",
        width: 110,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "Conversion",
    children: [
      {
        field: `C-Actual`,
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "C-Budget",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "C-Var %",
        width: 100,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
  {
    headerName: "IPT",
    children: [
      {
        field: "I-Actual",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "I-Budget",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "I-Var %",
        width: 100,
        cellStyle: { borderRightColor: "#e2e2e2" },
      },
      {
        field: "I-Var €",
        width: 100,
        cellStyle: { borderRightColor: "black" },
      },
    ],
  },
];

export default column;

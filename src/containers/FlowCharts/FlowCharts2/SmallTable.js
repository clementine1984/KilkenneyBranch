import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { AgGridReact } from "ag-grid-react";
import SmallTableData from "./SmallTableData";

export default function SmallTable() {
  const [rowData, setRowData] = useState(SmallTableData);
  const [columnDefs, setColumDefs] = useState([
    {
      field: "Path Length in Interaction",
      width: 400,
      cellStyle: { borderRightColor: "#e2e2e2" },
    },
    {
      field: "Conversions",
      width: 400,
      cellStyle: { borderRightColor: "#e2e2e2" },
    },
    { field: "Conversion Value", width: 400 },
  ]);

  return (
    <div
      className="ag-theme-alpine justify-content-center"
      style={{ height: 600 }}
    >

      <AgGridReact
        rowData={rowData} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
      ></AgGridReact>
    </div>
  );
}

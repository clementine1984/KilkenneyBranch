import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./Tables.css";
import LoadingSpinner from "../LoadingSpinner";
import { render } from "react-dom";
import { cellRenderer, AgGridReact } from "ag-grid-react";
import column from "./TableColumn.js";
import locations from "./Locations";
import Data from "./Data";

const Tables = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState("");
  const [haveChoose, setHavechoose] = useState(false);

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(Data);

  const columnDefs = useMemo(column);

  const rowClassRules = { fontWeight: 600 };

  const getRowStyle = (props) => {
    const total = [
      "Retail Regional Stores",
      "Retail City Centre",
      "Retail Shopping Centres",
      "Retail Tourism Store",
      "Retail Total",
    ];

    if (total.includes(`${props.data.Name}`)) {
      return { fontWeight: 600 };
    }
  };

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      width: 300,
      resizable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);
  const columnHoverHighlight = true;

  const sortData = (data) => {
    console.log("data", data);

    let swoTotalSales,
      swoSalesBudget,
      swoSalesV,
      swoSalesVp,
      swoMA,
      swoMB,
      swoMV,
      swoMVp;

    for (let i = 0; i < data.length; i++) {
      let locationId = data[i].location_id;
      switch (locationId) {
        case 10:
          swoTotalSales = data[i].total_sales_ExTax;
          swoSalesBudget = data[i].SALES_budget;
      }
    }

    const results = [
      { Name: "CAS The Kilkenny Shop-Cashel" },
      { Name: "RSY The Kilkenny Shop-Killarney" },
      { Name: "ENI Kilkenny Ennis" },
      { Name: "SHA The Kilkenny Shop-Shanagarry" },
      { Name: "TRI The Kilkenny Shop-Trim" },
      { Name: "Retail Regional Stores" },

      { Name: "COR The Kilkenny Shop- Cork City" },
      { Name: "GAL The Kilkenny Shop-Galway" },
      { Name: "Retail City Centre" },

      { Name: "DOU The Kilkenny Shop-Douglas Court SC" },
      { Name: "NGV Gift Shed" },
      { Name: "STI The Kilkenny Shop-Stillorgan SC" },
      {
        Name: "SWO The Kilkenny Shop-Swords",
        "S-Actual": swoTotalSales,
        "S-Budget": swoSalesBudget,
      },
      { Name: "WHI The Kilkenny Shop-Whitewater SC" },
      { Name: "Retail Shopping Centres" },

      { Name: "KDC Kilkenny Design Centre" },
      { Name: "RBY Christys-Killarney" },
      { Name: "RBQ Christys-Cobh" },
      {
        Name: "RKD The Kilkenny Shop-Nassau Street D2",
      },
      { Name: "SAM Sammys Retail" },
      { Name: "Retail Tourism Store" },

      { Name: "Retail Total" },
    ];
    setRowData(results);
  };

  const callLastWeek = () => {
    setHavechoose(true);
    setTimeFrame(false);
    setIsLoading(true);
    // instantiate a headers object
    let myHeaders = new Headers();
    // add content type header to object

    // using built in JSON utility package turn object to string and store in a variable
    // setIsLoading(true);

    myHeaders.append("Content-Type", "application/json");

    // create a JSON object with parameters for API call and store in a variable
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        last_day: "False",
        last_week: "True",
      }),
    };

    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_agg_data",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => sortData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const callYesterday = () => {
    setHavechoose(true);
    setTimeFrame(true);
    setIsLoading(true);

    let myHeaders = new Headers();
    // add content type header to object

    // using built in JSON utility package turn object to string and store in a variable
    // setIsLoading(true);
    myHeaders.append("Content-Type", "application/json");

    // create a JSON object with parameters for API call and store in a variable
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        last_day: "True",
        last_week: "False",
      }),
      redirect: "follow",
    };

    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_agg_data",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => sortData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const OnGridReady = useCallback(() => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        last_day: "True",
        last_week: "False",
      }),
      redirect: "follow",
    };

    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_agg_data",
      requestOptions
    )
      .then((response) => response.text())
      //.then((result) => sortData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onPinShop = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "Name", pinned: "left" }],
    });
  }, []);

  const onUnpinShop = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "Name", pinned: null }],
    });
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      <h1 className="header">
        Sales and Margin Table{" "}
        {haveChoose
          ? `${timeFrame ? "For Yesterday" : "For Last Week"}`
          : "for Yesterday or Last Week"}
      </h1>
      {/* {isLoading ? <LoadingSpinner /> : ""} */}
      <div className="btnContainer">
        <button className="buttons" onClick={callLastWeek}>
          Last Week
        </button>
        <button className="buttons" onClick={callYesterday}>
          Yesterday
        </button>
        <button className="exportBtn" onClick={onBtnExport}>
          Export Table
        </button>
      </div>
      <div>
        <button className="smbuttons" onClick={onPinShop}>
          Pin Shop
        </button>
        <button className="smbuttons" onClick={onUnpinShop}>
          Un-Pin Shop
        </button>
      </div>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "100%", height: 1000 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          columnHoverHighlight={columnHoverHighlight}
          rowClassRules={rowClassRules}
          getRowStyle={getRowStyle}
          onGridReady={OnGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Tables;

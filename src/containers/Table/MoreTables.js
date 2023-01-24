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
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

const Tables2 = () => {
  const gridRef1 = useRef(); // Optional - for accessing Grid's API
  const [rowData1, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.

  const [columnDefs1, setColumnDefs] = useState([
    {
      children: [
        { field: "Order Date (OpSuite)" },
        { field: "Shipped Date (OpSuite)" },
        { field: "Store Purchased In (OpSuite)" },
        { field: "Magento Order Number (Magento)" },
        { field: "OpSuite Order Number (OpSuite)" },
        { field: "Refunded Date (OpSuite)" },
        { field: "Store Returned In (OpSuite)" },
        { field: "OpSuite Refund Number (OpSuite)" },
        { field: "Sku (OpSuite)" },
        { field: "Size (OpSuite)" },
        { field: "Colour (OpSuite)" },
        { field: "Supplier (OpSuite)" },
        { field: "Department (OpSuite)" },
        { field: "Product Type (Magento)" },
        { field: "Shipping Country (Magento)" },
        { field: "Qty (OpSuite)" },
        { field: "Net Item Amount (OpSuite)" },
        { field: "Net Total Amount (OpSuite)" },
        { field: "Reason (OpSuite)" },
      ],
    },
  ]);
  const [columnDefs2, setColumnDefs2] = useState([
    {
      headerName: "Sales",
      children: [
        { field: "TotalSales", cellStyle: { "border-right-color": "black" } },
        { field: "year", cellStyle: { "border-right-color": "#e2e2e2" } },
        { field: "date", cellStyle: { "border-right-color": "#e2e2e2" } },
        { field: "sport", cellStyle: { "border-right-color": "#e2e2e2" } },
      ],
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);
  const columnHoverHighlight = true;

  // Example load data from sever
  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/row-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  //   console.log(rowData);
  //   }, []);

  // // Example using Grid's API
  // const buttonListener = useCallback((e) => {
  //   gridRef.current.api.deselectAll();
  // }, []);

  // function callApi() {
  //   // instantiate a headers object
  //   var myHeaders = new Headers();
  //   // add content type header to object

  //   // using built in JSON utility package turn object to string and store in a variable
  //   // setIsLoading(true);
  //   var requestData = {
  //     last_week: true,
  //     location_id: "19",
  //   };

  //   var raw = JSON.stringify(requestData); // Place request body here
  //   myHeaders.append("Content-Type", "application/json");

  //   // create a JSON object with parameters for API call and store in a variable
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   useEffect(() => {
  //     fetch(
  //     "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_agg_data ",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => sortData(JSON.parse(result)))
  //     .catch((error) => console.log("error", error));
  //   }, []);
  // }

  // function callApiYesterday() {}
  function callfirstTable() {}
  function callsecondTable() {}
  function callthirdTable() {}
  var sortData = (data) => {
    //   console.log(data);
    //   var results = [{
    //     Name:"Nassau",
    //     "Total Transactions": data.transaction_count,
    //     "Total Profit Margin": data.total_profit,
    //   },
    //   {Name:"CAS The Kilkenny Shop-Cashel",},
    //   {Name:"COR The Kilkenny Shop- Cork City",},
    //   {Name:"DOU The Kilkenny Shop-Douglas Court SC",},
    //   {Name:"ENI Kilkenny Ennis",},
    //   {Name:"GAL The Kilkenny Shop-Galway",},
    //   {Name:"KDC Kilkenny Design Centre",},
    //   {Name:"NGV Gift Shed",},
    //   {Name:"RBY Christys-Killarney",},
    //   {Name:"RBQ Christys-Cobh",},
    //   {Name:"RKD The Kilkenny Shop-Nassau Street D2",},
    //   {Name:"RSY The Kilkenny Shop-Killarney",},
    //   {Name:"SHA The Kilkenny Shop-Shanagarry",},
    //   {Name:"SAM Sammys Retail",},
    //   {Name:"STI The Kilkenny Shop-Stillorgan SC",},
    //   {Name:"SWO The Kilkenny Shop-Swords",},
    //   {Name:"TRI The Kilkenny Shop-Trim",},
    //   {Name:"WHI The Kilkenny Shop-Whitewater SC",},
    // ];
    //   setRowData(results);
  };
  // var onFirstDataRendered=(params) => {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;

  //   this.gridApi.sizeColumnsToFit();
  // }
  return (
    <div>
      {/* Example using Grid's API */}
      <h1 className="header">Returns Report</h1>
      <button className="report" onClick={() => callfirstTable(true)}>
        Report
      </button>
      <button className="brandSummary" onClick={callsecondTable()}>
        Brand Summary
      </button>
      <button className="skuSummary" onClick={callthirdTable()}>
        SKU Summary
      </button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "99%", height: 1000 }}>
        <AgGridReact
          ref={gridRef1} // Ref for accessing Grid's API
          rowData={rowData1} // Row Data for Rows
          columnDefs={columnDefs1} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          columnHoverHighlight={columnHoverHighlight}
          // onFirstDataRendered={this. onFirstDataRendered.bind(this)}
        />
      </div>
    </div>
  );
};

export default Tables2;

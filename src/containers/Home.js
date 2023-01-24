import { useState } from "react";
import React from "react";
import "./NotFound.css";
import LoadingSpinner from "./LoadingSpinner.js";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

// import {plotPieChart} from './pieChartDemographic';
// import {plotLinePlot} from './linePlotFootfall';
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [male, setMale] = useState(10);
  const [female, setFemale] = useState(10);
  const [budget, setBudget] = useState(10);

  const [salesAct, setSalesAct] = useState();
  const [salesAver, setSalesAver] = useState();
  const [transAct, setTransAct] = useState();
  const [transAver, setTransAver] = useState();
  const [marginAct, setMarginAct] = useState();
  const [marginAver, setMarginAver] = useState();
  const [ffAct, setFfAct] = useState();
  const [ffAver, setFfAver] = useState();

  const [today] = useState(new Date());

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const graphicData = [
    { name: "Female", value: female, fill: "#84003d" },
    { name: "Male", value: male, fill: "#1a1182" },
  ];

  let into = 0;
  let margin = 0;
  let marginperc;
  let total_sales;
  let diffDayWhole;

  const barData = [
    {
      name: "Sales",
      YesterdayActual: salesAct,
      DailyAverage: salesAver,
    },
    {
      name: "Transactions",
      YesterdayActual: transAct,
      DailyAverage: transAver,
    },
    {
      name: "Margin",
      YesterdayActual: marginAct,
      DailyAverage: marginAver,
    },
    {
      name: "Footfall",
      YesterdayActual: ffAct,
      DailyAverage: ffAver,
    },
  ];

  var testMethod = async (data) => {
    setIsLoading(false);
    console.log("testMethod,get_pot_all", data);

    for (let i = 0; i < data.length; i++) {
      margin += data[i].total_profit; //total_profit
    }

    document.getElementById("margin-actual-mv").innerHTML = margin.toFixed(2);
    let average = margin / diffDayWhole;
    setMarginAver(average.toFixed(2));

    document.getElementById("margin-varEur-mv").innerHTML = (
      margin - document.getElementById("margin-budget-mv").innerHTML
    ).toFixed(2);
    document.getElementById("margin-varPerc-mv").innerHTML = (
      (document.getElementById("margin-varEur-mv").innerHTML /
        document.getElementById("margin-budget-mv").innerHTML) *
      100
    ).toFixed(2);
    var marginprofit = 0;
    var transaction = 0;
    for (var i = 0; i < data.length; i++) {
      marginprofit += data[i].total_profit_margin;
      transaction += data[i].dept_wise_transaction;
    }
    //console.log(marginprofit.toFixed(2));
    console.log(total_sales, "total_sales");

    marginperc = (margin.toFixed(2) / total_sales) * 100;
    document.getElementById("margin-percentage-actual-mv").innerHTML =
      marginperc.toFixed(2);

    // document.getElementById("margin-percentage-varPerc-mv").innerHTML = (
    //   marginperc / 1
    // ).toFixed(2);
    colorMetrics();
  };

  var storeFootfall = async (data) => {
    let reportData = data;
    let malet = 0;
    let femalet = 0;

    console.log("storeFootfall,vemcount", data);
    //console.log(JSON.stringify(reportData) + "foot");
    var int = 0;
    for (var i = 0; i < reportData.count_in.length; i++) {
      into += reportData.count_in[i];
      malet += reportData.demographics_male[i];
      femalet += reportData.demographics_female[i];
    }
    if (femalet > 0 && malet > 0) {
      setFemale(femalet);
      setMale(malet);
    } else {
      setFemale(1);
      setMale(1);
    }
  };

  const getsalesBudget = (data) => {
    console.log("salesbudget", data.total_budget);
    setBudget(data.total_budget);
  };

  const getBudget = async (data, item) => {
    switch (item) {
      case "DAILY2":
        document.getElementById("sales-budget-mv").innerHTML =
          data.total_budget.toFixed(2);
        break;
      case "MARGIN2":
        document.getElementById("margin-budget-mv").innerHTML =
          data.total_budget.toFixed(2);

        break;
      case "ORDERS2":
        document.getElementById("items-sold-budget-mv").innerHTML = parseInt(
          data.total_budget
        );
        break;
      case "FOOTFALL2":
        document.getElementById("sessions-ff-budget-mv").innerHTML =
          data.total_budget.toFixed(2);

        break;
      case "ATV2":
        document.getElementById("atv-budget-mv").innerHTML = (
          data.total_budget / diffDayWhole
        ).toFixed(2);

        break;
      case "IPT2":
        document.getElementById("ipt-budget-mv").innerHTML = (
          data.total_budget / diffDayWhole
        ).toFixed(2);

        break;
      case "CONVERSION2":
        document.getElementById("conversion-budget-mv").innerHTML = (
          (data.total_budget * 100) /
          diffDayWhole
        ).toFixed(2);
        break;
    }
    colorMetrics();

    document.getElementById("margin-percentage-budget-mv").innerHTML = ((
      document.getElementById("margin-budget-mv").innerHTML /
      document.getElementById("sales-budget-mv").innerHTML
    )*100).toFixed(2);
  };

  const getIPT = async (data) => {
    // console.log("getIPT", data);

    document.getElementById("ipt-actual-mv").innerHTML =
      data.ipt_value.toFixed(2);

    document.getElementById("ipt-var-mv").innerHTML = (
      data.ipt_value - document.getElementById("ipt-budget-mv").innerHTML
    ).toFixed(2);

    document.getElementById("ipt-varPerc-mv").innerHTML = (
      (document.getElementById("ipt-var-mv").innerHTML /
        document.getElementById("ipt-budget-mv").innerHTML) *
      100
    ).toFixed(2);
    colorMetrics();
  };

  var renderAPIData = async (data) => {
    //get transactions from date API call
    var reportData = data;
    let average = 0;
    console.log("renderAPI, get_transactions_from_date", data);
    total_sales = data.total_sales;
    //setSalesAct(total_sales);

    let footfallBudget = document.getElementById(
      "sessions-ff-budget-mv"
    ).innerHTML;
    let transBudget = document.getElementById("items-sold-budget-mv").innerHTML;

    // Fill in the KPI boxes per report response
    document.getElementById("sales-actual-mv").innerHTML =
      reportData.total_sales;
    average = (reportData.total_sales / diffDayWhole).toFixed(0);
    setSalesAver(average);
    document.getElementById("sales-varEur-mv").innerHTML = (
      reportData.total_sales -
      document.getElementById("sales-budget-mv").innerHTML
    ).toFixed(2);

    document.getElementById("sales-varPerc-mv").innerHTML = (
      (document.getElementById("sales-varEur-mv").innerHTML /
        document.getElementById("sales-budget-mv").innerHTML) *
      100
    ).toFixed(2);

    try {
      // items sold
      document.getElementById("items-sold-actual-mv").innerHTML =
        reportData.total_transactions;
      // setTransAct(reportData.total_transactions);
      setTransAver((reportData.total_transactions / diffDayWhole).toFixed(0));
      document.getElementById("items-sold-var-mv").innerHTML =
        document.getElementById("items-sold-actual-mv").innerHTML -
        document.getElementById("items-sold-budget-mv").innerHTML;
      document.getElementById("items-sold-varPerc-mv").innerHTML = (
        (document.getElementById("items-sold-var-mv").innerHTML / transBudget) *
        100
      ).toFixed(2);
      // sessions - not ideal to calculate this here
      if (into > 0) {
        document.getElementById("sessions-ff-actual-mv").innerHTML = into;
        let average = into / diffDayWhole;
        setFfAver(average);
        document.getElementById("sessions-ff-var-mv").innerHTML = (
          document.getElementById("sessions-ff-actual-mv").innerHTML -
          footfallBudget
        ).toFixed(2); //calculate footfall variance
        document.getElementById("sessions-ff-varPerc-mv").innerHTML = (
          (document.getElementById("sessions-ff-var-mv").innerHTML /
            footfallBudget) *
          100
        ).toFixed(2); //calculate footfall variance %
      } else if (into <= 0) {
        document.getElementById("sessions-ff-actual-mv").innerHTML = "N/A";
        document.getElementById("sessions-ff-budget-mv").innerHTML = "N/A";
        document.getElementById("sessions-ff-var-mv").innerHTML = "N/A";
        document.getElementById("sessions-ff-varPerc-mv").innerHTML = "N/A";
      }
      // Conversion - not ideal to calculate this here
      //console.log(document.getElementById("sessions-ff-actual-mv").innerHTML);
      if (document.getElementById("sessions-ff-actual-mv").innerHTML > 0) {
        document.getElementById("conversion-actual-mv").innerHTML = (
          (document.getElementById("items-sold-actual-mv").innerHTML /
            document.getElementById("sessions-ff-actual-mv").innerHTML) *
          100
        ).toFixed(2);

        document.getElementById("conversion-varPerc-mv").innerHTML = (
          ((document.getElementById("conversion-actual-mv").innerHTML -
            document.getElementById("conversion-budget-mv").innerHTML) /
            document.getElementById("conversion-budget-mv").innerHTML) *
          100
        ).toFixed(2); //calculate conversion rate variance %
      } else {
        document.getElementById("conversion-actual-mv").innerHTML = "N/A";
        document.getElementById("conversion-budget-mv").innerHTML = "N/A";
        document.getElementById("conversion-varPerc-mv").innerHTML = "N/A";
      }

      // // ATV
      document.getElementById("atv-actual-mv").innerHTML = (
        reportData.total_sales / reportData.total_transactions
      ).toFixed(2); //

      document.getElementById("atv-varEur-mv").innerHTML = (
        reportData.total_sales / reportData.total_transactions -
        document.getElementById("atv-budget-mv").innerHTML
      ).toFixed(2);
      document.getElementById("atv-varPerc-mv").innerHTML = (
        (document.getElementById("atv-varEur-mv").innerHTML /
          document.getElementById("atv-budget-mv").innerHTML) *
        100
      ).toFixed(2);

      // // IPT
    } catch (e) {
      console.log(e + ". Skipping...\n");
    }

    colorMetrics();
  };

  const getYesterday = async (data) => {
    setSalesAct(data.total_sales);
    setTransAct(data.total_transactions);
    setFfAct(into);

    console.log("yesterday data", data);
  };

  const getYesMargin = async (data) => {
    for (let i = 0; i < data.length; i++) {
      margin += data[i].total_profit;
    }
    setMarginAct(margin.toFixed(2));
    console.log("yesterday margin", data);
  };

  var colorMetrics = async () => {
    // Colour the metrics based on whether they are positive or negative
    var metricValueBoxes = document.getElementsByClassName("changeColor");

    for (var i = 0; i < metricValueBoxes.length; i++) {
      var kpi_val = metricValueBoxes[i].innerHTML;
      if (kpi_val >= 0) {
        metricValueBoxes[i].classList.remove("text-danger");
        metricValueBoxes[i].classList.add("text-success");
      } else {
        metricValueBoxes[i].classList.remove("text-success");
        metricValueBoxes[i].classList.add("text-danger");
      }
    }
  };

  var clearMetrics = async () => {
    // Colour the metrics based on whether they are positive or negative
    var metricValueBoxes = document
      .getElementById("kpi-mv")
      .querySelectorAll("p");
    for (var i = 0; i < metricValueBoxes.length; i++) {
      var kpi_val = metricValueBoxes[i].innerHTML;
      if (kpi_val >= 0) {
        metricValueBoxes[i].innerHTML = "-";
      } else {
        metricValueBoxes[i].innerHTML = "-";
      }
    }
  };

  const getStringDate = (aDate) => {
    var dd = aDate;
    var yy = dd.getYear();
    var mm = dd.getMonth() + 1;
    dd = dd.getDate() - 1;
    //console.log('dd',dd);
    if (yy < 2000) {
      yy += 1900;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    var rs = yy + "-" + mm + "-" + dd;
    return rs;
  };

  // define the callAPI function that takes a first name and last name as parameters
  async function callAPI() {
    clearMetrics(); // Clear the metrics that are already there
    // instantiate a headers object
    const myHeaders = new Headers();
    // add content type header to object

    // using built in JSON utility package turn object to string and store in a variable
    let selectedLocation = document.getElementById("locationPicker").value;

    let startDate = document.getElementById("date1").value;
    let endDate = document.getElementById("date2").value;

    let yesterdayStart = getStringDate(today);
    let yesterdayEnd = getStringDate(today);

    if (selectedLocation == "Please choose a location...") {
      alert("Please choose a location.");
      return;
    }
    if (startDate == "") {
      alert("Please choose a Start Date.");
      return;
    }
    if (endDate == "") {
      alert("Please choose an End Date.");
      return;
    }
    if (endDate < startDate) {
      alert("Please choose a valid End Date.");
      return;
    }
    setIsLoading(true);
    let locationID;
    let locationID2;
    switch (selectedLocation) {
      case "RKD The Kilkenny Shop-Nassau Street D2":
        locationID = "7";
        locationID2 = "19706";
        break;
      case "SWO The Kilkenny Shop-Swords":
        locationID = "10";
        locationID2 = "19688";
        break;
      case "TRI The Kilkenny Shop-Trim":
        locationID = "9";
        locationID2 = "19621";
        break;
      case "WWW Website Sales":
        locationID = "19";
        locationID2 = "19565";
        break;
      case "SHA The Kilkenny Shop-Shanagarry":
        locationID = "3";
        break;
      case "RBY Christys-Killarney":
        locationID = "4";
        break;
      case "RSY The Kilkenny Shop-Killarney":
        locationID = "5";
        break;
      case "GAL The Kilkenny Shop-Galway":
        locationID = "6";
        break;
      case "CAS The Kilkenny Shop-Cashel":
        locationID = "8";
        break;
      case "RBQ Christys-Cobh":
        locationID = "11";
        break;
      case "COR The Kilkenny Shop-Cork City":
        locationID = "12";
        break;
      case "STI The Kilkenny Shop-Stillorgan SC":
        locationID = "13";
        break;
      case "DOU The Kilkenny Shop-Douglas Court SC":
        locationID = "15";
        break;
      case "KBY Warehouse Churchfield":
        locationID = "18";
        break;
      case "WHI The Kilkenny Shop-Whitewater SC":
        locationID = "20";
        break;
      case "Giftshed":
        locationID = "22";
        break;
      case "ENI Kilkenny Ennis":
        locationID = "27";
        break;
      case "GRY Kilkenny Shop Greystones":
        locationID = "28";
        break;
      case "SAM Sammys Retail":
        locationID = "30";
        break;
      case "KDC Kilkenny Design Centre":
        locationID = "31";
        break;
      case "CRP Customer Services":
        locationID = "35";
        break;
      case "SWO Giftshed":
        locationID = "37";
        break;
    }

    myHeaders.append("Content-Type", "application/json"); //append application type

    // create a JSON object with parameters for API call and store in a variable
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID, //number given from backend
        start_date: startDate + "T00:00:00.000", //string
        end_date: endDate + "T23:59:59.999",
      }),
      redirect: "follow",
    };

    const requestVem = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID2, //location ID number given from backend
        start_date: startDate + "T00:00:00.000", //string
        end_date: endDate + "T23:59:59.999",
      }),
      redirect: "follow",
    };

    callVemcount(requestVem);
    callTransfromDate(requestOptions);
    callgetPotAll(requestOptions);
    callIPT(myHeaders, locationID, startDate, endDate);
    callBudget(myHeaders, locationID, startDate, endDate);
    callsalesBudget(myHeaders, locationID, startDate, endDate);
    callYesterday(myHeaders, locationID, yesterdayStart, yesterdayEnd);
  }

  const callVemcount = async (requestVem) => {
    await fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/vemcount",
      requestVem
    )
      .then((response) => response.text())
      .then((result) => storeFootfall(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };
  const callTransfromDate = async (requestOptions) => {
    await fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_transactions_from_date",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => renderAPIData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
    //console.log(requestOptions);
  };
  const callgetPotAll = async (requestOptions) => {
    await fetch(
      " https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_pot_all",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => testMethod(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const callsalesBudget = async (myHeaders, locationID, startDate, endDate) => {
    const requestsalesBudget = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID,
        start_date: startDate + "T00:00:00.000",
        end_date: endDate + "T23:59:59.999",
        category: "DAILY2",
      }),
      redirect: "follow",
    };
    await fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_budget_2022",
      requestsalesBudget
    )
      .then((response) => response.text())
      .then((result) => getsalesBudget(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const callBudget = async (myHeaders, locationID, startDate, endDate) => {
    [
      "DAILY2",
      "MARGIN2",
      "ORDERS2",
      "FOOTFALL2",
      "ATV2",
      "IPT2",
      "CONVERSION2", // all catagories in budget API from backend
    ].forEach(async (item) => {
      const requestBudget = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          location_id: locationID,
          start_date: startDate + "T00:00:00.000",
          end_date: endDate + "T23:59:59.999",
          category: item, //request header should include a category string
        }),
        redirect: "follow",
      };
      await fetch(
        "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_budget_2022",
        requestBudget
      )
        .then((response) => response.text())
        .then((result) => getBudget(JSON.parse(result), item))
        .catch((error) => console.log("error", error));
    });

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; //calculate the exact days of budget call
    console.log("diffDay is ", diffDay);

    diffDayWhole = diffDay;
  };

  const callIPT = async (myHeaders, locationID, startDate, endDate) => {
    const requestIPT = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID,
        start_date: startDate + "T00:00:00.000",
        end_date: endDate + "T23:59:59.999",
      }),
      redirect: "follow",
    };
    await fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_ipt_2022",
      requestIPT
    )
      .then((response) => response.text())
      .then((result) => getIPT(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const callYesterday = async (
    //using fixed start date and end date to call API and render data from yesterday
    myHeaders,
    locationID,
    yesterdayStart,
    yesterdayEnd
  ) => {
    const requestYesterday = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID,
        start_date: yesterdayStart + "T00:00:00.000",
        end_date: yesterdayEnd + "T23:59:59.999",
      }),
      redirect: "follow",
    };

    await fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_transactions_from_date",
      requestYesterday
    )
      .then((response) => response.text())
      .then((result) => getYesterday(JSON.parse(result)))
      .catch((error) => console.log("error", error));

    await fetch(
      " https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_pot_all",
      requestYesterday
    )
      .then((response) => response.text())
      .then((result) => getYesMargin(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="Home">
      <form>
        <div className="container my-3 form-group">
          <div className="row my-2">
            <div className="col">
              {/* <!-- The Sign-in button. This will run `queryReports()` on success. --> */}
              <p className="g-signin2" data-onsuccess="queryGAReports"></p>
              <script src="/js/googleAnalyticsRetrieval.js"></script>
            </div>
            <div className="col">
              <select
                className="selectpicker"
                id="locationPicker"
                data-style="btn-success"
              >
                <option defaultValue>Please choose a location...</option>
                <option>RKD The Kilkenny Shop-Nassau Street D2</option>
                <option>SWO The Kilkenny Shop-Swords</option>
                <option>TRI The Kilkenny Shop-Trim</option>
                <option>SHA The Kilkenny Shop-Shanagarry</option>
                <option>RBY Christys-Killarney</option>
                <option>RSY The Kilkenny Shop-Killarney</option>
                <option>GAL The Kilkenny Shop-Galway</option>
                <option>CAS The Kilkenny Shop-Cashel</option>
                <option>RBQ Christys-Cobh</option>
                <option>COR The Kilkenny Shop-Cork City</option>
                <option>STI The Kilkenny Shop-Stillorgan SC</option>
                <option>DOU The Kilkenny Shop-Douglas Court SC</option>
                <option>KBY Warehouse Churchfield</option>
                <option>WHI The Kilkenny Shop-Whitewater SC</option>
                <option>Giftshed</option>
                <option>ENI Kilkenny Ennis</option>
                <option>GRY Kilkenny Shop Greystones</option>
                <option>SAM Sammys Retail</option>
                <option>KDC Kilkenny Design Centre</option>
                <option>CRP Customer Services</option>
                <option>SWO Giftshed</option>
                <option>WWW Website Sales</option>
              </select>
            </div>

            {isLoading ? <LoadingSpinner /> : ""}
            <div className="col date">
              <div className="row date">
                <div className="col date-from">
                  <label className="label1">From</label>
                </div>
                <div className="col date1">
                  <input
                    className="button"
                    type="date"
                    id="date1"
                    min="01-01-00"
                    max="01-01-99"
                    value1="01-01-21"
                  />
                  <script>
                    var dateControl2 =
                    document.querySelector('input[type="date"]');
                    dateControl2.value = '2022-02-14';
                  </script>
                </div>
              </div>
              <div className="row date">
                <div className="col date2">
                  <div className="col date-from">
                    <label className="label2">To</label>
                  </div>
                </div>
                <div className="col date2">
                  <input
                    className="button"
                    type="date"
                    id="date2"
                    min="01-01-00"
                    max="01-01-99"
                    value2="01-01-21"
                  />
                  <script>
                    var dateControl2 =
                    document.querySelector('input[type="date"]');
                    dateControl2.value = '2022-02-20';
                  </script>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => callAPI()}
              className="btn btn-primary"
            >
              Go
            </button>
          </div>
        </div>
      </form>
      {/* <!-- Table of KPIs (Key Performance Indicators) --> */}
      <div className="container my-3" id="kpi-mv">
        <div className="row my-2">
          <div className="col container p-3 border">
            <h5 id="sales">SALES</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="sales-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="sales-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance €</h6>
                  <p className="changeColor" id="sales-varEur-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="sales-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col container p-3 border">
            <h5 id="transactions">TRANSACTIONS</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="items-sold-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="items-sold-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance</h6>
                  <p className="changeColor" id="items-sold-var-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="items-sold-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className="col container p-3 border">
            <h5 id="margin">MARGIN</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="margin-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="margin-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance €</h6>
                  <p className="changeColor" id="margin-varEur-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="margin-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col container p-3 border">
            <h5 id="margin%">MARGIN %</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="margin-percentage-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="margin-percentage-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="margin-percentage-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className="col container p-3 border">
            <h5 id="footfall">FOOTFALL</h5>
            <div
              className="progress visually-hidden"
              id="sessions-footfall-progress-placeholder"
            >
              <div
                className="progress-bar"
                id="sessions-footfall-progress-bar"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                0%
              </div>
            </div>
            <div id="sessions-footfall-output" className="col">
              <div className="row my-2">
                <div className="col">
                  <div className="container hoverable p-3 border">
                    <h6>Actual</h6>
                    <p id="sessions-ff-actual-mv">-</p>
                  </div>
                </div>
                <div className="col">
                  <div className="container hoverable p-3 border">
                    <h6>Budget</h6>
                    <p id="sessions-ff-budget-mv">-</p>
                  </div>
                </div>
                <div className="col">
                  <div className="container hoverable p-3 border">
                    <h6>Variance</h6>
                    <p className="changeColor" id="sessions-ff-var-mv">
                      -
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="container hoverable p-3 border">
                    <h6>Variance %</h6>
                    <p className="changeColor" id="sessions-ff-varPerc-mv">
                      -
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col container p-3 border">
            <h5 id="conversionRate">CONVERSION RATE</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="conversion-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="conversion-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="conversion-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <div className="col container p-3 border">
            <h5 id="atv">ATV</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="atv-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="atv-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance €</h6>
                  <p className="changeColor" id="atv-varEur-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="atv-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col container p-3 border">
            <h5 id="ipt">IPT</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Actual</h6>
                  <p id="ipt-actual-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="ipt-budget-mv">-</p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance</h6>
                  <p className="changeColor" id="ipt-var-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Variance %</h6>
                  <p className="changeColor" id="ipt-varPerc-mv">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" id="charts">
          <div className="row">
            <div className="col" id="pieChartDemographic">
              <h3>Footfall Demographics</h3>
              <ResponsiveContainer width="90%" height="90%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={graphicData}
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    fill="blue"
                    label={renderCustomizedLabel}
                    labelLine={false}
                  />

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col" id="linePlotFootfall">
              <h3>Yesterday Actual VS Daily Average</h3>
              <ResponsiveContainer width="90%" height="90%">
                <BarChart
                  width={500}
                  height={300}
                  data={barData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="YesterdayActual" fill="#8884d8" />
                  <Bar dataKey="DailyAverage" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

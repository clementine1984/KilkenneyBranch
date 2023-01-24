import { React, useState, useEffect } from "react";
import "./RetailPulse.css";
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
} from "recharts";

export default function RetailPulse() {
  const [isLoading, setIsLoading] = useState(false);
  const [male, maleChange] = useState(10);
  const [female, femaleChange] = useState(10);
  const [today] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const [selectedLocation, setLocation] = useState();

  useEffect(() => {
    function updateTime() {
      endDate =
        getStringDate(now) +
        "T" +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":00.000";

      console.log("endDate", endDate);
    }

    if (selectedLocation != undefined) {
      const interval = setInterval(() => {
        updateTime();
        callAPI();
        if (now.getHours() > 20) {
          //stop update data after 8pm.
          clearInterval(interval);
        }
      }, 15 * 60 * 1000); //auto-refresh page every 15 minutes
    }
  }, [selectedLocation]); //when the selected location changes, re-render the page

  let into = 0;
  let margin = 0;
  let marginperc = 0;

  let salesBugdet = 0,
    transBugdet = 0,
    marginBugdet = 0,
    footfallBugdet = 0,
    convBugdet = 0,
    atvBugdet = 0,
    iptBugdet = 0;

  let marginAct = 0,
    salesAct = 0,
    transAct = 0,
    convAct = 0,
    footfallAct = 0,
    atvAct = 0,
    iptAct = 0;

  function getStringDate(aDate) {
    //convert date to a string
    var dd = aDate;
    var yy = dd.getYear();
    var mm = dd.getMonth() + 1;
    dd = dd.getDate();
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
  }

  let budgetTime = getStringDate(today);

  let startDate = getStringDate(today) + "T" + "10:00:00.000"; //starts from 10am.
  let endDate =
    getStringDate(now) +
    "T" +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":00.000";

  // console.log("new start date", startDate);
  // console.log("new end date", endDate);

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

  const compareData = [  //fake data
    {
      name: "Shop1",
      Actual: 4000,
      Budget: 2400,
    },
    {
      name: "Shop2",
      Actual: 3000,
      Budget: 1398,
    },
    {
      name: "Shop3",
      Actual: 2000,
      Budget: 9800,
    },
    {
      name: "Shop4",
      Actual: 2780,
      Budget: 3908,
    },
    {
      name: "Shop5",
      Actual: 1890,
      Budget: 4800,
    },
  ];

  const graphicData = [
    { name: "Male", value: male, fill: "#1a1182" },
    { name: "Female", value: female, fill: "#84003d" },
  ];

  const getIPT = (data) => {
    document.getElementById("ipt-actual-mv").innerHTML =
      data.ipt_value.toFixed(2);
    iptAct = data.ipt_value.toFixed(2);
    if (iptAct < iptBugdet) {
      document.getElementById("ipt-actual-mv").classList.remove("text-success");
      document.getElementById("ipt-actual-mv").classList.add("text-danger");
    } else {
      document.getElementById("ipt-actual-mv").classList.add("text-success");
      document.getElementById("ipt-actual-mv").classList.remove("text-danger");
    }
  };

  const testMethod = (data) => {
    setIsLoading(false);
    //console.log(data);

    for (var i = 0; i < data.length; i++) {
      margin += data[i].profit_margin;
    }

    document.getElementById("margin-actual-mv").innerHTML = margin.toFixed(2);
    marginAct = parseFloat(
      document.getElementById("margin-actual-mv").innerHTML
    );

    var marginprofit = 0;
    var transaction = 0;
    for (var i = 0; i < data.length; i++) {
      marginprofit += data[i].total_profit_margin;
      transaction += data[i].dept_wise_transaction;
    }

    marginperc = marginprofit.toFixed(2) / transaction;
    document.getElementById("margin-percentage-actual-mv").innerHTML =
      marginperc.toFixed(2);

    colorMetrics();
  };

  var storeFootfall = (data) => {
    var reportData = data;
    var malet = 0;
    var femalet = 0;

    for (var i = 0; i < reportData.count_in.length; i++) {
      into += reportData.count_in[i];
      malet += reportData.demographics_male[i];
      femalet += reportData.demographics_female[i];
    }
    if (femalet > 0 && malet > 0) {
      femaleChange(femalet);
      maleChange(malet);
    } else {
      femaleChange(1);
      maleChange(1);
    }
  };

  const getBudget = async (data, item) => {
    //console.log("getBudget", data);

    switch (item) {
      case "DAILY2":
        document.getElementById("sales-budget-mv").innerHTML =
          data.total_budget.toFixed(2);
        salesBugdet = parseFloat(data.total_budget.toFixed(2));
        break;
      case "MARGIN2":
        document.getElementById("margin-budget-mv").innerHTML =
          data.total_budget.toFixed(2);
        marginBugdet = parseFloat(data.total_budget.toFixed(2));
        break;
      case "ORDERS2":
        document.getElementById("items-sold-budget-mv").innerHTML = parseInt(
          data.total_budget
        );
        transBugdet = parseInt(data.total_budget);
        break;
      case "FOOTFALL2":
        document.getElementById("sessions-ff-budget-mv").innerHTML =
          data.total_budget.toFixed(2);
        footfallBugdet = parseFloat(data.total_budget.toFixed(2));
        break;
      case "ATV2":
        document.getElementById("atv-budget-mv").innerHTML =
          data.total_budget.toFixed(2);
        atvBugdet = parseFloat(data.total_budget.toFixed(2));
        break;
      case "IPT2":
        document.getElementById("ipt-budget-mv").innerHTML =
          data.total_budget.toFixed(2);
        iptBugdet = parseFloat(data.total_budget.toFixed(2));
        break;
      case "CONVERSION2":
        document.getElementById("conversion-budget-mv").innerHTML = (
          data.total_budget * 100
        ).toFixed(2);
        convBugdet = parseFloat(
          document.getElementById("conversion-budget-mv").innerHTML
        );
        break;
    }
    colorMetrics();
  };

  var renderAPIData = (data) => {
    //clearMetrics(); // Clear the metrics that are already there

    var reportData = data;
    document.getElementById("sales-actual-mv").innerHTML =
      reportData.total_sales;
    salesAct = parseFloat(document.getElementById("sales-actual-mv").innerHTML);

    try {
      // items sold
      document.getElementById("items-sold-actual-mv").innerHTML =
        reportData.total_transactions;
      transAct = reportData.total_transactions;

      // sessions - not ideal to calculate this here
      document.getElementById("sessions-ff-actual-mv").innerHTML = into;
      footfallAct = parseFloat(into);

      // // Conversion - not ideal to calculate this here
      document.getElementById("conversion-actual-mv").innerHTML = (
        (document.getElementById("items-sold-actual-mv").innerHTML /
          document.getElementById("sessions-ff-actual-mv").innerHTML) *
        100
      ).toFixed(2);

      convAct = parseFloat(
        document.getElementById("conversion-actual-mv").innerHTML
      );

      // // ATV
      document.getElementById("atv-actual-mv").innerHTML = (
        reportData.total_sales / reportData.total_transactions
      ).toFixed(2);
      atvAct = parseFloat(document.getElementById("atv-actual-mv").innerHTML);

      // // IPT
    } catch (e) {
      console.log(e + ". Skipping...\n");
    }

    colorMetrics();
  };

  const colorMetrics = () => {
    //check if the actual data is less than the budget, if it is, the actual data will be red, otherwise it will be green.
    if (marginAct < marginBugdet) {
      document
        .getElementById("margin-actual-mv")
        .classList.remove("text-success");
      document.getElementById("margin-actual-mv").classList.add("text-danger");
    } else {
      document.getElementById("margin-actual-mv").classList.add("text-success");
      document
        .getElementById("margin-actual-mv")
        .classList.remove("text-danger");
    }

    if (salesAct < salesBugdet) {
      document
        .getElementById("sales-actual-mv")
        .classList.remove("text-success");
      document.getElementById("sales-actual-mv").classList.add("text-danger");
    } else {
      document.getElementById("sales-actual-mv").classList.add("text-success");
      document
        .getElementById("sales-actual-mv")
        .classList.remove("text-danger");
    }

    if (transAct < transBugdet) {
      document
        .getElementById("items-sold-actual-mv")
        .classList.remove("text-success");
      document
        .getElementById("items-sold-actual-mv")
        .classList.add("text-danger");
    } else {
      document
        .getElementById("items-sold-actual-mv")
        .classList.add("text-success");
      document
        .getElementById("items-sold-actual-mv")
        .classList.remove("text-danger");
    }

    if (footfallAct < footfallBugdet) {
      document
        .getElementById("sessions-ff-actual-mv")
        .classList.remove("text-success");
      document
        .getElementById("sessions-ff-actual-mv")
        .classList.add("text-danger");
    } else {
      document
        .getElementById("sessions-ff-actual-mv")
        .classList.add("text-success");
      document
        .getElementById("sessions-ff-actual-mv")
        .classList.remove("text-danger");
    }

    if (convAct < convBugdet) {
      document
        .getElementById("conversion-actual-mv")
        .classList.remove("text-success");
      document
        .getElementById("conversion-actual-mv")
        .classList.add("text-danger");
    } else {
      document
        .getElementById("conversion-actual-mv")
        .classList.add("text-success");
      document
        .getElementById("conversion-actual-mv")
        .classList.remove("text-danger");
    }

    if (atvAct < atvBugdet) {
      document.getElementById("atv-actual-mv").classList.remove("text-success");
      document.getElementById("atv-actual-mv").classList.add("text-danger");
    } else {
      document.getElementById("atv-actual-mv").classList.add("text-success");
      document.getElementById("atv-actual-mv").classList.remove("text-danger");
    }
  };

  const clearMetrics = () => {
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

  function callAPI() {
    clearMetrics();

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    let selectedLocation = document.getElementById("locationPicker").value;
    setLocation(selectedLocation);
    setNow(new Date());

    if (selectedLocation == "Please choose a location...") {
      alert("Please choose a location.");
      return;
    }

    if (endDate < startDate) {
      alert("Sorry,there is no data for today yet");
      return;
    }

    setIsLoading(true);
    let locationID = "0";
    let locationID2 = "0";
    // var loc1a = "7";
    // var loc1 = "19706";
    // var loc2a = "10";
    // var loc2 = "19688";
    // var loc3a = "9";
    // var loc3 = "19621";
    // var loc4a = "15";
    // var loc4 = "19565";

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
    // create a JSON object with parameters for API call and store in a variable
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID,
        start_date: startDate,
        end_date: endDate,
      }),
      redirect: "follow",
    };

    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID2,
        start_date: startDate,
        end_date: endDate,
      }),
      redirect: "follow",
    };

    callApiOne(myHeaders, locationID);
    callApiTwo(requestOptions);
    callIPT(myHeaders, locationID);
    callBudget(myHeaders, locationID);
    // make API call with parameters and use promises to get response
    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_transactions_from_date",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => renderAPIData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
    fetch(
      " https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_pot_all",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => testMethod(JSON.parse(result)))
      .catch((error) => console.log("error", error));
    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/vemcount",
      requestOptions2
    )
      .then((response) => response.text())
      .then((result) => storeFootfall(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }

  const callApiOne = (myHeaders, locationID2) => {
    console.log("vemcount call");
    var requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID2,
        start_date: startDate,
        end_date: endDate,
      }),
      redirect: "follow",
    };

    //console.log("old request body", requestOptions2.body);

    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/vemcount",
      requestOptions2
    )
      .then((response) => response.text())
      .then((result) => storeFootfall(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  var callApiTwo = (requestOptions) => {
    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_transactions_from_date",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => renderAPIData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  const callBudget = (myHeaders, locationID) => {
    [
      "DAILY2",
      "MARGIN2",
      "ORDERS2",
      "FOOTFALL2",
      "ATV2",
      "IPT2",
      "CONVERSION2",
    ].forEach((item) => {
      const requestBudget = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          location_id: locationID,
          start_date: startDate,
          end_date: budgetTime + "T23:59:59.999",
          category: item,
        }),
        redirect: "follow",
      };
      fetch(
        "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_budget_2022",
        requestBudget
      )
        .then((response) => response.text())
        .then((result) => getBudget(JSON.parse(result), item))
        .catch((error) => console.log("error", error));
    });
  };

  const callIPT = (myHeaders, locationID) => {
    const requestIPT = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        location_id: locationID,
        start_date: startDate,
        end_date: endDate,
      }),
      redirect: "follow",
    };

    fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_ipt_2022",
      requestIPT
    )
      .then((response) => response.text())
      .then((result) => getIPT(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="Home">
      <form>
        <div className="container my-3 form-group text-justify">
          <div className="row my-2">
            <div className="col-4"></div>
            <div className="col text-justify">
              <div className="my-2">
                <h2>Check real time retail data</h2>

                <select
                  className="selectpicker"
                  id="locationPicker"
                  data-style="btn-success"
                >
                  <option defaultValue>Please choose a location...</option>
                  <option>RKD The Kilkenny Shop-Nassau Street D2</option>
                  <option>SWO The Kilkenny Shop-Swords</option>
                  <option>TRI The Kilkenny Shop-Trim</option>
                  <option>DOU The Kilkenny Shop-Douglas Court SC</option>
                  <option>SHA The Kilkenny Shop-Shanagarry</option>
                  <option>RBY Christys-Killarney</option>
                  <option>RSY The Kilkenny Shop-Killarney</option>
                  <option>GAL The Kilkenny Shop-Galway</option>
                  <option>CAS The Kilkenny Shop-Cashel</option>
                  <option>RBQ Christys-Cobh</option>
                  <option>COR The Kilkenny Shop-Cork City</option>
                  <option>STI The Kilkenny Shop-Stillorgan SC</option>
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
            </div>

            {isLoading ? <LoadingSpinner /> : ""}
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
            <h5>SALES & TRANSACTIONS</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Sales</h6>
                  <p className="changeColor" id="sales-actual-mv">
                    -
                  </p>
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
                  <h6>Transactions</h6>
                  <p className="changeColor" id="items-sold-actual-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="items-sold-budget-mv">-</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col container p-3 border">
            <h5>MARGIN & MARGIN PERCENTAGE</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Margin</h6>
                  <p className="changeColor" id="margin-actual-mv">
                    -
                  </p>
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
                  <h6>Margin %</h6>
                  <p id="margin-percentage-actual-mv">-</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-2">
          <div className="col container p-3 border">
            <h5>FOOTFALL & CONVERSION RATE</h5>
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
                    <h6>Footfall</h6>
                    <p className="changeColor" id="sessions-ff-actual-mv">
                      -
                    </p>
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
                    <h6 className="smallTitle">Conversion Rate</h6>
                    <p className="changeColor" id="conversion-actual-mv">
                      -
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="container hoverable p-3 border">
                    <h6>Budget</h6>
                    <p id="conversion-budget-mv">-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col container p-3 border">
            <h5>ATV & IPT</h5>
            <div className="row my-2">
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>ATV</h6>
                  <p className="changeColor" id="atv-actual-mv">
                    -
                  </p>
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
                  <h6>IPT</h6>
                  <p className="changeColor" id="ipt-actual-mv">
                    -
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="container hoverable p-3 border">
                  <h6>Budget</h6>
                  <p id="ipt-budget-mv">-</p>
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
              <h3>Similar Shop Contrast</h3>
              <ResponsiveContainer width="90%" height="90%">
                <BarChart
                  width={500}
                  height={300}
                  data={compareData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Actual" fill="#8884d8" />
                  <Bar dataKey="Budget" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

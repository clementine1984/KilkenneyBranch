import "./Department.css";
// import {callAPI} from '../jsAssets/getS3Data'
import { React, useState } from "react";
import LoadingSpinner from "./LoadingSpinner.js";
function Department() {
  const [isLoading, setIsLoading] = useState(false);

  var renderAPIData = (data) => {

    console.log('get_pot_dept', data);
    setIsLoading(false);
    console.log(data); // clearMetrics(); // Clear the metrics that are already there
    if (data.statusCode != 200) {
      console.log("Lambda error. Error code: " + data.statusCode);
    }
    console.log(data);
    var reportData = data;
    console.log(reportData);

    //Fill in the KPI boxes per report response
    document.getElementById("sales-actual-mv").innerHTML =
      reportData.total_sales.toFixed(2);
    // document.getElementById("sales-budget-mv").innerHTML = 1;
    document.getElementById("sales-varEur-mv").innerHTML = (
      reportData.total_sales -
      document.getElementById("sales-budget-mv").innerHTML
    ).toFixed(2);
    document.getElementById("sales-varPerc-mv").innerHTML =
      ((
        document.getElementById("sales-varEur-mv").innerHTML /
        document.getElementById("sales-budget-mv").innerHTML
      ) * 100).toFixed(2);

    document.getElementById("margin-percentage-actual-mv").innerHTML =
      reportData.totals[0].profit_margin.toFixed(2);
    // document.getElementById("margin-percentage-budget-mv").innerHTML = 1;


    // document.getElementById("margin-percentage-varPerc-mv").innerHTML = (
    //   reportData.totals[0].profit_margin / 1
    // ).toFixed(2);

    document.getElementById("margin-actual-mv").innerHTML =
      reportData.totals[0].total_profit_margin.toFixed(2);
    // document.getElementById("margin-budget-mv").innerHTML = 1;
    document.getElementById("margin-varEur-mv").innerHTML = (
      reportData.totals[0].total_profit_margin -
      document.getElementById("margin-budget-mv").innerHTML
    ).toFixed(2);
    document.getElementById("margin-varPerc-mv").innerHTML =
      ((
        document.getElementById("margin-varEur-mv").innerHTML /
        document.getElementById("margin-budget-mv").innerHTML
      ) * 100).toFixed(2);

    try {
      //items sold
      document.getElementById("items-sold-actual-mv").innerHTML =
        reportData.total_items;
      // document.getElementById("items-sold-budget-mv").innerHTML = 1;
      document.getElementById("items-sold-var-mv").innerHTML =
        reportData.total_items -
        document.getElementById("items-sold-budget-mv").innerHTML;
      document.getElementById("items-sold-varPerc-mv").innerHTML =
        ((
          document.getElementById("items-sold-var-mv").innerHTML /
          document.getElementById("items-sold-budget-mv").innerHTML
        ) * 100).toFixed(2);
    } catch (e) {
      console.log(e + ". Skipping...\n");
    }

    colorMetrics();
  };

  var colorMetrics = () => {
    console.log("hihihihihihihih2");
    // Colour the metrics based on whether they are positive or negative
    var metricValueBoxes = document.getElementsByClassName("changeColor");
    for (var i = 0; i < metricValueBoxes.length; i++) {
      console.log("hi");
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

  var colorMetrics = () => {
    // Colour the metrics based on whether they are positive or negative
    var metricValueBoxes = document.getElementsByClassName("changeColor");
    for (var i = 0; i < metricValueBoxes.length; i++) {
      console.log("hi");
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

  const getBudget = (data, item) => {
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
    }
  };

  // define the callAPI function that takes a first name and last name as parameters
  async function callAPI() {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var selectedLocation = document.getElementById("locationPicker").value;
    var selectedDepartment = document.getElementById("departmentPicker").value;
    var startDate = document.getElementById("date1").value;
    var endDate = document.getElementById("date2").value;
    setIsLoading(true);
    console.log(selectedLocation);

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

    let locationID = "0";
    switch (selectedLocation) {
      case "RKD The Kilkenny Shop-Nassau Street D2":
        locationID = "7";
        break;
      case "SWO The Kilkenny Shop-Swords":
        locationID = "10";
        break;
      case "TRI The Kilkenny Shop-Trim":
        locationID = "9";
        break;
      case "WWW Website Sales":
        locationID = "19";
        break;
    }

    // Check for a department and add if needed

    if (selectedDepartment == "Please choose a department...") {
      alert("Please choose a department.");
      return;
    }

    let selectedDepartmentid;
    switch (selectedDepartment) {
      case "Accessories":
        selectedDepartmentid = "1";
        break;
      case "Books & Prints":
        selectedDepartmentid = "8";
        break;
      case "Charges":
        selectedDepartmentid = "35";
        break;
      case "Christmas":
        selectedDepartmentid = "10";
        break;
      case "Crystal & China":
        selectedDepartmentid = "6";
        break;
      case "Food":
        selectedDepartmentid = "9";
        break;
      case "Footwear":
        selectedDepartmentid = "71";
        break;
      case "Gents":
        selectedDepartmentid = "3";
        break;
      case "Jewellery":
        selectedDepartmentid = "13";
        break;
      case "Kiddies":
        selectedDepartmentid = "4";
        break;
      case "Ladies Clothing":
        selectedDepartmentid = "1";
        break;
      case "Linen":
        selectedDepartmentid = "11";
        break;
      case "Miscellaneous":
        selectedDepartmentid = "52";
        break;
      case "Newbridge":
        selectedDepartmentid = "15";
        break;
      case "Pottery":
        selectedDepartmentid = "14";
        break;
      case "Souvenirs & Heraldic":
        selectedDepartmentid = "7";
        break;
      case "Textiles":
        selectedDepartmentid = "68";
        break;
      case "Wellness":
        selectedDepartmentid = "70";
        break;
      case "994-ZERO/DISCOUNT ITEMS":
        selectedDepartmentid = "46";
        break;
    }



    var requestData = {
      location_id: locationID,
      start_date: startDate + "T00:00:00.000",
      end_date: endDate + "T23:59:59.999",
      dept_id: selectedDepartmentid,
    };

    requestData.dept_id = selectedDepartmentid;
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(requestData); // Place request body here
    console.log("Request data:" + raw);
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // make API call with parameters and use promises to get response
    await fetch(
      "https://0afi3d8uoc.execute-api.eu-west-1.amazonaws.com/default/get_pot_dept",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => renderAPIData(JSON.parse(result)))
      .catch((error) => console.log("error", error));

    // call budget API
    ["DAILY2", "MARGIN2", "ORDERS2"].forEach( async (item) => {
      const requestBudget = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          location_id: locationID,
          dept_id: selectedDepartmentid,
          start_date: startDate + "T00:00:00.000",
          end_date: endDate + "T23:59:59.999",
          category: item,
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
  }

  return (
    <div className="Retail">
      <body>
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
              <div className="col">
                <select
                  className="selectpicker"
                  id="departmentPicker"
                  data-style="btn-success"
                >
                  <option defaultValue>Please choose a department...</option>
                  <option>Accessories</option>
                  <option>Books & Prints</option>
                  <option>Charges</option>
                  <option>Christmas</option>
                  <option>Crystal & China</option>
                  <option>Food</option>
                  <option>Footwear</option>
                  <option>Gents</option>
                  <option>Jewellery</option>
                  <option>Kiddies</option>
                  <option>Ladies Clothing</option>
                  <option>Linen</option>
                  <option>Miscellaneous</option>
                  <option>Newbridge</option>
                  <option>Pottery</option>
                  <option>Souvenirs & Heraldic</option>
                  <option>Textiles</option>
                  <option>Wellness</option>
                  <option>994-ZERO/DISCOUNT ITEMS</option>
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
                      dateControl2.value = '2017-06-01';
                    </script>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <button
                type="button"
                onClick={() => callAPI(true)}
                className="btn btn-primary"
              >
                Go
              </button>
            </div>
          </div>
        </form>

        {/* <!-- KPI display Boxes --> */}
        <div className="container my-3" id="kpi-mv">
          <div className="row my-2" id="changeRowColor">
            <div className="col container  p-3 border">
              <h5 id="salesheader">SALES</h5>
              <div className="row my-2">
                <div className="col">
                  <div className="container hoverable  p-3 border">
                    <h6>Actual</h6>
                    <p id="sales-actual-mv">-</p>
                  </div>
                </div>
                <div className="col hoverable">
                  <div className=" container hoverable  p-3 border">
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
                  <div className="container  hoverable p-3 border">
                    <h6>Variance %</h6>
                    <p className="changeColor" id="sales-varPerc-mv">
                      -
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col container p-3 border">
              <h5>ITEMS SOLD</h5>
              <div className="row my-2">
                <div className="col">
                  <div className="container hoverable p-3 border">
                    <h6>Actual</h6>
                    <p id="items-sold-actual-mv">-</p>
                  </div>
                </div>
                <div className="col">
                  <div className="container  hoverable p-3 border">
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
              <h5>MARGIN</h5>
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
              <h5>MARGIN %</h5>
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
                    <p
                      className="changeColor"
                      id="margin-percentage-varPerc-mv"
                    >
                      -
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" id="charts">
          {/* <div className="row">
      <div className="col" id="pieChartDemographic">
        <h3>Footfall Demographics</h3>
        <ResponsiveContainer width="90%" height="90%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
         
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
        
      </div>
      <div className="col" id="linePlotFootfall">
        <h3>Footfall Count</h3>
        <ResponsiveContainer width="90%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
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
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div> */}
        </div>
      </body>
    </div>
  );
}

export default Department;

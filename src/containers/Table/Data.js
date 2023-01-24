const Data = () => {

  const sortData = (data) => {
    //console.log("data", data);

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

    return {results};
  };

  //const getData = () => {
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
 // }

};

export default Data;

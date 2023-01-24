import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
  import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Department from "./containers/Department";
import Navbar from "./Navbar";
import Home from "./containers/Home";
import ECommerce from "./containers/ECommerce";
import Routes from "./Routes";
import Tables from "./containers/Table/Tables";
import Tables2 from "./containers/Table/MoreTables";
import React from "react";
import RetailPulse from "./containers/RetailPulse";
import Data from "./containers/Table/Data";
import FlowOverview1 from "./containers/FlowCharts/FlowCharts1/FlowOverview1";
import FlowOverview2 from "./containers/FlowCharts/FlowCharts2/FlowOverview2";
import VennDiagram from "./containers/FlowCharts/FlowCharts2/VennDiagram";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App container-fluid ">
          <Navbar />
          <Switch>
            <Route exact path="/department" component={Department}>
              <Department />
            </Route>
            <Route exact path="/tables" component={Tables}>
              <Tables />
            </Route>
            <Route exact path="/charts" component={FlowOverview1}></Route>
            <Route exact path="/charts2" component={FlowOverview2}></Route>
            {/* <Route exact path="/moreTables" component={Tables2}>
            <Tables2 />
          </Route> */}
            <Route exact path="/retailpulse" component={RetailPulse}>
              <RetailPulse />
            </Route>
            <Route exact path="/" component={Home}>
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

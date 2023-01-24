import React, {
  Component,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Highcharts from "highcharts";
import VennModule from "highcharts/modules/venn.js";
import HighchartsReact from "highcharts-react-official";
import "../Charts.css";

VennModule(Highcharts);

const apiResponse = [
  {
    sets: ["Physical Stores"],
    value: 715154,
  },
  {
    sets: ["Website"],
    value: 410270,
  },
  {
    sets: ["Social Media"],
    value: 101151,
  },
  {
    sets: ["Physical Stores", "Website"],
    value: 213254,
    name: "Physical Stores + Website",
  },
  {
    sets: ["Physical Stores", "Social Media"],
    value: 9500,
    name: "Physical Stores + Social Media",
  },
  {
    sets: ["Website", "Social Media"],
    value: 45124,
    name: "Website + Social Media",
  },
  {
    sets: ["Physical Stores", "Website", "Social Media"],
    value: 7500,
    name: "All three",
  },
];

export default class VennDiagram extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: apiResponse });
  }

  render() {
    let vennOptions = {
      title: {
        text: "E-Commerce Data",
      },
      chart: {
        backgroundColor: "#5a1541CC",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        className: "",
        animation: false,
        height: 600,
        // width: 600,
      },
      series: [
        {
          type: "venn",
          name: "Sales Amount",
          data: this.state.data,
        },
      ],
    };

    return (
      <>
        <div className="row justify-content-center">
          <div style={{ height: 400, width: 800 }}>
            <h2>Venn Diagram</h2>
            <HighchartsReact highcharts={Highcharts} options={vennOptions} />
          </div>
        </div>

      </>
    );
  }
}

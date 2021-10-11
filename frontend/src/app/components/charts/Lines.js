import { height } from "@mui/system";
import React, { Component } from "react";
import Chart from "react-apexcharts";

class NewLines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          width: "100%",
          height: 100,
        },
        grid: {
          show: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: this.props.title,
          style: {
            fontSize: "18px",
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: ["Dia 1", "Dia 2", "Dia 3"],
        },
      },

      series: [
        {
          name: "2020",
          data: [3.7, 1.3, 0.4],
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height="350vh"
      />
    );
  }
}

export default NewLines;

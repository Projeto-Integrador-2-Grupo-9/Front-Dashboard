import { height } from "@mui/system";
import React, { Component } from "react";
import Chart from "react-apexcharts";

class Bars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          width: "100%",
          height: 95,
        },
        fill: {
          colors: [this.props.color],
        },
        plotOptions: {
          bar: {
            horizontal: this.props.rotated,
          },
        },
        title: {
          text: this.props.title,
          style: {
            fontSize: "18px",
          },
        },
        grid: {
          show: false,
        },
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
          fontWeight: 700,
        },
        xaxis: {
          categories: this.props.cat,
        },
      },

      series: this.props.data,
    };
  }

  componentDidMount() {
    console.log(this.props.data, "hey");
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={350}
      />
    );
  }
}

export default Bars;
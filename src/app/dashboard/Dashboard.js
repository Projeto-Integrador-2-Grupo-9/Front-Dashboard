import React, { Component } from "react";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import axios from "axios";
import localForage from "localforage";
import { ToastContainer, toast } from "react-toastify";
import Filters from "./filters";
import MockBarSimple from "../charts/BarSimple";
import MockBarStacked from "../charts/BarStacked";
import BarSimple from "./filters";
import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";
import Chart, {
  CommonSeriesSettings,
  ValueAxis,
  Label,
  Legend,
  Series,
  Tooltip,
  Border,
  ArgumentAxis,
} from "devextreme-react/chart";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Dashboard extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  constructor() {
    super();
    this.state = {
      receivedData: [],
      handleChartClick: [],
      receivedFilter: [],
      grid: true,
      openLoading: false,
      token: "",
      curTime: new Date().toLocaleString(),
    };
  }
  data = {
    labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  areaData = {
    labels: ["2013", "2014", "2015", "2016", "2017"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: true, // 3: no fill
      },
    ],
  };

  areaOptions = {
    plugins: {
      filler: {
        propagate: true,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };

  doughnutPieData = {
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Pink", "Blue", "Yellow"],
  };

  doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  scatterChartData = {
    datasets: [
      {
        label: "First Dataset",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 3,
          },
          {
            x: -25,
            y: 5,
          },
          {
            x: 40,
            y: 5,
          },
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
        borderWidth: 1,
      },
      {
        label: "Second Dataset",
        data: [
          {
            x: 10,
            y: 5,
          },
          {
            x: 20,
            y: -30,
          },
          {
            x: -25,
            y: 15,
          },
          {
            x: -10,
            y: 5,
          },
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  scatterChartOptions = {
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };

  /*  async handleChartClick(data) {
    data != undefined
      ? data[0]
        ? data[0][Object.keys(data[0])[0]][0] != undefined
          ? await localForage.getItem("keys").then((keys) => {
              this.handleOpenLoading();
              axios
                .post("http://localhost:5000/dashboard/getcharts", data, {
                  headers: {
                    Authorization: "Bearer " + keys.token.toString(),
                  },
                })
                .then(
                  (cats) => {
                    this.setState(
                      {
                        receivedFilter: cats.data.data.receivedFilter,
                        token: keys.token.toString(),
                        receivedData: cats.data.data.receivedData,
                      },
                      () => {
                        // console.log(this.state.receivedFilter);
                        this.handleCloseLoading();
                      }
                    );
                  },
                  (err) => {
                    console.log(err, "olha o erro ");
                    this.handleCloseLoading();
                    toast.error("Sem dados para esse filtro", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                );
            })
          : null
        : null
      : null;
  } */

  transactionHistoryData = {
    labels: ["Baixa", "Média", "Alta"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#111111", "#00d25b", "#ffab00"],
      },
    ],
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  render() {
    return (
      <div>
          <div className="row"> 
        <div className="col-md-8 col-sm-6 grid-margin p-0">
          <div className="row">
            <div className="col-sm-3 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ color: "grey" }}>Temperatura</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 ">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0 mt-0">24 C</h2>
                      </div>
                    </div>
                    {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ color: "grey" }}>Condutividade</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 ">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0 mt-0">32 W</h2>
                      </div>
                    </div>
                    {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ color: "grey" }}>Nitrogênio</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 ">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0 mt-0">50</h2>
                      </div>
                    </div>
                    {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ color: "grey" }}>Oxigênação</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 ">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0 mt-0">24.57%</h2>
                      </div>
                    </div>
                    {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 grid-margin pl-5">
          <div className="row">
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCrDnH48o88fCpd-Dqlw-QUAyBhhB0Pcio",
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

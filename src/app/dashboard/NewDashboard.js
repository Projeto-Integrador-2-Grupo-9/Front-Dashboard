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
import MockLine from "../charts/Lines";
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

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class NewDash extends Component {
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
    this.handleReceivedData = this.handleReceivedData.bind(this);
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

  async handleReceivedData(data) {
    this.handleOpenLoading();

    await localForage.getItem("keys").then((keys) => {
      localForage.getItem("route").then((rout) => {
        axios
          .post(
            "http://localhost:5000/dashboard/getcharts",
            {
              indicador_chave: rout.route,
              tipo: data.tipo,
              empresa: data.empresa,
              filial: data.filial,
              despesa: data.despesa,
              diretoria: data.diretoria,
              formato_da_amostra: data.formato,
              funcao: data.cargo,
              vinculo: data.vinculo,
              grupo: data.grupo,
              inicio: data.inicio == "2019/01" ? null : data.inicio,
              termino: data.termino == "2021/02" ? null : data.termino,
            },
            {
              headers: {
                Authorization: "Bearer " + keys.token.toString(),
              },
            }
          )
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
      });
    });
  }

  transactionHistoryData = {
    labels: ["Invalidos", "Validos"],
    datasets: [
      {
        data: [65, 30],
        backgroundColor: ["#F5564A","#00d25b"],
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
        {/*  <div className="proBanner">
          <div>
            <span className="d-flex align-items-center purchase-popup">
              <p>Get tons of UI components, Plugins, multiple layouts, 20+ sample pages, and more!</p>
              <a href="https://www.bootstrapdash.com/product/corona-react/?utm_source=organic&utm_medium=banner&utm_campaign=free-preview" rel="noopener noreferrer" target="_blank" className="btn btn-sm purchase-button ml-auto">Check Pro Version</a>
              <i className="mdi mdi-close bannerClose" onClick={this.toggleProBanner}></i>
            </span>
          </div>
        </div> */}
        {/*  <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card corona-gradient-card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <img src={require('../../assets/images/dashboard/Group126@2x.png')} className="gradient-corona-img img-fluid" alt="banner" />
                  </div>
                  <div className="col-5 col-sm-7 col-xl-8 p-0">
                    <h4 className="mb-1 mb-sm-0">New refreshing look</h4>
                    <p className="mb-0 font-weight-normal d-none d-sm-block">Corona admin template now with a new facelift for enhanced legibility and aesthetics!</p>
                  </div>
                  <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                    <button className="btn btn-outline-light btn-rounded get-started-btn">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">{/*  <Filters></Filters> */}</div>
        {/*        <div className="row">
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Revenue</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$32123</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      11.38% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Sales</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$45850</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +8.3%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      {" "}
                      9.61% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Purchase</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$2039</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">
                        -2.1%{" "}
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      2.27% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-3 col-sm-6 grid-margin p-0">
            <div className="col grid-margin">
            <div className="card grid-margin stretch-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">23%</h3>
                        <p className="text-success ml-2 mb-0 font-weight-medium">
                          +2%
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-danger">
                        <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Turnover</h6>
                </div>
              </div>
              <div className="card grid-margin stretch-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">1.314</h3>
                        <p className="text-success ml-2 mb-0 font-weight-medium">
                          -11%
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-danger">
                        <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Headcount</h6>
                </div>
              </div>
              <div className="card grid-margin stretch-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">300</h3>
                        <p className="text-success ml-2 mb-0 font-weight-medium">
                          +2
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-success">
                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Admitidos</h6>
                </div>
              </div>
              <div className="card grid-margin stretch-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">304</h3>
                        <p className="text-success ml-2 mb-0 font-weight-medium">
                          
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="icon icon-box-success">
                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">Demitidos</h6>
                </div>
              </div>
            </div>

           
          </div>

          <div className="col-md-9 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">
                  Distribuição do risco de pedido de demissão
                </h4>
                <MockLine
              title="Turnover por Ano e Mês"
              data={[
                {
                  country: "Jan",
                  hydro: 59.8,
                  gas: 582,
                },
                {
                  country: "Fev",
                  hydro: 74.2,
                  gas: 35.1,
                },
                {
                  country: "Mar",
                  hydro: 74.2,
                  gas: 35.1,
                },
                {
                  country: "Abr",
                  hydro: 154.2,
                  gas: 605.1,
                },
                {
                  country: "Mai",
                  hydro: 104.2,
                  gas: 300.1,
                },
                {
                  country: "Jun",
                  hydro: 14.2,
                  gas: 105.1,
                },
                {
                  country: "Ago",
                  hydro: 77.2,
                  gas: 25.1,
                },
                {
                  country: "Set",
                  hydro: 90.2,
                  gas: 65.1,
                },
                {
                  country: "Out",
                  hydro: 120.2,
                  gas: 45.1,
                },
              ]}
            ></MockLine>
              </div>
            </div>
          </div>
        
        </div>
        <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por gestor</h4>
                <div className="aligner-wrapper">
                  <Doughnut
                    data={this.transactionHistoryData}
                    options={this.transactionHistoryOptions}
                  />
                  <div className="absolute center-content">
                    <h5 className="font-weight-normal text-center mb-2 text-muted">
                      134
                    </h5>
                    <p className="text-small text-muted text-center mb-0">
                      Total
                    </p>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Turnovers validos</h6>
                    <p className="text-muted mb-0">07 Jan 2019</p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">30</h6>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Turnovers invalidos</h6>
                    <p className="text-muted mb-0">22 Mar 2019</p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">65</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por diretoria e áreas</h4>
                <MockBarSimple
                  color="rgb(0, 144, 230, 0.7)"
                  border="rgb(0, 144, 230)"
                  rotated={true}
                  item="Hierárquia"
                  data={[
                    {
                      day: " ",
                      oranges: 0,
                    },
                    {
                      day: "RH",
                      oranges: 23,
                    },
                    {
                      day: "Gerência",
                      oranges: 73,
                    },
                    {
                      day: "TI",
                      oranges: 7,
                    },
                    {
                      day: "Vendas",
                      oranges: 5,
                    },
                    {
                      day: "",
                      oranges: 0,
                    },
                  ]}
                  title="Turnover por nível hierárquico"
                ></MockBarSimple>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por grupos de desempenho</h4>
                <MockBarSimple
                    color="rgb(0, 210, 90, 0.7)"
                  rotated={false}
                  item="Hierárquia"
                  data={[
                    {
                      day: " ",
                      oranges: 0,
                    },
                    {
                      day: "Grupo 1",
                      oranges: 20,
                    },
                    {
                      day: "Grupo 2",
                      oranges: 2,
                    },
                    {
                      day: "Grupo 3",
                      oranges: 11,
                    },
                    {
                      day: "Grupo 4",
                      oranges: 16,
                    },
                    {
                      day: "Grupo 5",
                      oranges: 34,
                    },
                    {
                      day: "",
                      oranges: 0,
                    },
                  ]}
                  title="Turnover por nível hierárquico"
                ></MockBarSimple>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por dados demográficos</h4>
                <MockBarStacked
                 color="rgb(0, 144, 230, 0.7)"
                  rotated={false}
                  item="Hierárquia"
                  data={[
                    {
                      country: "",
                      hydro: 150.8,
                      oil: 637.6,
                      gas: 582,
                    },
                  ]}
                  title="Turnover por nível hierárquico"
                ></MockBarStacked>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por escolaridade</h4>
                <MockBarSimple
                color="rgb(255, 171, 0, 0.7)"
                  rotated={false}
                  item="Hierárquia"
                  data={[
                    {
                      day: " ",
                      oranges: 0,
                    },
                    {
                      day: "Ensino médio completo",
                      oranges: 50,
                    },
                    {
                      day: "Segundo Grau completo",
                      oranges: 21,
                    },
                    {
                      day: "",
                      oranges: 0,
                    },
                  ]}
                  title="Turnover por nível hierárquico"
                ></MockBarSimple>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por tempo de casa</h4>
                <MockBarSimple
                    color="rgb(0, 210, 90, 0.7)"
                  rotated={false}
                  item="Tempo de casa"
                  data={[
                    {
                      day: " ",
                      oranges: 0,
                    },
                    {
                      day: "2+ anos",
                      oranges: 50,
                    },
                    {
                      day: "5+ anos",
                      oranges: 21,
                    },
                    {
                      day: "10+ anos",
                      oranges: 10,
                    },
                    {
                      day: "",
                      oranges: 0,
                    },
                  ]}
                  title="Turnover por nível hierárquico"
                ></MockBarSimple>
              </div>
            </div>
          </div>
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card" style={{height: '95%'}}>
              <div className="card-body">
                <h4 className="card-title">Turnover por nível hierárquico</h4>
                <MockBarSimple
                  color="rgb(255, 171, 0, 0.7)"
                  rotated={true}
                  item="Hierárquia"
                  data={[
                    {
                      day: " ",
                      oranges: 0,
                    },
                    {
                      day: "Administrador",
                      oranges: 23,
                    },
                    {
                      day: "Vendedor",
                      oranges: 73,
                    },
                    {
                      day: "Diretor",
                      oranges: 7,
                    },
                    {
                      day: "Presidente",
                      oranges: 5,
                    },
                    {
                      day: "",
                      oranges: 0,
                    },
                  ]}
                  title="Turnover por nível hierárquico"
                ></MockBarSimple>
              </div>
            </div>
          </div>
        </div>

        {/*    <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Order Status</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> Client Name </th>
                        <th> Order No </th>
                        <th> Product Cost </th>
                        <th> Project </th>
                        <th> Payment Mode </th>
                        <th> Start Date </th>
                        <th> Payment Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face1.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td> NewDash </td>
                        <td> Credit card </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Approved
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face2.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Estella Bryan</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td> Website </td>
                        <td> Cash on delivered </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-warning">
                            Pending
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face5.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Lucy Abbott</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td> App design </td>
                        <td> Credit card </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-danger">
                            Rejected
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face3.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Peter Gill</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td> Development </td>
                        <td> Online Payment </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Approved
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={require("../../assets/images/faces/face4.jpg")}
                              alt="face"
                            />
                            <span className="pl-2">Sallie Reyes</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td> Website </td>
                        <td> Credit card </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Approved
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/*  <div className="row">
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title">Messages</h4>
                  <p className="text-muted mb-1 small">View all</p>
                </div>
                <div className="preview-list">
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face6.jpg")}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Leonard</h6>
                          <p className="text-muted text-small">5 minutes ago</p>
                        </div>
                        <p className="text-muted">
                          Well, it seems to be working now.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face8.jpg")}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Luella Mills</h6>
                          <p className="text-muted text-small">
                            10 Minutes Ago
                          </p>
                        </div>
                        <p className="text-muted">
                          Well, it seems to be working now.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face9.jpg")}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Ethel Kelly</h6>
                          <p className="text-muted text-small">2 Hours Ago</p>
                        </div>
                        <p className="text-muted">Please review the tickets</p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={require("../../assets/images/faces/face11.jpg")}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">Herman May</h6>
                          <p className="text-muted text-small">4 Hours Ago</p>
                        </div>
                        <p className="text-muted">
                          Thanks a lot. It was easy to fix it .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Portfolio Slide</h4>
                <Slider className="portfolio-slider" {...this.sliderSettings}>
                  <div className="item">
                    <img
                      src={require("../../assets/images/dashboard/Rectangle.jpg")}
                      alt="carousel-item"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/images/dashboard/Img_5.jpg")}
                      alt="carousel-item"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/images/dashboard/img_6.jpg")}
                      alt="carousel-item"
                    />
                  </div>
                </Slider>
                <div className="d-flex py-4">
                  <div className="preview-list w-100">
                    <div className="preview-item p-0">
                      <div className="preview-thumbnail">
                        <img
                          src={require("../../assets/images/faces/face12.jpg")}
                          className="rounded-circle"
                          alt="face"
                        />
                      </div>
                      <div className="preview-item-content d-flex flex-grow">
                        <div className="flex-grow">
                          <div className="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 className="preview-subject">CeeCee Bass</h6>
                            <p className="text-muted text-small">4 Hours Ago</p>
                          </div>
                          <p className="text-muted">
                            Well, it seems to be working now.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted">Well, it seems to be working now. </p>
                <div className="progress progress-md portfolio-progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">To do list</h4>
                <TodoListComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Visitors by Countries</h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>USA</td>
                            <td className="text-right"> 1500 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              56.35%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>Germany</td>
                            <td className="text-right"> 800 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              33.25%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>Australia</td>
                            <td className="text-right"> 760 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              15.45%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right"> 450 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              25.00%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>Romania</td>
                            <td className="text-right"> 620 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              10.25%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right"> 230 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              75.00%{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent" //change it to ocean blue: #0077be
                      panOnDrag={true}
                      containerClassName="dashboard-vector-map"
                      focusOn={{
                        x: 0.5,
                        y: 0.5,
                        scale: 1,
                        animate: true,
                      }}
                      series={{
                        regions: [
                          {
                            scale: ["#3d3c3c", "#f2f2f2"],
                            normalizeFunction: "polynomial",
                            values: mapData,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default NewDash;

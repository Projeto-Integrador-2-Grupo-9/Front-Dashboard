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

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Risco extends Component {
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
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Baixo Risco</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">52%</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      11.38% Desde o ultimo mês
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
                <h5>Médio Risco</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">26%</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +8.3%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      {" "}
                      9.61% Desde o ultimo mês
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
                <h5>Alto Risco</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">12%</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">
                        -2.1%{" "}
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      2.27% Desde o ultimo mês
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-1">Risco de Turnover por Centro de Resultado</h4>
                <p className="text-muted">Probabilidade de Turnover.</p>
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
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-1">Risco de Turnover por Cargo</h4>
                <p className="text-muted">Probabilidade de Turnover.</p>
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

        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Funcionários</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Nome </th>
                        <th> Idade </th>
                        <th> Função </th>
                        <th> Centro de Resultado </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> Adriana Branco </td>
                        <td> 47 </td>
                        <td> Gerente II </td>
                        <td> Contabilidade </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Ativo
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td> Adélia Tamoio </td>
                        <td> 45 </td>
                        <td> Coordenador II </td>
                        <td> Administrativo </td>
                        <td>
                          <div className="badge badge-outline-warning">
                            Desconhecido
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td> Agostinho Lameira </td>
                        <td> 41 </td>
                        <td> Coordenador I </td>
                        <td> Produção </td>
                        <td>
                          <div className="badge badge-outline-danger">
                            Desligado
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td> Adelina Mesquita </td>
                        <td> 45 </td>
                        <td> Coordenador I </td>
                        <td> Health </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Ativo
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td> Adosindo Teodoro </td>
                        <td> 65 </td>
                        <td> Coordenador I </td>
                        <td> Planejamento </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Ativo
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Risco;

import React, { Component } from "react";
import MockBarSimple from "../charts/BarSimple";
import GoogleMapReact from "google-map-react";
import Labels from "../components/Label";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-sm-6 grid-margin p-0">
            <div className="col-sm-12 pb-2 pl-0 pr-0 pt-0">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-primary mr-2"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      Sinalizar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary mr-5"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      Câmera
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary ml-5 mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      Temperatura
                      <Labels checked={false}></Labels>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      Condutividade
                      <Labels checked={true}></Labels>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      Nitrogênio
                      <Labels checked={false}></Labels>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      <span>Oxigênação</span>
                      <Labels checked={true}></Labels>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 pb-2 pl-0 pr-0 pt-0">
              <div className="card">
                <div className="card-body">
                  <h5>Kinematic Scanner</h5>
                  <div className="row">
                    <div className="col-2 col-sm-12 col-xl-5 ">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <div className="row">
                          <i
                            className="icon-sm mdi mdi-clock ml-2"
                            style={{ color: "grey" }}
                          ></i>
                          <h6
                            className="mb-0 ml-1"
                            style={{ color: "grey", marginTop: "3px" }}
                          >
                            2 minutos atrás
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-10 col-sm-12 col-xl-7 text-right text-xl-right">
                      <div className="row text-right text-xl-right">
                        <i
                          className="icon-sm mdi mdi mdi-crosshairs-gps ml-2"
                          style={{ color: "blue" }}
                        ></i>
                        <p
                          className="ml-1 mr-2"
                          style={{ color: "blue", marginTop: "2px" }}
                        >
                          40.446 N 79.982 W
                        </p>
                        <i
                          className="icon-sm mdi mdi mdi-spotify ml-2"
                          style={{ color: "#12dc8c" }}
                        ></i>
                        <p
                          className="ml-1 mr-2"
                          style={{ color: "#12dc8c", marginTop: "2px" }}
                        >
                          Transmitindo
                        </p>
                        <i
                          className="icon-sm mdi mdi mdi-wifi ml-2"
                          style={{ color: "red" }}
                        ></i>
                        <p
                          className="ml-1 mr-2"
                          style={{ color: "red", marginTop: "2px" }}
                        >
                          Fraco
                        </p>
                        <i
                          className="icon-sm mdi mdi-signal ml-2"
                          style={{ color: "#12dc8c" }}
                        ></i>
                        <p
                          className="ml-1 mr-2"
                          style={{ color: "#12dc8c", marginTop: "2px" }}
                        >
                          95%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="col-md-12 grid-margin stretch-card p-0">
              <div className="card" style={{ height: "95%" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-1 align-items-center">
                      <i
                        className="icon-md mdi mdi-signal-variant"
                        style={{ color: "grey" }}
                      ></i>
                    </div>
                    <div className="col">
                      <h4 className="card-title mb-1">Telemetria</h4>
                      <p className="text-muted mt-0">A 2 minutos</p>
                    </div>
                  </div>

                  <MockBarSimple
                    color="rgb(0, 144, 230, 0.7)"
                    border="rgb(0, 144, 230)"
                    rotated={true}
                    item="Hierárquia"
                    data={[
                      {
                        month: "January",
                        avgT: 9.8,
                        minT: 4.1,
                        maxT: 15.5,
                        prec: 109,
                      },
                      {
                        month: "February",
                        avgT: 11.8,
                        minT: 5.8,
                        maxT: 17.8,
                        prec: 104,
                      },
                      {
                        month: "March",
                        avgT: 13.4,
                        minT: 7.2,
                        maxT: 19.6,
                        prec: 92,
                      },
                      {
                        month: "April",
                        avgT: 15.4,
                        minT: 8.1,
                        maxT: 22.8,
                        prec: 30,
                      },
                      {
                        month: "May",
                        avgT: 18,
                        minT: 10.3,
                        maxT: 25.7,
                        prec: 10,
                      },
                      {
                        month: "June",
                        avgT: 20.6,
                        minT: 12.2,
                        maxT: 29,
                        prec: 2,
                      },
                      {
                        month: "July",
                        avgT: 22.2,
                        minT: 13.2,
                        maxT: 31.3,
                        prec: 2,
                      },
                      {
                        month: "August",
                        avgT: 22.2,
                        minT: 13.2,
                        maxT: 31.1,
                        prec: 1,
                      },
                      {
                        month: "September",
                        avgT: 21.2,
                        minT: 12.4,
                        maxT: 29.9,
                        prec: 8,
                      },
                      {
                        month: "October",
                        avgT: 17.9,
                        minT: 9.7,
                        maxT: 26.1,
                        prec: 24,
                      },
                      {
                        month: "November",
                        avgT: 12.9,
                        minT: 6.2,
                        maxT: 19.6,
                        prec: 64,
                      },
                      {
                        month: "December",
                        avgT: 9.6,
                        minT: 3.4,
                        maxT: 15.7,
                        prec: 76,
                      },
                    ]}
                    title="Turnover por nível hierárquico"
                  ></MockBarSimple>
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

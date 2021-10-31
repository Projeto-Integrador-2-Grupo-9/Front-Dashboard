import React, { Component } from "react";
import MockBarSimple from "../../components/charts/BarSimple";
import GoogleMapReact from "google-map-react";
import Labels from "../../components/Label";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Lightbulb } from "@mui/icons-material";
import Loading from "../../components/loading";
import { padding } from "@mui/system";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export class Dashboard extends Component {


  static OPTIONS = {
    minZoom: 4,
    maxZoom: 14,
  }

  static defaultProps = {
    zoom: 14,
  };
  constructor() {
    super();
    this.id = 1
    this.state = {
      openLoading: false,
    };
    this.handleOpenLoading = this.handleOpenLoading.bind(this);
    this.handleCloseLoading = this.handleCloseLoading.bind(this);
    this.boias = {
      "1": {

        lastData: {
          temp: 10.5,
          oxi: 32,
          ph: 7.5,
          cond: 65,
          turb: 10,
        },

        center: {
          lat: -15.8225,
          lng: -47.8357,
        },
        graphData: [
          {
            month: "10/10",
            avgT: 9.8,
            minT: 4.1,
            maxT: 15.5,
            prec: 7.2,
          },
          {
            month: "11/10",
            avgT: 11.8,
            minT: 5.8,
            maxT: 17.8,
            prec: 7.3,
          },
          {
            month: "12/10",
            avgT: 13.4,
            minT: 7.2,
            maxT: 19.6,
            prec: 7.3,
          },
          {
            month: "13/10",
            avgT: 15.4,
            minT: 8.1,
            maxT: 22.8,
            prec: 7.4,
          },
          {
            month: "14/10",
            avgT: 18,
            minT: 10.3,
            maxT: 25.7,
            prec: 7.5,
          },
          {
            month: "15/10",
            avgT: 20.6,
            minT: 12.2,
            maxT: 29,
            prec: 7.6,
          },
          {
            month: "16/10",
            avgT: 22.2,
            minT: 13.2,
            maxT: 31.3,
            prec: 7.4,
          },
          {
            month: "17/10",
            avgT: 22.2,
            minT: 13.2,
            maxT: 31.1,
            prec: 7.5,
          },
          {
            month: "18/10",
            avgT: 21.2,
            minT: 12.4,
            maxT: 29.9,
            prec: 7.6,
          },
          {
            month: "19/10",
            avgT: 17.9,
            minT: 9.7,
            maxT: 26.1,
            prec: 7.6,
          },
          {
            month: "20/10",
            avgT: 12.9,
            minT: 6.2,
            maxT: 19.6,
            prec: 7.5,
          },
          {
            month: "21/10",
            avgT: 9.6,
            minT: 3.4,
            maxT: 15.7,
            prec: 7.6,
          },
        ]
      },
      "2": {
        lastData: {
          temp: 9.9,
          oxi: 34,
          ph: 7.5,
          cond: 59,
          turb: 13.5,
        },
        center: {
          lat: -15.8270,
          lng: -47.8407,
        },
        graphData: [
          {
            month: "10/10",
            avgT: 9.9,
            minT: 4.1,
            maxT: 15.5,
            prec: 7.1,
          },
          {
            month: "11/10",
            avgT: 11.9,
            minT: 5.8,
            maxT: 17.8,
            prec: 7.2,
          },
          {
            month: "12/10",
            avgT: 14.1,
            minT: 7.2,
            maxT: 19.6,
            prec: 7.3,
          },
          {
            month: "13/10",
            avgT: 16.1,
            minT: 8.1,
            maxT: 22.8,
            prec: 7.2,
          },
          {
            month: "14/10",
            avgT: 17,
            minT: 10.3,
            maxT: 25.7,
            prec: 7.5,
          },
          {
            month: "15/10",
            avgT: 20,
            minT: 12.2,
            maxT: 29,
            prec: 7.6,
          },
          {
            month: "16/10",
            avgT: 22.1,
            minT: 13.2,
            maxT: 31.3,
            prec: 7.6,
          },
          {
            month: "17/10",
            avgT: 22.1,
            minT: 13.2,
            maxT: 31.1,
            prec: 7.6,
          },
          {
            month: "18/10",
            avgT: 21.1,
            minT: 12.4,
            maxT: 29.9,
            prec: 7.5,
          },
          {
            month: "19/10",
            avgT: 18.9,
            minT: 9.7,
            maxT: 26.1,
            prec: 7.7,
          },
          {
            month: "20/10",
            avgT: 12,
            minT: 6.2,
            maxT: 19,
            prec: 7.7,
          },
          {
            month: "21/10",
            avgT: 10,
            minT: 4,
            maxT: 15,
            prec: 7.6,
          },
        ]
      },
      "3": {
        lastData: {
          temp: 12.5,
          oxi: 36,
          ph: 7.4,
          cond: 60,
          turb: 13,
        },
        center: {
          lat: -15.8325,
          lng: -47.8477,
        },
        graphData: [
          {
            month: "10/10",
            avgT: 14,
            minT: 10,
            maxT: 15.5,
            prec: 7.2,
          },
          {
            month: "11/10",
            avgT: 11.8,
            minT: 5.8,
            maxT: 17.8,
            prec: 7.3,
          },
          {
            month: "12/10",
            avgT: 16,
            minT: 12,
            maxT: 23.6,
            prec: 7.3,
          },
          {
            month: "13/10",
            avgT: 17,
            minT: 10,
            maxT: 24.8,
            prec: 7.4,
          },
          {
            month: "14/10",
            avgT: 18,
            minT: 10.3,
            maxT: 25.7,
            prec: 7.5,
          },
          {
            month: "15/10",
            avgT: 20.6,
            minT: 12.2,
            maxT: 29,
            prec: 7.6,
          },
          {
            month: "16/10",
            avgT: 22.2,
            minT: 13.2,
            maxT: 31.3,
            prec: 7.4,
          },
          {
            month: "17/10",
            avgT: 22.2,
            minT: 13.2,
            maxT: 31.1,
            prec: 7.5,
          },
          {
            month: "18/10",
            avgT: 21.2,
            minT: 12.4,
            maxT: 29.9,
            prec: 7.6,
          },
          {
            month: "19/10",
            avgT: 17.9,
            minT: 9.7,
            maxT: 26.1,
            prec: 7.6,
          },
          {
            month: "20/10",
            avgT: 12.9,
            minT: 6.2,
            maxT: 19.6,
            prec: 7.5,
          },
          {
            month: "21/10",
            avgT: 9.6,
            minT: 3.4,
            maxT: 15.7,
            prec: 7.6,
          },
        ]
      }
    };


  }

  handleOpenLoading() {
    this.setState({ openLoading: true }, () => {
      //Callback function
    });
  }

  handleCloseLoading() {
    this.setState({ openLoading: false }, () => {
      //Callback function
    });
  }
  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  async load() {
    this.handleOpenLoading();
    // await new Promise(resolve => setTimeout(resolve, 1000));
    this.handleCloseLoading();
  }

  // async componentWillUnmount() {

  // }

  async componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div>
        {console.log(this.boias["1"])}
        {this.state.openLoading ? (
          <Loading
            open={this.state.openLoading}
            close={this.handleCloseLoading}
          />
        ) : null}
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
                      <Lightbulb fontSize="small" className="mr-2"></Lightbulb>
                      Sinalizar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary ml-3 mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      Temperatura
                      <Labels checked={true}></Labels>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary ml-3 mr-0"
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
                      className="btn btn-primary ml-3 mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      pH Superficie
                      <Labels checked={true}></Labels>
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary ml-3 mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      <span>Oxigênação</span>
                      <Labels checked={true}></Labels>
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary ml-3 mr-0"
                      style={{
                        backgroundColor: "white",
                        color: "gray",
                        borderColor: "grey",
                      }}
                    >
                      <span>Turbidade</span>
                      <Labels checked={true}></Labels>
                    </button>


                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 pb-2 pl-0 pr-0 pt-0">
              <div className="card">
                <div className="card-body">
                  <h5>Boia {this.props.location.pathname.split("/")[2]}</h5>
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
                          {this.boias[this.props.location.pathname.split("/")[2]].center.lat} N {this.boias[this.props.location.pathname.split("/")[2]].center.lng} W
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
                        {/* <i
                          className="icon-sm mdi mdi mdi-wifi ml-2"
                          style={{ color: "red" }}
                        ></i> */}
                        {/* <p
                          className="ml-1 mr-2"
                          style={{ color: "red", marginTop: "2px" }}
                        >
                          Fraco
                        </p> */}
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
              <div className="col-sm-4 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h5 style={{ color: "grey" }}>Temperatura</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 ">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0 mt-0">{this.boias[this.props.location.pathname.split("/")[2]].lastData.temp} C</h2>
                        </div>
                      </div>
                      {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h5 style={{ color: "grey" }}>Oxigenação</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 ">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0 mt-0">{this.boias[this.props.location.pathname.split("/")[2]].lastData.oxi} mg/l</h2>
                        </div>
                      </div>
                      {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h5 style={{ color: "grey" }}>pH</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 ">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0 mt-0">{this.boias[this.props.location.pathname.split("/")[2]].lastData.ph}</h2>
                        </div>
                      </div>
                      {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h5 style={{ color: "grey" }}>Condutividade</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 ">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0 mt-0">{this.boias[this.props.location.pathname.split("/")[2]].lastData.cond} µS/cm</h2>
                        </div>
                      </div>
                      {/*    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h5 style={{ color: "grey" }}>Turbidade</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 ">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0 mt-0"> {this.boias[this.props.location.pathname.split("/")[2]].lastData.turb} uT</h2>
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
                    data={this.boias[this.props.location.pathname.split("/")[2]].graphData}
                  ></MockBarSimple>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 grid-margin pl-5">
            <div className="row">
              <div style={{ height: "116vh", width: "100%" }}>
                <GoogleMapReact
                  options={this.props.OPTIONS}
                  bootstrapURLKeys={{
                    key: "AIzaSyCrDnH48o88fCpd-Dqlw-QUAyBhhB0Pcio",
                  }}
                  defaultCenter={this.boias[this.props.location.pathname.split("/")[2]].center}
                  defaultZoom={this.props.zoom}
                >
                  <div onClick={() => { this.props.history.push("/dashboard/1") }}

                    className="bg-boia"
                    style={{ width: "50px", height: "50px" }}
                    lat={this.boias["1"].center.lat}
                    lng={this.boias["1"].center.lng}
                  >
                    <a>Boia 1</a>
                  </div>

                  <div onClick={() => { this.props.history.push("/dashboard/2") }}
                    className="bg-boia"
                    style={{ width: "50px", height: "50px" }}
                    lat={this.boias["2"].center.lat}
                    lng={this.boias["2"].center.lng}
                  >
                    <a>Boia 2</a>
                  </div>

                  <div onClick={() => { this.props.history.push("/dashboard/3") }}
                    className="bg-boia"
                    style={{ width: "50px", height: "50px" }}
                    lat={this.boias["3"].center.lat}
                    lng={this.boias["3"].center.lng}
                  >
                    <a>Boia 3</a>
                  </div>
                </GoogleMapReact>
              </div>
            </div>
          </div >
        </div >
      </div >
    );
  }
}

export default Dashboard;

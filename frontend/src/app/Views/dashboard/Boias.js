/* eslint-disable no-restricted-globals*/
import React, { Component } from "react";
import MockBarSimple from "../../components/charts/BarSimple";
import GoogleMapReact from "google-map-react";
import Labels from "../../components/Label";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Lightbulb } from "@mui/icons-material";
import Loading from "../../components/loading";
import { useHistory } from "react-router-dom";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


export class Boias extends Component {


  static OPTIONS = {
    minZoom: 4,
    maxZoom: 14,
  }
  static defaultProps = {
    center: {
      lat: -15.8326,
      lng: -47.8477,
    },
    zoom: 14,
  };
  constructor() {
    super();
    this.state = {
      openLoading: false,
    };
    this.handleOpenLoading = this.handleOpenLoading.bind(this);
    this.handleCloseLoading = this.handleCloseLoading.bind(this);
  }

  handleOpenLoading() {
    this.setState({ openLoading: true }, () => {
      //Callback function
    });
  }

  handleZoomChanged() {
    console.log(this.getZoom()); //this refers to Google Map instance
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.handleCloseLoading();
  }

  async componentDidMount() {
    this.load();
  }

  render() {
    return (
      <div>
        {this.state.openLoading ? (
          <Loading
            open={this.state.openLoading}
            close={this.handleCloseLoading}
          />
        ) : null}
        <div className="row">
          <div className="col-md-12 col-sm-12 grid-margin pl-5">
            <div className="row">
              <div style={{ height: "116vh", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyCrDnH48o88fCpd-Dqlw-QUAyBhhB0Pcio",
                  }}
                  options={this.props.OPTIONS}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                  onZoomChanged={(e) => {
                    console.log(this.getZoom());
                  }}
                >
                  <div onClick={() => { this.props.history.push("/dashboard/1") }}
                    className="bg-boia"
                    style={{ width: "50px", height: "50px" }}
                    lat={-15.8225}
                    lng={-47.8357}
                  >
                    <a>Boia 1</a>
                  </div>
                  <div onClick={() => { this.props.history.push("/dashboard/2") }}
                    className="bg-boia"
                    style={{ width: "50px", height: "50px" }}
                    lat={-15.8270}
                    lng={-47.8407}
                  ><a>Boia 2</a></div>
                  <div onClick={() => { this.props.history.push("/dashboard/3") }}
                    className="bg-boia"
                    style={{ width: "50px", height: "50px" }}
                    lat={-15.8325}
                    lng={-47.8477}
                  ><a>Boia 3</a></div>
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Boias;

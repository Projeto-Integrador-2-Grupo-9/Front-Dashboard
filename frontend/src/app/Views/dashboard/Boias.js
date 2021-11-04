/* eslint-disable no-restricted-globals*/
import React, { Component } from "react";
import MockBarSimple from "../../components/charts/BarSimple";
import GoogleMapReact from "google-map-react";
import Labels from "../../components/Label";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Lightbulb } from "@mui/icons-material";
import Loading from "../../components/loading";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


export class Boias extends Component {


  static OPTIONS = {
    minZoom: 4,
    maxZoom: 14,
  }
  static defaultProps = {
    center: {
      lat: -15.8326,
      lng: -47.8440,
    },
    zoom: 15,
  };
  constructor() {
    super();
    this.state = {
      openLoading: false,
      floatersPosition: []
    };
    this.handleOpenLoading = this.handleOpenLoading.bind(this);
    this.handleCloseLoading = this.handleCloseLoading.bind(this);
  }

  async getData() {
    const res = await axios('/data');
    return await res.json();
  }

  componentWillMount() {

    axios.get(`http://localhost:80/floaters_position`)
      .then(res => {
        const floatersPosition = res.data;

        this.setState({ floatersPosition });
      })
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

                  {this.state.floatersPosition.map((floater, index) => (

                    <div onClick={() => { this.props.history.push("/dashboard/" + floater.id) }}
                      className="bg-boia"
                      style={{ width: "50px", height: "50px" }}
                      lat={floater.position.logs[0].current_position.lat}
                      lng={floater.position.logs[0].current_position.lng}
                    >
                      <a> {"Boia " + floater.id} </a>
                    </div>
                  ))}
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default Boias;

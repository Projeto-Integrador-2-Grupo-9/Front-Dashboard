import React, { Component } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Bars from "../../components/charts/BarStacked";
import NewLines from "../../components/charts/Lines";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export class Relatorios extends Component {
  constructor() {
    super();
    this.state = {
      alignment: "3 Dias",
      handleChartClick: [],
      receivedFilter: [],
      grid: true,
      openLoading: false,
      token: "",
      curTime: new Date().toLocaleString(),
    };
  }

  handleChange = (event, newAlignment) => {
    this.setState({
      alignment: newAlignment,
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-sm-12 grid-margin p-0">
            <div className="col-sm-12 pb-2 pl-0 pr-0 pt-0">
              <div className="card">
                <div className="card-body text-center">
                  <ToggleButtonGroup
                    style={{ margin: "auto" }}
                    color="primary"
                    value={this.state.alignment}
                    exclusive
                    onChange={this.handleChange}
                  >
                    <ToggleButton value="3 Dias" style={{ width: "15vw" }}>
                      3 Dias
                    </ToggleButton>
                    <ToggleButton value="7 Dias" style={{ width: "15vw" }}>
                      7 Dias
                    </ToggleButton>
                    <ToggleButton value="14 Dias" style={{ width: "15vw" }}>
                      14 Dias
                    </ToggleButton>
                    <ToggleButton value="1 Mês" style={{ width: "15vw" }}>
                      1 Mês
                    </ToggleButton>
                    <ToggleButton value="3 Meses" style={{ width: "15vw" }}>
                      3 Meses
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 grid-margin p-2 grid-margin">
            <div className="card">
              <div className="card-body text-center">
                <Bars
                  color="#106B99"
                  rotated={false}
                  cat={["dia 1", "dia 2", "dia 3"]}
                  data={[
                    {
                      name: "Oxigênio",
                      data: [50, 21, 84],
                    },
                  ]}
                  title="Oxigênio dissolvido"
                ></Bars>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 grid-margin p-2 grid-margin">
            <div className="card">
              <div className="card-body text-center">
                <Bars
                  color="#06D6A0"
                  rotated={false}
                  cat={["dia 1", "dia 2", "dia 3"]}
                  data={[
                    {
                      name: "Oxigênio",
                      data: [50, 21, 84],
                    },
                  ]}
                  title="Nitrogênio"
                ></Bars>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 grid-margin p-2 grid-margin">
            <div className="card">
              <div className="card-body text-center">
                <NewLines title="Temperatura"></NewLines>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 grid-margin p-2 grid-margin">
            <div className="card">
              <div className="card-body text-center">
                <Bars
                  color="#F57F17"
                  rotated={false}
                  cat={["dia 1", "dia 2", "dia 3"]}
                  data={[
                    {
                      name: "Oxigênio",
                      data: [50, 21, 84],
                    },
                  ]}
                  title="Turbidez"
                ></Bars>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 grid-margin p-2 grid-margin">
            <div className="card">
              <div className="card-body text-center">
              <NewLines title="PH"></NewLines>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 grid-margin p-2 grid-margin">
            <div className="card">
              <div className="card-body text-center">
                <Bars
                  color="#5393E8"
                  rotated={false}
                  cat={["dia 1", "dia 2", "dia 3"]}
                  data={[
                    {
                      name: "Oxigênio",
                      data: [50, 21, 84],
                    },
                  ]}
                  title="Condutividade"
                ></Bars>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Relatorios;

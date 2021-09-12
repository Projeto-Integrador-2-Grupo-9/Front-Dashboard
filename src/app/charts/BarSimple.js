import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart, {
  CommonSeriesSettings,
  Series,
  Pane,
  ValueAxis,
  Export,
  Legend,
  Label,
  Title,
  Grid
} from "devextreme-react/chart";
import SelectBox from "devextreme-react/select-box";
const types = ["line", "stackedline", "fullstackedline"];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: "350px",
    border: "2px solid #eae3e3",
    width: "100%",
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    marginTop: "10px",
  },
  header: {
    fontFamily: "sans-serif",
    paddingTop: "30px",
    paddingBottom: "0px",
    fontWeight: "700",
    color: "#303326",
    padding: "20px",
  },
  buttons: {
    paddingTop: "30px",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "20px",
  },
  icons: {
    backgroundColor: "#DFF6ED",
    color: "#54CE9F",
    margin: "5px",
    padding: "2px",
    borderRadius: "20px",
    width: "30px",
    height: "30px",
  },
  content: {
    borderWidth: "2px",
    borderColor: "#000000",
    height: "400px",
    paddingTop: "0px",
    paddingBottom: "15px",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

function MockBarLine(props) {
  const classes = useStyles();
  
  React.useEffect(() => {}, [props]);

  const customizeTooltip = (e) => {
    return { text: Math.abs(e.valueText) };
  };

  const customizeLabel = (e) => {
    return `${Math.abs(e.value)}%`;
  };

  return (
    <>
      <React.Fragment>
        <Chart
          id="chart"
       
          defaultPane="bottomPane"
          dataSource={props.data}
        >
          <CommonSeriesSettings argumentField="month" />
          <Series
            pane="topPane"
            color="#b0daff"
            type="rangeArea"
            rangeValue1Field="minT"
            rangeValue2Field="maxT"
            name="Monthly Temperature Ranges, °C"
          />
          <Series
            pane="topPane"
            valueField="avgT"
            name="Average Temperature, °C"
          >
            <Label visible={true} customizeText={temperatureCustomizeText} />
          </Series>
          <Series type="bar" valueField="prec" name="prec, mm">
            <Label visible={true} customizeText={precipitationCustomizeText} />
          </Series>

          <Pane name="topPane" />
          <Pane name="bottomPane" />

          <ValueAxis pane="bottomPane">
            <Grid visible={true} />
            <Title text="Precipitation, mm" />
          </ValueAxis>
          <ValueAxis pane="topPane">
            <Grid visible={true} />
            <Title text="Temperature, °C" />
          </ValueAxis>

          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
        
        </Chart>
      </React.Fragment>
    </>
  );
}

function temperatureCustomizeText({ valueText }) {
  return `${valueText} °C`;
}

function precipitationCustomizeText({ valueText }) {
  return `${valueText} mm`;
}

export default MockBarLine;

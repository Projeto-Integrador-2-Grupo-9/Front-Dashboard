import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Label,
  Format,
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

function MockBarMult(props) {
  const classes = useStyles();
  const dataSource = [
    {
      day: "Thursday",
      oranges: 4,
    },
    {
      day: "Friday",
      oranges: 6,
    },
    {
      day: "Saturday",
      oranges: 11,
    },
    {
      day: "Sunday",
      oranges: 4,
    },
  ];
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
        <Chart id="chart" rotated={props.rotated} dataSource={props.data}>
          <CommonSeriesSettings
            argumentField="state"
            type="bar"
            barPadding={0.1}
            visible={true}
            borderRadius={2}
            borderRadius={5}
            borderColor="rgb(0, 144, 230)"
          >
            <Label visible={true}>
              <Format type="fixedPoint" precision={0} />
            </Label>
          </CommonSeriesSettings>
          <Series
            argumentField="state"
            valueField="year2018"
            name="Voluntário"
          />
          <Series valueField="year2017" name="Involuntário" />

          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>

          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />

          <Tooltip enabled={true} />
        </Chart>
      </React.Fragment>
    </>
  );
}

export default MockBarMult;

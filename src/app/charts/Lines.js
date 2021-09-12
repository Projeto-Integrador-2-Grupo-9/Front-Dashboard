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
    marginBottom: "10px",
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

function MockLine(props) {
  const classes = useStyles();
  const energySources = [
    { value: "hydro", name: "2020" },
    { value: "gas", name: "2021" },
  ];
  const countriesInfo = [
    {
      country: "Validos",
      hydro: 59.8,
      gas: 582,
    },
    {
      country: "Invalidos",
      hydro: 74.2,
      gas: 35.1,
    },
  ];

  const [color] = useState(["#24704C", "#A5C882"]);
  const [name, setName] = React.useState("");
  const data = props;
  React.useEffect(() => {}, [props]);

  const customizeTooltip = (e) => {
    return { text: Math.abs(e.valueText) };
  };

  const customizeLabel = (e) => {
    return `${Math.abs(e.value)}%`;
  };

  return (
    <>
      <Chart
        palette="blue"
        dataSource={props.data}
        style={{ height: "100%" }}
      >
      {/*   <Export enabled={true} /> */}
        <CommonSeriesSettings argumentField="country" type="line" />
        {energySources.map(function (item) {
          return (
            <Series key={item.value} valueField={item.value} name={item.name} />
          );
        })}
        <Margin bottom={20} />
        {/* <Title text={data.title} alignment="left">
          <Subtitle text="(Porcentagem)" />
        </Title> */}
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
    </>
  );
}

export default MockLine;

import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function Labels(props) {
  const [checked, setChecked] = React.useState(props.checked);

  return (
    <>
      <Grid
        container
        className="mt-1"
        style={{
          backgroundColor: checked ? "#5efc82" : "#ff867c",
          width: "50%",
          margin: "auto",
          borderRadius: '10px',
          padding: '1px'
        }}
      >
        <Grid item xs>
          <span
            style={{
              color: checked ? "#009624" : "#c62828",
              fontWeight: "500",
            }}
          >
            {checked ? "On" : "Off"}
          </span>
        </Grid>
      </Grid>
    </>
  );
}

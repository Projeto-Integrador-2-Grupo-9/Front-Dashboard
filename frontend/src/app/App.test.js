import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import App from "./App";

describe("<App>", () => {
  test.skip("renders without crashing", () => {
    render(
      <StaticRouter>
        <App />
      </StaticRouter>
    );
  });
});

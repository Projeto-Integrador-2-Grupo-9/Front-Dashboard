import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import Spinner from "./Spinner";

describe("<Spinner>", () => {
  test("renders without crashing", () => {
    render(
      <StaticRouter>
        <Spinner />
      </StaticRouter>
    );
  });
});

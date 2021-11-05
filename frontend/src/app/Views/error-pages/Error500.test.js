import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import { Error500 } from "./Error500";

describe("<Error500>", () => {
  test("rendering Error500", () => {
    render(
      <StaticRouter>
        <Error500 />
      </StaticRouter>
    );
  });
});

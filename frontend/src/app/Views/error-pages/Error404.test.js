import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import { Error404 } from "./Error404";

describe("<Error404>", () => {
  test("rendering Error404", () => {
    render(
      <StaticRouter>
        <Error404 />
      </StaticRouter>
    );
  });
});

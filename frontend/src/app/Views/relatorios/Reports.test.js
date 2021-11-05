import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import { Relatorios } from "./index";

describe("<Relatorios>", () => {
  test.skip("rendering Relatorios", () => {
    render(
      <StaticRouter>
        <Relatorios />
      </StaticRouter>
    );
  });
});

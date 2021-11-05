import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import { Register } from "./Register";

describe("<Register>", () => {
  test("rendering Register", () => {
    render(
      <StaticRouter>
        <Register />
      </StaticRouter>
    );
  });
});

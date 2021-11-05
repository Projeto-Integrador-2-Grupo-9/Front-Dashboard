import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import Login from "./Login";

describe("<Login>", () => {
  test("rendering Login", () => {
    render(
      <StaticRouter>
        <Login />
      </StaticRouter>
    );
  });
});

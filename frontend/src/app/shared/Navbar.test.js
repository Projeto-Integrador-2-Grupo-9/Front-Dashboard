import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import Navbar from "./Navbar";

describe("<Navbar>", () => {
  test("renders without crashing", () => {
    render(
      <StaticRouter>
        <Navbar />
      </StaticRouter>
    );
  });
});

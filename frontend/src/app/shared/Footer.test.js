import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router";
import Footer from "./Footer";

describe("<Footer>", () => {
  test("renders without crashing", () => {
    render(
      <StaticRouter>
        <Footer />
      </StaticRouter>
    );
  });
});

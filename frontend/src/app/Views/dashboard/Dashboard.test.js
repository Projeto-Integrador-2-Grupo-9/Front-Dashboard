import React from "react";
import { render } from "@testing-library/react";
import { Dashboard } from "./Dashboard";

describe("<Dashboard>", () => {
  test.skip("renders without crashing", () => {
    render(<Dashboard location={{ pathname: "02:D9:DC:23:91:12" }} />);
  });
});

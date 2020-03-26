/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

import Appointment from "components/Appointment/index.js"



describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Form", () => {})

  xit("renders without crashing", () => {
    render(<Application />);
  });
  
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
   //console.log(prettyDOM(render(<Application />)))
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", () => {
    render(<Application />);
  });



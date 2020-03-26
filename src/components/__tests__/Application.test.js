import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByText, getByPlaceholderText } from "@testing-library/react";
//import { getByPlaceholderText } from '@testing-library/dom'

import Application from "components/Application";
//import { getByText } from "@testing-library/react";

import axios from 'axios'

afterEach(cleanup);




describe("Application", () => {
  
  
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
  
  xit("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  
  
  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    //console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    
    //console.log(prettyDOM(appointments));

    const appointment = appointments[0];
    console.log(prettyDOM(appointment));
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save")); 


  });

  xit("test using getAllByTestID showing all from <article>",  async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
  
    console.log(prettyDOM(appointments));

  });
  
})


import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import Application from "components/Application";
import axios from 'axios'
//import { getByPlaceholderText } from '@testing-library/dom'
//import { getByText } from "@testing-library/react";

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
  
  xit("1. changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  
  
  xit("2. loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    //console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    
    //console.log(prettyDOM(appointments));

    const appointment = appointments[0];
    //console.log(prettyDOM(appointment));
    //debug()
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save")); 

    expect(getByText(appointment, "Saving!")).toBeInTheDocument();
    //console.log(prettyDOM(appointment));
//     await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

// await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")

  
);
expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
console.log(prettyDOM(day));
    //debug();
  });



  xit("3. loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
//Delete the appointment?

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Delete the appointment?")
  ).toBeInTheDocument();
  //expect(getByText(appointment, "Saving!")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm")); 

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting!")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  console.log(prettyDOM(day));

  //debug();
  });

  xit("4. loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    
    const { container, debug } = render(<Application />);
    
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save")); 

  expect(getByText(appointment, "Saving!")).toBeInTheDocument();
  
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  // console.log(prettyDOM(appointment));

   const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
 //debug();
})





xit("5. shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "An error occured!")).toBeInTheDocument();

});

it("6. shows the delete error when failing to delete an existing appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Delete the appointment?")
  ).toBeInTheDocument();
  //expect(getByText(appointment, "Saving!")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm")); 

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting!")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Error"));
  expect(getByText(appointment, "An error occured!")).toBeInTheDocument();

});

  
})


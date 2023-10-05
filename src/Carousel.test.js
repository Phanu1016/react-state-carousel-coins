import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("should render without crashing, Carousel", function(){
  render(<Carousel />)
})

it("should matches snapshot, Carousel", function(){
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})


it("should render without crashing, Card", function(){
  render(<Card />)
})

it("should matches snapshot, Card", function(){
  const {asFragment} = render(<Card />)
  expect(asFragment()).toMatchSnapshot()
})

it("makes left arrow goes backward and right arrow goes forward", function(){
  const {getByTestId} = render(<Carousel/>)
  const rightArrow = getByTestId("right-arrow")
  fireEvent.click(rightArrow)
  const {getByText} = render(<Card/>)
  expect(getByText("Image 2 of 3.")).toBeInTheDocument()

  const leftArrow = getByTestId("left-arrow")
  fireEvent.click(leftArrow)
  expect(getByText("Image 1 of 3.")).toBeInTheDocument()
})

it("removes arrows when at the front/end index", function(){
  const {getByTestId} = render(<Carousel/>)
  const rightArrow = getByTestId("right-arrow")
  fireEvent.click(rightArrow)
  fireEvent.click(rightArrow)
  expect(rightArrow).not.toBeInTheDocument()

  const leftArrow = getByTestId("left-arrow")
  fireEvent.click(leftArrow)
  fireEvent.click(leftArrow)
  expect(leftArrow).not.toBeInTheDocument()
})
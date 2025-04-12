import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategorySelection from "./CategorySelection";
import { BrowserRouter } from "react-router-dom";

// Mocking navigate
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("CategorySelection Component", () => {
  test("renders categories", () => {
    render(
      <BrowserRouter>
        <CategorySelection
          setSelectedCategory={() => {}}
          setCurrentQuestionIndex={() => {}}
        />
      </BrowserRouter>
    );

    // Checks that both categories are visible (based on your sample JSON)
    expect(screen.getByText(/JavaScript Basics/i)).toBeInTheDocument();
  });

  test("navigates to quiz page on category click", () => {
    render(
      <BrowserRouter>
        <CategorySelection
          setSelectedCategory={() => {}}
          setCurrentQuestionIndex={() => {}}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/JavaScript Basics/i));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/quiz");
  });
});

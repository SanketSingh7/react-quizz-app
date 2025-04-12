import React from "react";
import { render, screen } from "@testing-library/react";
import ResultPage from "./ResultPage";
import { BrowserRouter } from "react-router-dom";
import questionsData from "../Data/questions.json";

describe("ResultPage Component", () => {
  const selectedCategory = questionsData.categories[0]; // JavaScript Basics

  const selectedAnswers = {
    0: "<script src='script.js'>", // correct
    1: "function = myFunction()", // incorrect
    2: "const x = 5;", // correct
  };

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ResultPage
          selectedCategory={selectedCategory}
          selectedAnswers={selectedAnswers}
        />
      </BrowserRouter>
    );

  test("displays final score correctly", () => {
    renderComponent();

    // Correct answers = 2 out of 3
    expect(screen.getByText(/You scored 2 out of 3/i)).toBeInTheDocument();
  });

  test("renders all questions with user’s answers", () => {
    renderComponent();

    selectedCategory.questions.forEach((q) => {
      expect(screen.getByText(q.question)).toBeInTheDocument();
    });
  });

  test("highlights correct vs incorrect answers", () => {
    renderComponent();

    // Correct
    expect(screen.getByText("<script src='script.js'>")).toBeInTheDocument();
    expect(screen.getByText("const x = 5;")).toBeInTheDocument();

    // Incorrect answer
    expect(screen.getByText("function = myFunction()")).toBeInTheDocument();

    // Actual correct answer that should be shown even if user selected wrong
    expect(screen.getByText("function myFunction()")).toBeInTheDocument();
  });
});

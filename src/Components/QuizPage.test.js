import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import QuizPage from "./QuizPage";
import { BrowserRouter } from "react-router-dom";
import questionsData from "../Data/questions.json";

// Setup fake timers
jest.useFakeTimers();

describe("QuizPage Component", () => {
  const mockSetSelectedAnswers = jest.fn();
  const mockSelectedAnswers = {};
  const mockSelectedCategory = questionsData.categories[0]; // JavaScript Basics
  const mockSetCurrentQuestionIndex = jest.fn();
  const mockCurrentQuestionIndex = 0;

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <QuizPage
          selectedCategory={mockSelectedCategory}
          selectedAnswers={mockSelectedAnswers}
          setSelectedAnswers={mockSetSelectedAnswers}
          currentQuestionIndex={mockCurrentQuestionIndex}
          setCurrentQuestionIndex={mockSetCurrentQuestionIndex}
        />
      </BrowserRouter>
    );

  test("renders first question and options", () => {
    renderComponent();

    expect(screen.getByText(/What is the correct syntax/i)).toBeInTheDocument();
    expect(screen.getByText(/<script src='script.js'>/i)).toBeInTheDocument();
  });

  test("selecting an option updates selectedAnswers", () => {
    renderComponent();

    const option = screen.getByText(/<script src='script.js'>/i);
    fireEvent.click(option);

    // Expected to call setSelectedAnswers
    expect(mockSetSelectedAnswers).toHaveBeenCalled();
  });

  test("clicking next moves to next question", () => {
    renderComponent();

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockSetCurrentQuestionIndex).toHaveBeenCalledWith(1);
  });

  test("auto-advances to next question after timer expires", () => {
    renderComponent();

    act(() => {
      jest.advanceTimersByTime(10000); // 10 seconds
    });

    expect(mockSetCurrentQuestionIndex).toHaveBeenCalledWith(1);
  });
});

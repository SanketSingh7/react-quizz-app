import { useEffect, useState } from "react";
import questionsData from "../Data/questions.json";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@mui/material";

const QuizPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);
  const [unAnswered, setUnanswered] = useState(0);

  useEffect(() => {
    const selectedCategory = questionsData.categories.find(
      (cat) => cat.id === params.id
    );
    if (selectedCategory) {
      setQuestions(selectedCategory.questions);
    }
  }, [params.id]);

  useEffect(() => {
    let countDown;
    if (timer === 0) {
      handleNext();
      return;
    }
    countDown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countDown);
  }, [timer]);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIdx];
    if (selectedOption === "") {
      setUnanswered((prev) => prev + 1);
    } else if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption("");
    setTimer(20);

    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      navigate("/result", {
        state: {
          score,
          total: questions.length,
          unAnswered,
        },
      });
    }
  };

  if (questions.length === 0) {
    return <div align="center">Quiz is Loading.....</div>;
  }

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="quiz-page container">
      <h2>{`Questions ${currentQuestionIdx + 1} of ${questions.length}`}</h2>
      <p className="question">{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <label className="option-button" key={option}>
            <Input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              className="radio-button"
            ></Input>
            {option}
          </label>
        ))}
      </div>
      <div className="timeLeft">Time Left: {timer}s</div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default QuizPage;

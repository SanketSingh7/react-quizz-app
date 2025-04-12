import { useLocation, useParams, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, unAnswered } = location.state || {};

  const getFeedback = () => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "🎉 Great job!";
    if (percentage >= 50) return "👍 Good effort!";
    return "🧠 Keep practicing!";
  };

  const handleRestart = () => {
    navigate("/");
  };

  if (score === undefined || total === undefined || unAnswered === undefined) {
    return (
      <div>
        <p>No result data available, Please complete a quiz first.</p>
        <button onClick={handleRestart}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="result-page container">
      <h2>Quiz completed!</h2>
      <p>
        <strong>Your Score: </strong> {score}/ {total}{" "}
      </p>
      <p>
        <strong>Unanswered Questions:</strong> {unAnswered}
      </p>
      <p>
        <strong>Feedback:</strong> {getFeedback()}
      </p>

      <button onClick={handleRestart}>Try Another Quiz</button>
    </div>
  );
};

export default ResultPage;

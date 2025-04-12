import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import  CategorySelection  from './Components/CategorySelection';
import QuizPage from './Components/QuizPage';
import ResultPage from './Components/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

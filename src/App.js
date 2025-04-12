import './App.css';
import  CategorySelection  from './Components/CategorySelection';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

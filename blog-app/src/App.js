import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<h1>this is home page</h1>} />
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element = {<Signup />} />
        <Route path="/about" element = {<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

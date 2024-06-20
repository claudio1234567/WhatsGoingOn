import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home'; // Assumendo che ci sia una pagina Home

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
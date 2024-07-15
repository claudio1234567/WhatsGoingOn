import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register/Register'; // Importazione del componente Register
import './pages/Login/Login.css';
import './pages/Home/Home.css';
import './pages/Register/Register.css'; // Importazione del file CSS per Register (se necessario)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Aggiunta della rotta per la registrazione */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
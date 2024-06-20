import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
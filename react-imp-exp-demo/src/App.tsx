import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{
          background: '#333',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px'
          }}>Home</Link>
          <Link to="/user-form" style={{
            color: 'white',
            textDecoration: 'none'
          }}>User Form</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-form" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

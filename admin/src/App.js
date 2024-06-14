import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Dashboard/Header';
import AdminDashboard from './components/Dashboard/dashboard';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';

import { useSelector, useDispatch } from 'react-redux';

import './App.css';

function App() {

  return (
    <Router>
     <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<AdminDashboard />} />
        </Routes>
  
    </Router>

  );
}

export default App;


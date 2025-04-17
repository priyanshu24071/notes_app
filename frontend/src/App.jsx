import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

export default function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

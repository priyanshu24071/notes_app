import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('/api/auth/signup', { email, password });
      alert('Signup successful! Please login.');
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 rounded"
      />
      <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded">
        Signup
      </button>
      <p className="mt-4">
        Already have an account? <a href="/" className="text-blue-500">Login</a>
      </p>
    </div>
  );
}

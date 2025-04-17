import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    // 1) Frontend validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert('Please enter a valid email address');
    }
    if (password.length < 6 || password.length > 30) {
      return alert('Password must be between 6 and 30 characters');
    }

    try {
      await axios.post('/api/auth/signup', { email, password });
      alert('Signup successful! Please login.');
      navigate('/');
    } catch (err) {
      // 3) Show backend error (e.g. “Email already registered”)
      const msg = err.response?.data?.message || 'Signup failed';
      alert(msg);
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
      <button
        onClick={handleSignup}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Signup
      </button>
      <p className="mt-4">
        Already have an account?{' '}
        <a href="/" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
   const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // ✅ Store token
      localStorage.setItem('token', response.data.token);

      setIsLoggedIn(true);
      // ✅ Redirect to home page
      navigate('/');

      // (Optional) success feedback
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.error) {
        alert(`Login failed: ${error.response.data.error}`);
      } else {
        alert('Login failed: An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // ✅ User already logged in — redirect to home
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2 flex justify-center items-center">
            <LogIn className="w-6 h-6 mr-2" /> Welcome Back
          </h1>
          <p className="text-gray-500">Log in to your ReiprokAte account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-red-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

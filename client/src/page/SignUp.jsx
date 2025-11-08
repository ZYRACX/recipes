import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the signup logic, e.g., sending a request to the server
    axios.post('http://localhost:5000/api/auth/signup', {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password
    }).then(response => {
      // Handle successful signup, e.g., redirect to login, show message, etc.
      console.log('Signup successful:', response.data);
      alert(`Account created for: ${formData.firstName} ${formData.lastName}`);
    }).catch(error => {
      // Handle signup error
      console.error('Signup error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Signup failed: ${error.response.data.error}`);
      }
    });

  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you could verify the token or redirect the user
      navigate("/")
      // console.log('User already logged in with token:', token);
    }
  }, [navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2 flex justify-center items-center">
            <UserPlus className="w-6 h-6 mr-2" /> Create Account
          </h1>
          <p className="text-gray-500">Join the ReiprokAte family today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

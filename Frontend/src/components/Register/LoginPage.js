import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

// Define validation rules for login
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format';
const validatePassword = (value) => (value.length >= 8 && /^[\w\s!@#$%^&*()_+={}\[\]:;"'<>,.?/~`|-]*$/.test(value)) || 'Password must be at least 8 characters long and can include symbols';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      const { token } = response.data;
      console.log('Token:', token);
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Redirect to chatbot page
      navigate('/chatbot');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome Back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="email"
          placeholder="Email"
          {...register('email', { 
            required: 'Email is required',
            validate: validateEmail
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register('password', { 
            required: 'Password is required',
            validate: validatePassword
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="redirect">
        <p>Don't have an account? <Link to="/signup" className="link">Signup</Link></p>
      </div>
      <div className="or-divider">
        <hr className="divider" />
        <span>OR</span>
        <hr className="divider" />
      </div>
      <div className="social-login">
        <button className="social-button google">Login with Google</button>
        <button className="social-button linkedin">Login with LinkedIn</button>
        <button className="social-button github">Login with GitHub</button>
      </div>
      
    </div>
  );
}

export default LoginPage;

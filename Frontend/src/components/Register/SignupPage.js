import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

// Validation functions
const validateName = (value) => /^[A-Za-z\s]+$/.test(value) || 'Name should not contain numbers';
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format';
const validatePassword = (value) => (value.length >= 8 && /^[\w\s!@#$%^&*()_+={}\[\]:;"'<>,.?/~`|-]*$/.test(value)) || 'Password must be at least 8 alphanumeric long';
const validateConfirmPassword = (value, password) => value === password || 'Passwords do not match';

const SignupPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response.data.message);
    }
  };

  return (
    <div className="signup-page">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="Name"
          {...register('name', { 
            required: 'Name is required',
            validate: validateName
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        
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
        
        <input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword', { 
            required: 'Confirm Password is required',
            validate: value => validateConfirmPassword(value, password)
          })}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <div className="redirect">
        <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
      </div>
      <div className="or-divider">
        <hr className="divider" />
        <span>OR</span>
        <hr className="divider" />
      </div>
      <div className="social-signup">
        <button className="social-button google">Signup with Google</button>
        <button className="social-button linkedin">Signup with LinkedIn</button>
        <button className="social-button github">Signup with GitHub</button>
      </div>
      
    </div>
  );
}

export default SignupPage;

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store/configureStore';
import { loginAction } from '../actions/loginActions';
import { UPDATE_AUTHENTICATION_STATUS } from '../constants/loginConstant';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isSubmitted) {
      sessionStorage.removeItem('loginError');
      navigate('/main');
    } else if (isSubmitted) {
      setError('Invalid credentials. Please try again.');
    }
  }, [isAuthenticated, isSubmitted, navigate]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsSubmitted(true);

    try {
      if (email && password) {
        await dispatch(loginAction(email, password));
        dispatch({ type: UPDATE_AUTHENTICATION_STATUS, isAuthenticated: true });
      } else {
        setError('Please enter valid credentials.');
      }
    } catch (error: any) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
    if (!isAuthenticated && error) {
      localStorage.setItem('loginError', error);
    }
  };

  const isLoginFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    
<div className="container" id="login-screen">
    <div className="logo">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoy13Dpm1IbrYWpaFnNwDSqtGf4na67NmN3TaBR2MJgAvUV9mubtAe5cCqDhr55E0Ut0&usqp=CAU"
        alt="logo"
      />
      {/* Add your logo here */}
    </div>
    <div className="form-container">
      <div className="inputform">
        <TextField className="form-input" label="Email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="inputform">
        <TextField className="form-input" type="password" label="Password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="inputform">
      {error && <div className="error" id="login-error">{error}</div>}
      <Button className="submit-button" variant="contained" onClick={handleLogin} disabled={!isLoginFormValid || loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      </div>
    </div>
  </div>
  );
};

export default LoginScreen;

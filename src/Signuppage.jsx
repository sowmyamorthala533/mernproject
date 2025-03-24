
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";
const Signuppage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/routingpage");
    } catch (err) {
      setError("Failed to create an account: " + err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/routingpage");
    } catch (err) {
      setError("Failed to sign up with Google: " + err.message);
    }
    setLoading(false);
  };

  const handleGithubSignup = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGithub();
      navigate("/routingpage");
    } catch (err) {
      setError("Failed to sign up with GitHub: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>Create New Account</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            minLength="6"
          />
        </div>
        
        <button type="submit" disabled={loading} className="signup-btn">
          Sign Up
        </button>
      </form>
      
      <div className="social-login-divider">
        <span>OR</span>
      </div>
      
      <div className="social-login-buttons">
        <button 
          onClick={handleGoogleSignup} 
          disabled={loading} 
          className="google-btn"
        >
          Sign up with Google
        </button>
        
        <button 
          onClick={handleGithubSignup} 
          disabled={loading} 
          className="github-btn"
        >
          Sign up with GitHub
        </button>
      </div>
      
      <div className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signuppage;
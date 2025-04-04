import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/routingpage");
    } catch (err) {
      setError("Failed to log in: " + err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/routingpage");
    } catch (err) {
      setError("Failed to log in with Google: " + err.message);
    }
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGithub();
      navigate("/routingpage");
    } catch (err) {
      setError("Failed to log in with GitHub: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleEmailPasswordLogin}>
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
          />
        </div>
        
        <button type="submit" disabled={loading} className="login-btn">
          Login
        </button>
      </form>
      
      <div className="social-login-divider">
        <span>OR</span>
      </div>
      
      <div className="social-login-buttons">
        <button 
          onClick={handleGoogleLogin} 
          disabled={loading} 
          className="google-btn"
        >
          Login with Google
        </button>
        
        <button 
          onClick={handleGithubLogin} 
          disabled={loading} 
          className="github-btn"
        >
          Login with GitHub
        </button>
      </div>
      
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
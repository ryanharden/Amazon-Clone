import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import './LoginForm.css';
import error from "../../assets/dialog-error.248x256.png";
import vector from "../../assets/amazon-vector.png";
import { useModal } from "../../context/Modal";

function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return <Navigate to="/" />

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"))
    closeModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <div className="sign-in-page-container">
        <div className="logo-sign-in">
          Rainforest Retail
        </div>
        <img src={vector} className="sign-in-vector" alt="vector"/>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className="error-icon-container">
            {errors.length ? <img src={error} className="error-icon" /> : ""}
          </div>
          <div className="sign-in-header">
            Sign in
          </div>
          <ul className="sign-in-errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="sign-in-label">
            Email
            <input
              className="sign-in-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="sign-in-label">
            Password
            <input
              className="sign-in-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="continue-button" type="submit">Continue</button>
          <div className="sign-in-terms">
            By continuing, you agree to Rainforest Retail's Conditions of Use and Privacy Notice.
          </div>
          <div className="sign-in-demo" onClick={demoLogin}>Sign in as Demo User</div>
        </form>
        <div className="new-to-rainforest">
          <div className="new-header-line">
            <div className="new-header">New to Rainforest Retail?</div>
          </div>
          <div onClick={() => navigate('/signup')} className="new-create-account">
              Create your Rainforest Retail account
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;

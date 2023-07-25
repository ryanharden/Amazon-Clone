import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import error from "../../assets/dialog-error.248x256.png";
import vector from "../../assets/amazon-vector.png";

function SignupFormPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }

    const validateEmail = (email) => {
      const emailPattern = /\S+@\S+\.\S+/;
      return emailPattern.test(email);
    }

    if (firstName.length < 2) {
      setErrors(["First Name must be more 2 characters"])
    } else if (firstName.length > 25) {
      setErrors(["First Name must be less than 25 characters"])
    }

    if (lastName.length < 2) {
      setErrors(["Last Name must be more 2 characters"])
    } else if (lastName.length > 25) {
      setErrors(["Last Name must be less than 25 characters"])
    }


    if (!email) {
      setErrors(["Please enter your email"]);
    } else if (!validateEmail(email)) {
      setErrors(["Invalid email address. Please try again."]);
    }

  };

  return (
    <>
      <div className="sign-up-container">
        <div className="logo-sign-in">
          Rainforest Retail
        </div>
        <img src={vector} className="sign-in-vector" alt="vector"/>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="error-icon-container">
            {errors.length ? <img src={error} className="error-icon" /> : ""}
          </div>
          <div className="sign-in-header">
            Create an account
          </div>
          <ul className="sign-up-errors">
            {errors.map((error, idx) => <li className="li-error" key={idx}>{error}</li>)}
          </ul>
          <label className="sign-up-label">
            Email
            <input
              id="email-input"
              className="sign-up-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="sign-up-label">
            First Name
            <input
              id="first-name-input"
              className="sign-up-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="sign-up-label">
            Last Name
            <input
              id="last-name-input"
              className="sign-up-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="sign-up-label">
            Password
            <input
              id="password-input"
              className="sign-up-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="sign-up-label">
            Confirm Password
            <input
              id="confirm-password-input"
              className="sign-up-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button id="submit-button" className="continue-button" type="submit">Continue</button>
          <div className="sign-in-terms">
            By creating an account, you agree to Rainforest Retail's Conditions of Use and Privacy Notice.
          </div>
          <div className="sign-in-line"></div>
          <div className="already-have-sign-in">
            <div className="already-have">
              Already have an account?
            </div>
            <Link to='/login' className="sign-up-link">Sign in</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;

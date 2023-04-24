import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";
import { useRef } from "react";

const auth = getAuth(app);
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Please at least two UpperCase!");
      return;
    } else if (!/(?=.*[!@#$*])/.test(password)) {
      setError("Please add a special character!");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 character long");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccess("User loggedIn Successfully");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPassword = (e) => {
    console.log(emailRef.current);
    const email = emailRef.current.value;
    if (!email) {
      alert("please insert email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        return;
      });
  };
  return (
    <div className="w-50 mx-auto mt-5">
      {/*  */}

      <form onSubmit={handleLogin}>
        <h3>Please Login</h3>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p>
          Forget Password? Click to{" "}
          <button onClick={handleResetPassword} className="btn btn-link">
            reset
          </button>
        </p>
        <p>
          new to this website? Please <Link to="/register">Register</Link>{" "}
        </p>
      </form>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const handleImageChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const email = e.target.password.value;
    const password = e.target.email.value;
    console.log(email, password);
setError("");
setSuccess("");
    if(!/(?=.*[A-Z])/.test(password)){
      setError("Please atleast one uppercase");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if(loggedUser.emailVerified){
          alert("Not allowed")
        }
        setError("");
        e.target.reset();
        setSuccess('User successfully loggedIn');
        sendEmailVerification(result.user)
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setSuccess('')
      });

      const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
        .then(result => {
          console.log(result);
          alert('Please verify your email address')
        })
      };
  };
  return (
    <div className="mx-auto w-50 mt-5">
      <h1>Baler register</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          onBlur={handlePass}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <br />
        <br />
        <input
          onChange={handleImageChange}
          type="password"
          name="password"
          placeholder="password"
        />{" "}
        <br />
        <br />
        <button type="submit" name="submit">
          Submit
        </button>
        <p>Already have an account? Please <Link to='/login'>Log in</Link> </p>
      </form>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Register;

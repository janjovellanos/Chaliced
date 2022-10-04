import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/')
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .then(() => history.go())
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    return dispatch(
        sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
};

  return (
    <>
      <div className="login-header">Chaliced</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
        <label className="credential-label">
          Username or Email
        </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        <label className="password-label">
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        <button className="login-btn" id="login-btn" type="submit">Log In</button>
        <div className="demo-login" onClick={handleDemoUser}>Try it as a guest</div>
      </form>
    </>
  );
}

export default LoginForm;

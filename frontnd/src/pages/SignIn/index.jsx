import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

import { useStore, useSelector } from "react-redux";
import { user } from "../../app/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Login } from "../../features/user";

function SignIn() {
  const store = useStore();
  const { token } = useSelector(user);

  const navigate = useNavigate();
  localStorage.removeItem("qrcode");

  // State to manage the visibility of box-1 and box-2
  const [showBox1, setShowBox1] = useState(true);

  useEffect(() => {
    token != null && navigate("/user");
  }, [token, navigate]);

  const handleSignInDupClick = () => {
    setShowBox1(!showBox1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Login(e, store);
  };

  return (
    <main id="SignIn">
      <section className="sign-in-content">
        <div className="sign-in-title">
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={showBox1 ? "visible" : "hidden"}>
            <div className="box-1">
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="email"
                  id="username"
                  required
                  maxLength="64"
                  defaultValue={
                    localStorage.username ? localStorage.username : ""
                  }
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  minLength="8"
                  maxLength="64"
                />
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  defaultChecked={localStorage.remember ? true : false}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <div class="sign-in-dup" onClick={handleSignInDupClick}>
                Sign-In
              </div>
            </div>
          </div>
          <div className={showBox1 ? "hidden" : "visible"}>
            <div className="box-2">
              <div className="content">
                {""}
                <label htmlFor="token">2 Factor Token</label>
                <input type="token" id="fa-2" required />
              </div>
              <button className="sign-in-button">Verify</button>
            </div>
          </div>
        </form>
        <p className="errorText hide">Email or password incorrect</p>
      </section>
    </main>
  );
}

export default SignIn;

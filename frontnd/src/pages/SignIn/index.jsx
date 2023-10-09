import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  useEffect(() => {
    token != null && navigate("/user");
  }, [token, navigate]);

  return (
    <main id="SignIn">
      <section className="sign-in-content">
        <div className="sign-in-title">
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>
        </div>
        <form onSubmit={(e) => Login(e, store)}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              required
              maxLength="64"
              defaultValue={localStorage.username ? localStorage.username : ""}
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
          <div class="input-wrapper">
            <label htmlFor="token">2 Factor Token</label>
            <input type="token" id="2-fa" />
            {/* <Modal open={openModal} onClose={() => setOpenModal(false)} /> */}
          </div>

          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              defaultChecked={localStorage.remember ? true : false}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
        <p className="errorText hide">Email or password incorrect</p>
      </section>
    </main>
  );
}

export default SignIn;

import { NavLink, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { user } from "../../app/selectors";
import { logout } from "../../features/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOut,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/argentBankLogo.png";

function Header() {
  const { token, firstName } = useSelector(user);
  const dispatch = useDispatch();

  return (
    <nav className="header-nav">
      <Link className="main-nav-logo" to="/">
        <img src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {token != null ? (
        <div className="main-nav">
          <NavLink to="/user" id="userLink" className="btn btn--request">
            <FontAwesomeIcon icon={faUserCircle} className="margin" />
            {firstName}
          </NavLink>

          <Link
            to="/"
            onClick={() => dispatch(logout())}
            className="btn btn--request">
            <FontAwesomeIcon icon={faSignOut} className="margin" />
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="main-nav">
          <NavLink to="./sign-up" className="btn btn--request">
            <FontAwesomeIcon icon={faSignIn} className="margin" />
            Sign Up
          </NavLink>

          <NavLink to="./sign-in" className="btn btn--request">
            <FontAwesomeIcon icon={faUserCircle} className="margin" />
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Header;

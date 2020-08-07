import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <div className="site-title">
          <img className="logo" src="../../images/1.png" alt="Logo ARTLINE" />
          <h2 className="logo">ART'LINE</h2>
        </div>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/profile">
                <span style={{ fontFamily: "Barlow-Light", fontSize: "14px" }}>
                  {context.user && context.user.email}
                </span>
              </NavLink>
            </li>
            <li>
              <span
                style={{ fontFamily: "Barlow-Light", fontSize: "14px" }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);

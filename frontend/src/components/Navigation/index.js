import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks =
    <div className="main-nav">
      <div className="top-nav">
        <div className="home-logo">Chaliced</div>
        <div className="searchbar">
          <input type="search" placeholder="Search"></input>
        </div>
        <div className="nav-right">
          MyFavs <ProfileButton user={sessionUser} />
        </div>
      </div>
      <div className="bottom-nav">
        <div className="nav-categories">Categories</div>
      </div>
      {/* <ProfileButton user={sessionUser} /> */}
    </div>
  } else {
    sessionLinks = (
      <div className="main-nav">
        <div className="top-nav">
          <div className="home-logo">Chaliced</div>
          <div className="searchbar">
            <input type="search" placeholder="Search"></input>
          </div>
          <div className="nav-right">
            MyFavs <LoginFormModal />
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </div>
        <div className="bottom-nav">
          <div className="nav-categories">Categories</div>
        </div>
        {/* <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink> */}
      </div>
    );
  }

  return (
    <>
      {isLoaded && sessionLinks}
    </>
  );
}

export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormPage";
import CreateProductModal from "../ProductComponents/CreateProduct";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks =
    <div className="main-nav">
      <div className="top-nav">
        <NavLink to='/' className="home-logo">Chaliced</NavLink>
        <div className="searchbar">
          <input type="search" placeholder="Search"></input>
        </div>
        <div className="nav-right">
          <NavLink to='/shop' className="shop-btn">Shop</NavLink>
          <CreateProductModal />
          {/* <NavLink to='/sell' className="sell-btn">Sell</NavLink> */}
          <div className="favs-and-profile">
            <i className="fa-regular fa-heart"></i><ProfileButton user={sessionUser} />
          </div>
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
        <NavLink to='/' className="home-logo">Chaliced</NavLink>
          <div className="searchbar">
            <input type="search" placeholder="Search"></input>
          </div>
          <div className="nav-right">
            <LoginFormModal />
            <SignupFormModal />
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

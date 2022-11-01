import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormPage";
import CreateProductModal from "../ProductComponents/CreateProduct";
import SearchBar from "./Searchbar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks =
    <div className="main-nav">
      <div className="top-nav">
        <NavLink to='/' className="home-logo">Chaliced</NavLink>
        <div className="searchbar">
          <SearchBar />
        </div>
        <div className="nav-right">
          <a href='https://github.com/janjovellanos'><i className='fa-brands fa-github log-github'></i></a>
          <a href='https://www.linkedin.com/in/jan-michael-jovellanos-b30322242/'><i className='fa-brands fa-linkedin log-linkedin'></i></a>
          <NavLink to='/shop' className="shop-btn">Shop</NavLink>
          <CreateProductModal />
          <div className="favs-and-profile">
            <i
              onClick={() => history.push(`/users/${sessionUser?.id}/favorites`)}
              className="fa-regular fa-heart"></i>
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </div>
      <div className="bottom-nav">
        <div className="nav-categories">
          <div onClick={() => history.push('/shop/tops')} >Tops</div>
          <div onClick={() => history.push('/shop/bottoms')} >Bottoms</div>
          <div onClick={() => history.push('/shop/shoes')} >Shoes</div>
          <div onClick={() => history.push('/shop/accessories')} >Accessories</div>
        </div>
      </div>
    </div>
  } else {
    sessionLinks = (
      <div className="main-nav">
        <div className="top-nav">
        <NavLink to='/' className="home-logo">Chaliced</NavLink>
          <div className="searchbar">
          </div>
          <div className="nav-right">
            <a href='https://github.com/janjovellanos'><i className='fa-brands fa-github'></i></a>
            <a href='https://www.linkedin.com/in/jan-michael-jovellanos-b30322242/'><i className='fa-brands fa-linkedin'></i></a>
            <LoginFormModal />
            <SignupFormModal />
          </div>
        </div>
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

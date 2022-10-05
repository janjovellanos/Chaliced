import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [menuClass, setMenuClass] = useState('profile-dropdown')

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    setMenuClass('profile-dropdown activated')
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
      setMenuClass('profile-dropdown')
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    history.push('/')
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile-btn-top-nav">
      <button className="profile-btn" onClick={openMenu}>
        <i className="fa-solid fa-user" />
      </button>
        <ul className={menuClass}>
          <li key={user?.id} onClick={() => history.push(`/users/${user?.id}`)}>My Profile</li>
          <li key={user?.id + 31431098}>{user?.email}</li>
          <li>
            <button onClick={logout}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>
          </li>
        </ul>
    </div>
  );
}

export default ProfileButton;

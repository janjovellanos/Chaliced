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
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profile-btn" onClick={openMenu}>
      {/* <button className="profile-btn" onClick={e => history.push(`/users/${user?.id}`)}> */}
        {/* <i className="fas fa-user-circle" /> */}
        <i className="fa-solid fa-user" />
      </button>
      {showMenu && (
        <ul className={menuClass}>
          <li key={user?.id} onClick={() => history.push(`/users/${user?.id}`)}>{user?.username}</li>
          <li key={user?.id + 31431098}>{user?.email}</li>
          {/* <li key={'favoritesfewvere'}>Favorites</li> */}
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

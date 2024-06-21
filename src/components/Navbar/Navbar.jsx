import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileThunkAction, logoutAction } from '../../states/auth/action';

function Navbar() {
  const { isLogin, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfileThunkAction());
    }
  }, [isLogin]);
  return (
    <div>
      <div className="navbar">
        <Link to="/">Forum Discussion for React Expert</Link>
        <div className="navbar-info">
          <div className="navbar-user-info">
            <img src={profile.avatar} alt="User Avatar" />
            <p>{profile.name}</p>
          </div>
          {isLogin ? <button onClick={handleLogout} type="button">Logout</button> : <Link to="/login">Login</Link>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

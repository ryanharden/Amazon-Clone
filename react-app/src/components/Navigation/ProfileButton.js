import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout, login } from "../../store/session";
import { Link, Navigate, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
    navigate('/')
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(login());
  // }

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"))
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const triangleClassName = "triangle-drop" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-button-container">
        <div className="profile-button" onClick={openMenu}>
          <div className="hello-user">
            {user ? `Hello, ${user?.first_name}` : "Hello, sign in"}
          </div>
          <div className="account-triangle">
            <div className="account-lists">
              Account & Lists
            </div>
            <div className="triangle">
              <img src={"https://d1irxr40exwge2.cloudfront.net/nav-arrow.png"} alt="▼" />
            </div>
          </div>
        </div>
        <div className="dropdown-container">
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div className="your-account">
                  Your Account
                </div>
                <div className="drop-options">
                  <Link onClick={closeMenu} className="drop-link" to={`/users/${user.id}/products`}>
                    <div className="drop-products">
                      Manage Products
                    </div>
                  </Link>
                  <Link onClick={closeMenu} className="drop-link" to={'/featurecoming'}>
                    <div className="drop-orders">
                      Manage Orders
                    </div>
                  </Link>
                  <div className="drop-logout" onClick={handleLogout}>Sign out</div>
                </div>
              </>
            ) : (
              <>
                <Link className="drop-link" to={"/login"}>
                  <div className="drop-signin">
                    Sign in
                  </div>
                </Link>
                <div className="drop-demo" onClick={demoLogin}>Demo User</div>
                <div className="drop-signup">
                  <div className="new-cust">
                    New customer?
                  </div>
                  <div className="start-here">
                    <Link className="start-here-link" onClick={closeMenu} to={'/signup'}>Start here.</Link>
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
        <div className={triangleClassName} />
      </div>
    </>
  );
}

export default ProfileButton;

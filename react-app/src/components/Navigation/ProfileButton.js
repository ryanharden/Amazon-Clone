import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout, login } from "../../store/session";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
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
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu}>
        <div className="hello-user">
          {user ? `Hello, ${user?.first_name}` : "Hello, sign in"}
        </div>
        <div className="account-lists">
          Account & Lists
        </div>
      </div>
      <div className="dropdown-container">
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <Link onClick={closeMenu} className="drop-link" to={`/users/${user.id}/products`}>
                <div className="drop-products">
                  Manage Your Products
                </div>
              </Link>
              <Link onClick={closeMenu} className="drop-link" to={`/users/${user.id}/orders`}>
                <div className="drop-orders">
                  Manage Your Orders
                </div>
              </Link>
              <div className="drop-logout" onClick={handleLogout}>Sign out</div>

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
                <Link to={'/signup'}>Start here.</Link>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;

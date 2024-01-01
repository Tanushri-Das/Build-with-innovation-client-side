import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaBars, FaShoppingBasket } from "react-icons/fa";
import "./Header.css";
import { fetchCartCount } from "../../../redux/cartSlice";

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);
  console.log(cartCount);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header>
      <div className="flex justify-between items-center">
        <Link to="/" className="app-name">
          <FaShoppingBasket className="basket" /> SmartBasket
        </Link>

        <div className="nav-links">
          <NavLink to="/home" className="links">
            Home
          </NavLink>

          <div className="link">
            <FaShoppingCart className="text-xl shopping-cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>

          {authToken ? (
            <li className="flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-white text-lg font-semibold text-black px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </li>
          ) : (
            <NavLink to="/login" className="links">
              <button className="bg-white text-lg font-semibold text-black px-5 py-2 rounded-lg">
                Login
              </button>
            </NavLink>
          )}
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      {showMenu && (
        <div className="responsive-menu">
          <NavLink
            to="/"
            className="home-link font-semibold"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <FaShoppingCart className="text-xl shopping-cart-icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      )}
    </header>
  );
};

export default Header;

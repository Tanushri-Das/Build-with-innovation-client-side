import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars, FaShoppingBasket } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const cartItems = useSelector((state) => state.cart);

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="app-name">
          <FaShoppingBasket className="basket" /> SmartBasket
        </Link>

        <div className="nav-links">
          <NavLink to="/" className="links">
            Home
          </NavLink>
          <NavLink to="/checkout" className="shopping-cart-icon link">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </NavLink>
          <NavLink to="/login" className="links">
            Login
          </NavLink>
        </div>

        <div className="menu-icon">
          <FaBars />
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars, FaShoppingBasket } from "react-icons/fa";
// import "./Header.css";

// const Header = () => {
//   const cartItems = useSelector((state) => state.cart);
//   // State to manage the visibility of the responsive menu
//   const [showMenu, setShowMenu] = useState(false);

//   // Function to toggle the visibility of the responsive menu
//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   // Function to close the responsive menu
//   const closeMenu = () => {
//     setShowMenu(false);
//   };
//   const authToken = localStorage.getItem("authToken");
//   const navigate = useNavigate();

//   // Example logout function
//   const handleLogout = () => {
//     // Remove the token from local storage
//     localStorage.removeItem("authToken");

//     // Redirect the user to the login page
//     navigate("/login");
//   };

//   return (
//     <header>
//       <div className="header-container">
//         <Link to="/" className="app-name">
//           <FaShoppingBasket className="basket" /> SmartBasket
//         </Link>

//         <div className="nav-links">
//           <NavLink to="/home" className="links">
//             Home
//           </NavLink>
//           {cartItems.length > 0 && (
//               <span className="cart-count">{cartItems.length}</span>
//             )}

//           {/* Conditional rendering based on user login status */}
//           {authToken ? (
//             <>
//               <li className="flex justify-center">
//                 <button
//                   onClick={handleLogout}
//                   className="bg-white text-lg font-semibold text-black px-5 py-2 rounded-lg"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <NavLink to="/login" className="links">
//               Login
//             </NavLink>
//           )}
//         </div>

//         <div className="menu-icon"  onClick={toggleMenu}>
//           <FaBars />
//         </div>
//       </div>
//       {/* Responsive menu for small screens */}
//       {showMenu && (
//         <div className="responsive-menu">
//           {/* Responsive navigation links */}
//           <NavLink to="/" className="home-link" onClick={closeMenu}>
//             Home
//           </NavLink>
//           {cartItems.length > 0 && (
//               <span className="cart-count">{cartItems.length}</span>
//             )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

// Header.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaShoppingBasket } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const cartCount = useSelector((state) => state.cart.length);
  const [showMenu, setShowMenu] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="app-name">
          <FaShoppingBasket className="basket" /> SmartBasket
        </Link>

        <div className="nav-links">
          <NavLink to="/home" className="links">
            Home
          </NavLink>

          <div className="link">
            <FaShoppingCart className="text-xl"/>
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
              Login
            </NavLink>
          )}
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      {showMenu && (
        <div className="responsive-menu">
          <NavLink to="/" className="home-link" onClick={closeMenu}>
            Home
          </NavLink>
          <FaShoppingCart className="text-xl"/>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      )}
    </header>
  );
};

export default Header;

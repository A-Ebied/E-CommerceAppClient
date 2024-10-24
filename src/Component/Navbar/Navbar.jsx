import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import Style from "./Navbar.module.css";
export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems, count } = useContext(CartContext);
  const navigate = useNavigate();
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="products">
            <img src={logo} alt="FreshCart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="products"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="allOrders">
                  AllOrders
                </Link>
              </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center cursor-pointer">
              <li className="nav-item ">
                <ul className="list-unstyled d-flex gap-3 ">
                  <li>
                    <i className="fa-brands fa-instagram "></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-facebook "></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-tiktok "></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-twitter  "></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-linkedin "></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-youtube "></i>
                  </li>
                </ul>
              </li>
              <li className="nav-item me-2 me-lg-0 position-relative ">
                <Link className="nav-link position-relative" to="/whishlist">
                  <i className="fa-solid fa-heart fa-xl"></i>
                  <span className=" position-absolute top-0 start-100 translate-middle badge  bg-main border rounded-pill bg-danger">
                    {count ?? count}
                  </span>
                </Link>
              </li>
              <li className="nav-item me-2 me-lg-0 position-relative ">
                <Link className="nav-link position-relative" to="/cart">
                  <i className="fas fa-shopping-cart fa-xl"></i>
                  <span className=" position-absolute top-0 start-100 translate-middle badge  bg-main border rounded-pill bg-danger">
                    {numOfCartItems ?? numOfCartItems}
                  </span>
                </Link>
              </li>

              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span role="button" onClick={logout} className="nav-link">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

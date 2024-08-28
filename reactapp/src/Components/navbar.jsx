import React from "react";
import "./components.css";
import { Link } from "react-router-dom";
import logo from "../assets/ND.AI.svg";

export default function Navbar() {
  return (
    <div className="navbar sticky-top pt-0 navigation navbar-expand-lg container-fluid ">
      <nav className="container-fluid d-flex ">
        <div className="navbar-brand brand mx-4">
          <Link to="/" className="Link">
            <img
              src={logo}
              width={"100px"}
              height={"50px"}
              className="bg-image rounded"
            ></img>
          </Link>
        </div>

        <ul
          className="nav  rounded-5  bg-shadow-lg "
          id="pillNav2"
          role="tablist"
        >
          <li className="button btn" role="presentation">
            <Link to="/" className="Link">
              Home
            </Link>
          </li>

          <li className="button btn" role="presentation">
            <Link to="/CharacterPage" className="Link">
              Characters
            </Link>
          </li>

          <li className="button btn" role="presentation">
            <Link to="/" className="Link">
              Rules
            </Link>
          </li>

          {/*
          <li className="nav-item button" role="presentation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </li>
  */}
          {/* 
      <Link to="/" className="Link">
      <li className="nav-item button" role="presentation">
        <button
          className="nav-link text-white rounded-5 "
          id="profile-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          PROFILE
        </button>
      </li>

      </Link>
      */}

          {/*
      <Link to="/" className="Link">
      <li className="nav-item button" role="presentation">
        <button
          className="nav-link text-white rounded-5"
          id="contact-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="false"
        >
         LOGOUT
        </button>
      </li>
      </Link>

    */}
        </ul>
      </nav>
    </div>
  );
}

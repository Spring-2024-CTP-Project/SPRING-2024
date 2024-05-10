import React from "react";
import "./components.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.jpg";

export default function Navbar() {
  return (
    <div className="navbar sticky-top pt-0 navigation navbar-expand-lg container-fluid">
      <nav className="container-fluid d-flex justidy-content-end">
        <div className="navbar-brand brand navigation">
           
          <img
            src={logo}
            width={"45px"}
            className="bg-image rounded "
           
          >
            </img> DND.AI

           
        </div>

        <ul
          className="nav navigation rounded-5 navigation bg-shadow-lg "
          id="pillNav2"
          role="tablist"
        >
         
            <li className="nav-item button" role="presentation">
            <Link to="/" className="Link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                className="bi bi-house-door-fill"

                viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
              </Link>
            </li>
         

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

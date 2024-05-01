import React from "react";
import './components.css'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar pt-0 navigation navbar-expand-lg container-fluid d-flex justify-content-center">
    <nav className="d-flex container-fluid justify-content-center ">
    <ul
      className="nav navigation rounded-5 navigation bg-shadow-lg "
      id="pillNav2"
      role="tablist" >
     <Link to="/">
      <li className="nav-item button" role="presentation">
      
        <button
          className="nav-link text-white active rounded-5 "
          id="home-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="true">
          Home
        </button>
       
      </li>
      </Link>
      <li className="nav-item button" role="presentation">
        <button
          className="nav-link text-white rounded-5 "
          id="profile-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          Profile
        </button>
      </li>
      <li className="nav-item button" role="presentation">
        <button
          className="nav-link text-white rounded-5"
          id="contact-tab2"
          data-bs-toggle="tab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          Logout
        </button>
      </li>
    </ul>
   
    </nav>
    </div>
  );
}

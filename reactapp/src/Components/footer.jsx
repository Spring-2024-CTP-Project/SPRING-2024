import React from "react";
import Logo from "../assets/logo2.jpg";
import github from "../assets/github-logo.png";

export default function Footer() {
  return (
    <div className="navigation">
      <div className="container-fluid">
        <div className="text-center text-white">
          <div className="container p-4">
            <hr></hr>
            <span className="container d-flex">
              <img src={Logo} width="45px" className="bg-image rounded"></img>
              
              </span>
              <div className="justify-content-center align-items-center">
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-outline-light btn-rounded"
                >
                  <img src={github}></img> Github
                </button>
                
              </div>
              © CTP 2024
            
          </div>
        </div>
      </div>
    </div>
  );
}

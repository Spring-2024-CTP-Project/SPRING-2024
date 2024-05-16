import React from "react";
import Logo from "../assets/logo2.jpg";
import github from "../assets/github-logo.png";

export default function Footer() {
  return (
    <div className="navigation">
      <div className="container-fluid">
        <footer className="text-center text-white navigation">
          <div className="container p-4 pb-0">
            <hr></hr>
            <span className="container d-flex">
              <img src={Logo} width="45px" className="bg-image rounded"></img>
              
              </span>
              <span className="d-flex justify-content-center align-items-center">
                <button
                  data-mdb-ripple-init
                  type="button"
                  class="btn btn-outline-light btn-rounded"
                >
                  <img src={github}></img> Github
                </button>
                
              </span>
              © CTP 2024:
            
          </div>
        </footer>
      </div>
    </div>
  );
}

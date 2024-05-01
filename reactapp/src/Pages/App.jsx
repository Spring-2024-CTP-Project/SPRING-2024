import {React, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Navbar from "../Components/navbar.jsx";
import './index.css'


function App() {

  return (
    
      <div className=" background-image">
      <Navbar/>
      <br></br>
      <div className="row background ">
      <h1>CHOOSE YOUR PATH</h1>
      <div className="container col-4 pt-4">
        <h2>Character Page</h2>
        <img src=""></img>
        <p>Create and store the characters for the campaigns you will use</p>
        <Link to="/CharacterPage">
          <button>
          Character Page
          </button>
         
        </Link>
      </div>

      <div className="container  col-4 pt-4">
        <h2>Campaign Page</h2>
        <img src=""></img>
        <p>Create a demo campaign to learn the basics of the Game</p>
        <Link to="/Campaign">
        <button>
          Camapign
        </button>
                 </Link>
      </div>

      <div className="container   col-4 pt-4">
      <h2>Chat-Bot Page</h2>
      <img src=""></img>
        <p>Learn the basics of the Game by asking some questions</p>
        <Link to="/Help">
        <button>
          HELP
          </button>
         
        </Link>
        </div>
        </div>
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <br></br>
          

        </div>
      </div>
      
    
     
    
  );
}

export default App;

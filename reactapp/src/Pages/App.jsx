import {React, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Navbar from "../Components/navbar.jsx";
import './index.css'


function App() {

  return (
    
      <div className=" background-image">
      <Navbar/>
      
      <div className="p-5 text-center mask rounded-3">
    <div className="container  ">
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-white">
        <h1 className="mb-3">WELCOME TO DND.AI</h1>
        <h4 className="mb-3">This app is meant to show the capabilities of Large Language Models in the context of story telling and Image generation</h4>
      </div>
    </div>
  </div>
</div>

      <br></br>
      <div className="row-cols-lg-1 container-fluid  background ">
      <h1>CHOOSE YOUR PATH</h1>
      <div className=" container pt-4">
        <h2>Character Page</h2>
        <img src="../"></img>
        <p>Create and store the characters for the campaigns you will use</p>
        <Link to="/CharacterPage">
        <button class="btn btn-outline-dark btn-lg">
          Character Page
        </button>
         
        </Link>
      </div>

      <hr></hr>

      <div className="container  pt-4">
        <h2>Campaign Page</h2>
        <img src=""></img>
        <p>Create a demo campaign to learn the basics of the Game</p>
        <Link to="/Campaign">
        <button class="btn btn-outline-dark btn-lg">
          Camapign
        </button>
                 </Link>
      </div>

      {/*
      <div className="container   pt-4">
      <h2>Chat-Bot Page</h2>
      <img src=""></img>
        <p>Learn the basics of the Game by asking some questions</p>
        <Link to="/Help">
        <button class="btn btn-outline-dark btn-lg">
         Help
        </button>
         
        </Link>
        </div>
  */}
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

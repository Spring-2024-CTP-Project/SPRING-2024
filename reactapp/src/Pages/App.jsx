import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/navbar.jsx";
import Footer from "../Components/footer.jsx";
import "./index.css";
import wizard from "../assets/wizard.png";
import campaign from "../assets/Campaign.jpg";
import spellbook from '../assets/Spellbook.jpg'

function App() {
  return (
    <div className=" background-image">
      <Navbar />
      <div className="p-5 text-center mask rounded-3">
        <div className="container  ">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">WELCOME TO DND.AI</h1>
                
              <h4 className="mb-3">
                This app is meant a short Work-In-Progress Demo meant to show
                the capabilities of Large Language Models in the context of
                story telling and Image generation
              </h4>

              <div className="container  pt-3">

             
             
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <hr className="container"></hr>
        <Link to="/CharacterPage">
              <button className="btn btn-dark btn-lg"> Get Started </button>

              </Link>
      </div>

     
      <div className="  container-fluid ">
        <h1></h1>
        <div className="row row-cols-lg-3 ">
          <div className=" my-1">
            <div className="container background card-outline">
            <h2>Character Page</h2>
            <div className="container-fluid ">
              <img
                src={wizard}
                className="bg-image rounded mx-auto d-block"
                width={"350px"}
              ></img>
            </div>

            <p className="h4 pt-3">
              Create and store the characters for the campaigns you will use
            </p>
            <hr></hr>
            <Link to="/CharacterPage" reloadDocument='true'>
            { window.scrollTo(0, 0)}
              <button className="btn btn-dark btn-lg">CHARACTERS</button>
            </Link>
            </div>
            
           
          </div>



        
          <div className="  my-2 gx-3">
            <div className="container background card-outline">

           
            <h2>Campaign Page</h2>
            <div className="container-fluid  ">
              <img
                src={campaign}
                className="bg-image rounded mx-auto d-block"
                width={"350px"}
              ></img>
            </div>
            <p className="h4 pt-3">
            Create a demo campaign to learn the basics of the Game
            </p>
            <hr></hr>
            <Link to="/Campaign" reloadDocument='true'>
              <button className="btn btn btn-dark btn-lg ">CAMPAIGN</button>
            </Link>
          </div>
          </div>



          
          <div className="  my-2 gx-3">
            <div className="container background card-outline">

           
            <h2>DND Rule Book</h2>
            <div className="container-fluid  ">
              <img
                src={spellbook}
                className="bg-image rounded mx-auto d-block"
                width={"350px"}
              ></img>
            </div>
            <p className="h4 pt-3">
            Ask the Dungeon Master expert Lord Gippy T, any question you may have

            </p>
            <hr></hr>
            <Link to="/Campaign" reloadDocument='true'>
              <button className="btn btn btn-dark btn-lg ">RULES</button>
            </Link>
          </div> 
          </div>
        </div>

        {/*
      <div className="container   pt-4">
      <h2>Chat-Bot Page</h2>
      <img src=""></img>
        <p>Learn the basics of the Game by asking some questions</p>
        <Link to="/Help">
        <button className="btn btn-outline-dark btn-lg">
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
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

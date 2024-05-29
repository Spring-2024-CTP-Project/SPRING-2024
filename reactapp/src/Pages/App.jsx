import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/navbar.jsx";
import Footer from "../Components/footer.jsx";
import "./index.css";
import wizard from "../assets/wizard.png";
import campaign from "../assets/Campaign.jpg";

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
                This app is meant a short Work In Progress Demo meant to show
                the capabilities of Large Language Models in the context of
                story telling and Image generation!!
              </h4>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <div className="  container-fluid  ">
        <h1></h1>

        <div className="row row-cols-lg-2">
          <div className=" container  my-2 gx-3 background">
            <h2>Character Page</h2>
            <div className="container-fluid ">
              <img
                src={wizard}
                className="bg-image rounded mx-auto d-block"
                width={"300px"}
              ></img>
            </div>

            <p className="h5 pt-3">
              Create and store the characters for the campaigns you will use
            </p>
            <Link to="/CharacterPage">
              <button className="btn btn-dark btn-lg">Character Page</button>
            </Link>
          </div>




          <div className="container background my-2 gx-3">
            <h2>Campaign Page</h2>
            <div className="container-fluid  ">
              <img
                src={campaign}
                className="bg-image rounded  mx-auto d-block"
                width={"300px"}
              ></img>
            </div>
            <p className="h5 pt-3">
              Create a demo campaign to learn the basics of the Game
            </p>
            <Link to="/Campaign">
              <button class="btn btn btn-dark btn-lg ">Campaign</button>
            </Link>
          </div>
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
      <Footer></Footer>
    </div>
  );
}

export default App;

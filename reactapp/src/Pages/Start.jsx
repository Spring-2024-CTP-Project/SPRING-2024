import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../Components/footer";
import Spinner from "react-bootstrap/esm/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";


export default function Start() {
  const location = useLocation();
  const title = location.state;
  console.log(title)

  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [campaigns, setCampaigns] = useState([{}]);
  const [generation, setGeneration] = useState(null);
  
  const fetchCampaign = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);

  };


 const handleInput = (e) =>{
  e.preventDefault()
  const value= e.target.value;
  setMessages(value)
  console.log(messages)

 }

 const newState = {
    ...location.state,
    log:messages
  };

  console.log("NEW STATE: ", newState)

  const send = async () => {

   
    try {
      setShowModal(true);
      

      const response = await fetch("http://127.0.0.1:8080/Start_campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newState),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        setShowModal(false);
        alert("SENT T0 BACKEND!");
        setGeneration(data)

      } else {
        setShowModal(false);
        alert("Failed to add Campaign. Please try again later.");
      }
    } catch (error) {
      setShowModal(false);
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }

    console.log("DONE");
  };

  const handleSubmit = () => {
    send();
  };

  useEffect(() => {
    fetchCampaign();
  }, []);


  return (
    <div className="">
      <Navbar />
      <div className="p-5 text-center mask rounded-3">
          <div className="container  ">
            <div className="d-flex justify-content-center align-items-center h-100 text-white">
              <div className="">
                <h1 className="mb-3">Here you can create Story outlines for your campaigns</h1>
                    <hr></hr>
                    <h3 className="background">
                        It will include the the characters in your campaigns and your description
                    </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid text-black message ">
            TITLE: 
            <div className="container-fluid">

            {JSON.stringify(newState.title.props.title)}
            </div>
           
        </div>
      <div className=" container-fluid d-flex my-4 box">
      
        <div className="container-fluid background ">
        <div className="container">
           
        </div>
          <div className="row canvas"></div>
          <div className="container-fluid">

           
            <input className="input message" type="text" onChange={handleInput} placeHolder="What do you want to include in the campaign?"></input>
            <button className="btn btn-btn btn-dark btn-lg" onClick={handleSubmit}>
         GENERATE
         </button>

       

          </div>
          
        
         
         
        

        </div>
        
      </div>

      <div className="container mask card1-outline ">
        <div className="container-fluid  text-white"><h2> OUTLINE</h2></div>
        <div className="rest text-white">
        {generation}
        </div>
          

        </div>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>GENERATING</Modal.Title>
      </Modal.Header>
      <Modal.Body> 
        <div className="container-fluid"> Loading...
        <Spinner animation="border" />
        <div> </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        
      </Modal.Footer>
    </Modal>
      <Footer></Footer>
    </div>
  );
}

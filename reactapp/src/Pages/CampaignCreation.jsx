import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { INITCAMPAIGN } from "../Components/Util";

export default function CampaignCreation() {
  const [characters, setCharacters] = useState([{}]);
  const [campaign, setCampaign] = useState(INITCAMPAIGN,);

  console.log(campaign);
  
  //#########################################################
  //handles change of the various fields
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === "characters") {
      console.log("Adding to Character Array");
      if (checked) {
        // If the checkbox is checked, add the character to the array
        setCampaign({
          ...campaign,
          [name]: [...campaign[name], value],
          date: new Date().toLocaleDateString(),
        });
      } else {
        // If the checkbox is unchecked, remove the character from the array
        setCampaign({
          ...campaign,
          [name]: campaign[name].filter((char) => char !== value),
          date: new Date().toLocaleDateString(),
        });
      }
    } else {
      setCampaign({
        ...campaign,
        [name]: value,
        date: new Date().toLocaleDateString(),
      });
    }
  };



  //############################################
  //Handles submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTING....")
    const { name, value } = e.target;

    if (name === "add_camapign") {
      if (
        campaign.title.trim() === "" ||
        campaign.characters.includes(null) ||
        campaign.description.trim() === "null"
      ) {
        alert("PLEASE FILL IN ALL REQUIRED FIELDS");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8080/add_campaign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campaign),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Campaign added successfully!");
          console.log("Response data:", data);
          setCampaign(INITCAMPAIGN);
          console.log(campaign);
        } else {
          alert("Failed to add Campaign. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    }
    console.log("DONE")
  };



  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/users"); // port to python server
      setCharacters(response.data); //stores characters that are fetched
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className=" ">
      <Navbar></Navbar>
      <div className="container background my-3">
        <form className="pt-3 ">
          <label className="label">Enter the Name of this Campaign</label>
          <input
            className="mx-1 form-control-lg row container"
            name="title"
            type="text"
            value={campaign.name}
            onChange={handleChange}
          ></input>

          <div className="container pt-3">
            <label className="label">
              Choose the Characters for you want to include in the Campaign!
            </label>
          </div>

          <div className="container">
            {characters.map((character, index) => (
              
              <div
                className="container-fluid"
                key={index}
              >
<label className="corm-check-label"> {character.Name}</label>
                <div className="container"> 
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="characters"
                  value={character.Name}
                  onChange={handleChange}
                ></input>
                </div>
                 
                {console.log(character.Name)}
               
               
              </div>
            ))}
          </div>

          <div className="container pt-3">
            <label className="label">
              Add a description that indicates what the main goal of the
              adventure will be about
            </label>
          </div>

          <div className="container row">
            <input
              type="text"
              name="description"
              className="form-control-lg"
              onChange={handleChange}
              value={campaign.description}
            ></input>
          </div>
        </form>
      </div>
     
      <button name="add_camapign" className="btn btn-dark my-3" onClick={handleSubmit}>
        
        ADD CAMPAIGN
      </button>
      
      <Footer> </Footer>
      
    </div>
    
  );
}

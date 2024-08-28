import React from "react";
import { useEffect, useState, useContext } from "react";
import "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { INITCHARACTER, CHARCHECK } from "./Util";
import "./components.css";
import Spinner from "react-bootstrap/esm/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Modal";
import Dice from "../assets/Dice.jpeg";
import Logo from "../assets/logo2.jpg";

export default function Charactersheet() {
  const [data, setData] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [character, setCharacter] = useState(INITCHARACTER);
  console.log(character);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "generate") {
      if (
       CHARCHECK(character) //  function that checks if the necessary fields have been filled in
      ) {
        alert("PLEASE FILL IN ALL REQUIRED FIELDS");
        return;
      }

      try {
        setShowModal(true);
        const response = await fetch("http://127.0.0.1:8080/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(character),
        });

        const data = await response.json();
        if (response.ok) {
          setShowModal(false);
          alert("Generated succesfully!");
          console.log("Response data:", data);

          setCharacter({
            ...character,
            background: data[0],
            images: data[1],
          }),
            //setCharacter(INITCHARACTER);
            console.log(character);
        } else {
          setShowModal(false)
          alert("Failed to Generate. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        setShowModal(false)
        alert("An error occurred. Please try again later.");
      }
    }

    if (name === "add") {
      if (
        CHARCHECK(character) //  function that checks if the necessary fields have been filled in
      ) {
        alert("PLEASE FILL IN ALL REQUIRED FIELDS");
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8080/process_character",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(character),
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert("Character added successfully!");
          console.log("Response data:", data);
          setCharacter(INITCHARACTER);
          console.log(character);
        } else {
          alert("Failed to add character. Please try again later.");
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
        setShowModal(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let temp = 0;
    if (name === "characterClass") {
      switch (value) {
        case "Fighter":
          temp = 10;
          break;
        case "Paladin":
          temp = 10;
          break;
        case "Cleric":
          temp = 8;
          break;
        case "Ranger":
          temp = 10;
          break;
        case "Wizard":
          temp = 6;
          break;
        case "Rogue":
          temp = 8;
          break;
        case "Druid":
          temp = 8;
          break;
        case "Warlock":
          temp = 8;
          break;
        case "Barbarian":
          temp = 12;
          break;
        case "Bard":
          temp = 8;
          break;
        default:
          temp = 0; // Default hitpoints if no class matches
      }

      setCharacter({
        ...character,
        [name]: value,
        hitpoints: (temp += +[character.modifiers[4]]), // 'hitpoints' should be a string if it's a field name
        proficiency: 2,
      });
    } else {
      setCharacter({
        ...character,
        [name]: value,
        proficiency: 2,
      });  
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const newAbilities = [...character.points]; // Copy the points array
    const newmods = [...character.modifiers]; //copies the empty modifiers array
    
    for (let i = 0; i < newAbilities.length; i++) {
      if (newAbilities[i] === null) {
        newAbilities[i] = Math.floor(Math.random() * (18 - 3 + 1)) + 3;
        
        //assigns the modifiers
        if (newAbilities[i] <= 3) {
          newmods[i] = -4;
        } else if (newAbilities[i] <= 5) {
          newmods[i] = -3;
        } else if (newAbilities[i] <= 7) {
          newmods[i] = -2;
        } else if (newAbilities[i] <= 9) {
          newmods[i] = -1;
        } else if (newAbilities[i] <= 11) {
          newmods[i] = 0;
        } else if (newAbilities[i] <= 13) {
          newmods[i] = 1;
        } else if (newAbilities[i] <= 15) {
          newmods[i] = 2;
        } else if (newAbilities[i] <= 17) {
          newmods[i] = 3;
        } else if (newAbilities[i] <= 19) {
          newmods[i] = 4;
        } else {
          newmods[i] = 5;
        }
        
        if(i===4)
          {
             console.log("CURRENT CON MOD:", newmods[i])

            setCharacter({...character, hitpoints: (character.hitpoints += +[newmods[i]]) })
          }

          setCharacter({ ...character, points: newAbilities,  modifiers: newmods }); // Update the state after the loop

      } else {
        console.log("Error: already has a value");
      }
    }
    
  };

  useEffect(() => {}, []);

  return (
    <div className="container background ">
      <div className="navbar-brand brand d-flex">
        <img src={Logo} width={"40px"} className="bg-image rounded"></img>
      </div>
      <h1 className="">
        Create your character and save them for your campaign 
      </h1>
      <hr></hr>
        <form className="form-outline ">
          <div className="container-fluid">
            <label className="character-name"> Enter your Characters Name</label>
            <input
              type="text"
              className="mx-1 form-control-lg row container "
              name="name"
              value={character.name}
              onChange={handleChange}
            ></input>
          </div>


          {/* LEFT HAND SECTION // */}
          
          <div className="col pt-3">
            <label className="label">
              {" "}
              Proficiency: + {character.proficiency}
            </label>
          </div>

          <div className="row">
            <div className="container col-lg-6">
          <div className="section my-5">


          <div className="mb-3 row">
          <label className="col-sm-5 label"> Character Race:</label>
          <div className="col-sm-5">
            <select
              id="race"
              name="race"
              className="form-select"
              value={character.race}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Human">Human</option>
              <option value="Kobold">Kobold</option>
              <option value="Elf">Elf</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Orc">Orc</option>
              <option value="Fairy">Fairy</option>
            </select>
          </div>
        </div>

              <div className="mb-3 row">
                <label className=" col-sm-5 label "> 
                  Character Allignment:
                  </label>
                  <div className="col-sm-5"> <select
                    name="allignment"
                    className="form-select"
                    value={character.allignment}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Neutral">Neutral</option>
                    <option value="Lawful Neutral"> Neutral Good</option>
                    <option value="Nuetral Evil"> Nuetral Evil</option>
                    <option value="Lawful Nuetral"> Lawful Nuetral</option>
                    <option value="Lawful Good"> Lawful Good</option>
                    <option value="Lawful Evil"> Lawful Evil</option>
                    <option value="Chaotic Good"> Chaotic Good</option>
                    <option value="Chaotic Nuetral"> Chaotic Nuetral</option>
                    <option value="Chaotic Evil"> Chaotic Evil</option>
                  </select>

                  </div>
              </div>

              <div className="mb-3 row">
                <label className=" col-sm-5 label ">
                 Character Class:
                  </label>

                  <div className="col-sm-5">
                  <select
                    name="characterClass"
                    className=" form-select"
                    value={character.characterClass}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Paladin">Paladin</option>
                    <option value="Monk">Monk</option>
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Ranger">Ranger</option>
                    <option vlaue="Wizard">Wizard</option>
                    <option vlaue="Rogue">Rogue</option>
                    <option vlaue="Druid">Druid</option>
                    <option vlaue="Warlock">Warlock</option>
                    <option vlaue="Barbarian">Barbarian</option>
                  </select>
               
                  </div>
                 
              </div>

          </div>
          

              <div className="container d-flex my-2 row">
                <label className="label">
                  Weapons (seperate by comma):
                  <input
                    type="text"
                    name="weapons"
                    value={character.weapons}
                    className=" form-control container "
                    onChange={handleChange}
                  ></input>
                </label>
              </div>

              <div className="container d-flex my-5 row">
                <label className="label">
                  Equipment (seperate by comma)
                  <input
                    type="text"
                    name="items"
                    value={character.items}
                    className="my-2  form-control container "
                    onChange={handleChange}
                  ></input>
                </label>
              </div>
            </div>


            {/* RIGHT HAND SIDE */}


            <div className="container col-md-6 my-5">

            <div className="container hp-box">
            <div className=" d-flex justify-content-center ">
                HP: {character.hitpoints}
              </div>
            </div>
              <label className="label my-3">Character Traits</label>
              <input
                type="text"
                className="mx-1 form-control row container-fluid "
                name="traits"
                value={character.traits}  
                onChange={handleChange}
              ></input>

              <label className="label my-3">Bonds</label>
              <input
                type="text"
                className="mx-1 form-control srow container-fluid "
                name="bonds"
                value={character.bonds}
                onChange={handleChange}
              ></input>

          <label className="label  my-3">
            Add a little visual description to this character for its visual
            generation (eg. "Blonde Hair", "Large Nose")
          </label>
         
            <input
              type="text"
              name="description"
              className="mx-1 form-control row container-fluid"
              value={character.description}
              onChange={handleChange}
            ></input>
            </div>


          </div>
          <hr></hr>


          <div className="container my-5">
            <label className="label ">
              Now roll the dice to get points for your attributes:
              <button
                value={character.points}
                className="btn btn-dark mx-1"
                onClick={handleClick}>
                ROLL
                <img
                  src={Dice}
                  width={"40px"}
                  className="bg-image rounded mx-1"
                ></img>
              </button>
            </label>
          </div>




        </form>

        <div className="container col my-2 d-flex">
          <label className="container justify-content-start attributes">
            STR: <span className="mx-2">{character.points[0]}</span>
            <div className="container btn btn-dark">
              {character.modifiers[0]}
            </div>
          </label>
          <label className="container justify-content-start attributes">
            INT: <span className="mx-2">{character.points[1]}</span>
            <div className="container btn btn-dark">
              {character.modifiers[1]}
            </div>
          </label>
          <label className="container justify-content-start attributes">
            WIS: <span className="mx-2">{character.points[2]}</span>
            <div className="container btn btn-dark">
              {character.modifiers[2]}
            </div>
          </label>
          <label className="container justify-content-start attributes">
            DEX: <span className="mx-2">{character.points[3]}</span>
            <div className="container btn btn-dark">
              {character.modifiers[3]}
            </div>
          </label>
          <label className="container justify-content-start attributes">
            CON: <span className="mx-2">{character.points[4]}</span>
            <div className="container btn btn-dark">
              {character.modifiers[4]}
            </div>
          </label>
          <label className="container justify-content-start attributes">
            CHA: <span className="mx-2">{character.points[5]}</span>
            <div className="container btn btn-dark">
              {character.modifiers[5]}
            </div>
          </label>
        </div>

        <div className="container-fluid mx-3 my-5 row">
          <label className="label">
            Include a character background prompt (eg. "Future Pirate King" , " A Banished Fire
            Prince")
          </label>
          <input
            type="text"
            name="prompt"
            className="form-control-lg my-3"
            value={character.prompt}
            onChange={handleChange}
          ></input>
        </div>
      
       

     
      <button name="generate" className="btn btn-dark" onClick={handleSubmit}>
          GENERATE
        </button>
        <br></br>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>GENERATING</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="container d-flex justify-content-center">
            <Spinner animation="border mx-4" /> Loading...
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleCloseModal}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

      
      <label className="label "> </label>
      <div className="container d-flex my-2 row">
      <div className="container col-sm-4">
           
          </div>
        <div className="container d-flex">
          <div>
          <h1>Backstory</h1>
          <p className="label textBody">{character.background } </p> 
          </div>
        </div>
        <img
              src={character.images}
              className="bg-image rounded d-block"
              width={"350px"}
            ></img>
      </div>

      <button name="add" className="btn btn-dark" onClick={handleSubmit}>
        ADD CHARACTER
      </button>

    </div>
  );
}

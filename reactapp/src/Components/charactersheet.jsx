import React from "react";
import { useEffect, useState, useContext } from "react";
import "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import "./components.css";
import Card from "./card";
import Spinner from "react-bootstrap/esm/Spinner";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Modal";
import Dice from "../assets/Dice.jpeg"
import Logo from "../assets/logo2.jpg"

export default function Charactersheet() {

  
  const [data, setData] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [character, setCharacter] = useState({
    name: "",
    race: "",
    characterClass: "",
    weapons: [null],
    background: "",
    allignment: "",
    points: [null, null, null, null, null, null],
    modifiers: [0],
    images: [null],
    description: '',
    hitpoints: 0,
  });
  console.log(character);


  const initialCharacter = {
    name: "",
    race: "",
    characterClass: "",
    weapons: [null],
    background: "",
    allignment: "",
    points: [null, null, null, null, null, null],
    modifiers: [0],
    images: [null],
    description: '',
    hitpoints: 0,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    
if(name==='generate'){
  
  if (character.name.trim() === "" ||
    character.race.trim() === "" ||
    character.characterClass.trim() === "" ||
    character.weapons.includes(null),
    character.allignment.trim() === "" || character.points.includes(null))
 {
  alert("PLEASE FILL IN ALL REQUIRED FIELDS");
  return;
}

try {
  const response = await fetch("http://127.0.0.1:8080/generate", setShowModal(true), {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify(character),
    
  });
  setTimeout(()=> setLoading(false), 3300)
  
  const data= await response.json();
  if (response.ok) {
    alert("Generated succesfully!");
    console.log('Response data:', data)

    
    setCharacter({
      ...character,
      background: (data[0]),
      images: (data[1])
    }),
      
    //setCharacter(initialCharacter);
    console.log(character)
  } else {
    alert("Failed to Generate. Please try again later.");
  }
} catch (error) {
  console.error("Error:", error);
  alert("An error occurred. Please try again later.");
}}

if(name==='add')
  {
     
  if (character.name.trim() === "" ||
  character.race.trim() === "" ||
  character.characterClass.trim() === "" ||
  character.weapons.includes(null),
  character.allignment.trim() === "" || character.points.includes(null))
{
alert("PLEASE FILL IN ALL REQUIRED FIELDS");
return;
}

try {
const response = await fetch("http://127.0.0.1:8080/process_character", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(character),
});
const data= await response.json();
if (response.ok) {
  alert("Character added successfully!");
  console.log('Response data:', data)
  setCharacter(initialCharacter);
  console.log(character)

} else {
  alert("Failed to add character. Please try again later.");
}
} catch (error) {
console.error("Error:", error);
alert("An error occurred. Please try again later.");
}}

  
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
        'hitpoints': temp+= +[character.modifiers[0]]// 'hitpoints' should be a string if it's a field name
      
      });
       

    } else {
      setCharacter({
        ...character,
        [name]: value,
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const newAbilities = [...character.points]; // Copy the points array
    const newmods=[...character.modifiers];
    for (var i = 0; i < newAbilities.length; i++) {
      if (newAbilities[i] === null) {
        newAbilities[i] = Math.floor(Math.random() * (18 - 3 + 1)) + 3;
        
        //assigns constitution modifier
        switch (newAbilities[4])
          {
            case 2,3:
             newmods[0] =-4;
              break;
            case 4,5: 
            newmods[0]=-3
              break;
            case 6,7: 
            newmods[0]=-2
              break;
              case 8,9 : 
              newmods[0]=-1
              break;
              case 10,11: 
              newmods[0]=0
              break;
              case 12,13: 
              newmods[0]=1
              break;
              case 14,15: 
              newmods[0]=2
              break;
              case 16,17: 
              newmods[0]=3
              break;
              case 18,19: 
              newmods[0]=4
              break;
              case 20,21: 
              newmods[0]=5
              break;

              default:
                newmods[0] = 0;
              break;


          }
      } else {
        console.log("Error: already has a value");
      }
    }

    setCharacter({ ...character, points: newAbilities, modifiers: newmods }); // Update the state after the loop
  };

  useEffect(() => {
  }, []);

  return (
    <div className="container background">
      
      <div className="navbar-brand brand d-flex"> 
      <img src ={Logo}
      width={"40px"
      } 
      className="bg-image rounded"
      ></img>
      </div>
      <h1 className="">Create your character and save them for your campaign</h1>
      <hr></hr>
      <div className="row">

      
      
      <form className="col-lg-9 container ">
        <div className=" container d-flex my-3">
          <label className="label">
            Enter your Characters Name:
            <input
              type="text"
              className="mx-1 input"
              name="name"
              value={character.name}
              onChange={handleChange}
            >
            </input>
          </label>
        </div>

        <div className="container d-flex my-2">
          <label className="label ">
            Pick a Race for them:
            <select
              name="race"
              className="mx-1 input"
              value={character.race}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Human">Human</option>
              <option value="Kobold">Kobold</option>
              <option value="Elf">Elf</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Orc">Orc</option>
              <option vlaue="Fairy">Fairy</option>
            </select>
          </label>
        </div>

        <div className="container d-flex my-2">
          <label className="label ">
            Pick an alignment: 
            <select
              name="allignment"
              className="mx-1 input"
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
          </label>
        </div>

        <div className="container d-flex my-2">
          <label className="label ">
            Pick a Character Class for them:
            <select
              name="characterClass"
              className="mx-1 input"
              value={character.characterClass}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Paladin">Paladin</option>
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
          </label>
        </div>

        <div className="container d-flex my-2">
          <label className="label ">
            Give yourself some weapons (seperate by comma):
            <input
              type="text"
              name="weapons"
              value={character.weapons}
              className="mx-2 input"
              onChange={handleChange}
            ></input>
          </label>
        </div>

       



        <div className="container my-5">
            <label className="label ">
            Now roll the dice to get points for your attributes:
              <button
              
                value={character.points}
                className="btn btn-dark mx-1"
                onClick={handleClick}
              >
                ROLL
                
              <img
              src={Dice}
              width={"40px"}
              className="bg-image rounded mx-1">
              </img>
              </button>
              </label>
            </div>


        </form>

        <div className="container col my-2 d-flex">
          <label className="container justify-content-start attributes">
            STR: 
            <div className="container btn btn-dark">{character.points[0]}</div>
          </label>
          <label className="container  justify-content-start">
            INT: 
            <div className="container btn btn-dark">{character.points[1]}</div>

          </label>
          <label className="container  justify-content-start">
            WIS: 
            <div className="container btn btn-dark">{character.points[2]}</div>
          </label>
          <label className="container  justify-content-start">
            DEX: 
            <div className="container btn btn-dark">{character.points[3]}</div>
          </label>
          <label className="container justify-content-start">
            CON:
            <div className="container btn btn-dark">{character.points[4]}</div>
          </label>
          <label className="container  justify-content-start">
            CHA:
            <div className="container btn btn-dark">{character.points[5]}</div>

          </label>
        </div>

        

        <br></br>
        <div className="container d-flex my-3 row">
          <label className="label">
            Now add a little visual description to this character for its visual generation (eg. age and gender)
          </label>
          <div className="container-fluid row">
            <input
              type="text"
              name="description"
              className="input"
              value={character.description}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        
        </div>

        <div className="container">
        <button name="generate" className="btn btn-dark" onClick={handleSubmit}>
          GENERATE
        </button>

        <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>GENERATING</Modal.Title>
      </Modal.Header>
      <Modal.Body>Loading...

      <Spinner animation="border" />
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

        </div>
        
        <div className="container d-flex my-2 row">
          <label>
            Background:
          </label>
          <div className="container-fluid d-flex row">
              <p className="label">
                {character.background}
              </p>
              <div >
                <img src={character.images} 
                 className="bg-image rounded mx-auto d-block"
                 width={"350px"}></img>
              </div>
          </div>
        </div>

      

        <button name="add" className="btn btn-dark" onClick={handleSubmit}>
          ADD CHARACTER
        </button>
      
      
    </div>
  );
}

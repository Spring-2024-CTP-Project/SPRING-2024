import React from "react";
import { useEffect, useState, useContext } from "react";
import 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import "./components.css";
import Popup from "reactjs-popup";

export default function Charactersheet() {

    const [data, setData] = useState([{}]);
    const [character, setCharacter] = useState({name:"", race:"", characterClass:"", weapons:[null], background:"", allignment:"", points:[null,null,null,null,null,null], images:[null], hitpoints: 0} )
    const [description, setDescription] = useState("");
    console.log(description);

    const initialCharacter = {
      name: '',
      race: '',
      characterClass: '',
      weapons: [null],
      background: '',
      allignment: '',
      points: [null, null, null, null, null, null],
      images: [null],
      hitpoints: 0
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(character.name.trim()==='' || character.race.trim()===''|| character.characterClass.trim()==='' || character.weapons.includes(null), character.allignment.trim()==='' || character.points.includes(null ) || character.hitpoints.trim()===0)
        {

            alert("PLEASE FILL IN ALL REQUIRED FIELDS");
            return;
        }



    try {
      const response = await fetch('http://127.0.0.1:8080/process_character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)

      });
    
      if (response.ok) {
        alert('Character added successfully!');
        
        // Clear form fields after successful submission
        setCharacter(initialCharacter);
        setDescription('');

      } else {
        alert('Failed to add character. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
    };

    const handleChange = (e) =>{
        const { name, value} = e.target;
       
        if(name === 'description')
          {
            setDescription(value)
          }
          else if(name=== 'race'){

            




            setCharacter({
            ...character,
            [name]: value,
        })}
        
    } 

    const handleClick = (e) =>
    {     
        
        e.preventDefault(); // Prevent default form submission behavior
        const newAbilities = [...character.points]; // Copy the points array
        for (var i = 0; i < newAbilities.length; i++) {
          if (newAbilities[i] === null) {
            newAbilities[i] = Math.floor(Math.random() * (20 - 3 + 1)) + 3;
          } else {
            console.log("Error: already has a value");
          }
        }

        setCharacter({ ...character, points: newAbilities }); // Update the state after the loop
    };

    useEffect(() => {
        fetch("/characters").then(
          res => res.json()
         ).then(
           data => {
             setData(data)
             console.log(data)
           }
         )
       }, [] )

  return (
    <div className="container background" >
      <h2>Create your character and save them for your campaign!!</h2>
      <form>

        <div className="container d-flex my-2">
        <label>
          Enter your Characters Name: 
          <input type="text" 
          className="mx-1"
          name="name"
          value={character.name}
          onChange={handleChange}>
          
          </input>
        </label>
        </div>
        
        <div className="container d-flex my-2">
    
        <label>
          Pick a Race for them:
          <select
             name="race"
             className="mx-1"
             value={character.race}
             onChange={handleChange}
          >
            <option value=""></option>
            <option value="Human">Human</option>
            <option value="Kobol" >Kobol</option>
            <option value="Elf" >Elf</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Orc">Orc</option>
            <option vlaue="Fairy">Fairy</option>
          </select>
        </label>
        </div>
        
        <div className="container d-flex my-2">
        <label>
            Pick an alignment
            <select
              name="allignment"
              className="mx-1"
              value={character.allignment}
              onChange={handleChange}
              >
            <option value="" ></option>
            <option value="Neutral" >Neutral</option>
            <option value="Lawful Neutral" >  Neutral Good</option>
            <option value="Chaotic Neutral" > Nuetral Evil</option>
            <option value="Lawful Nuetral"> Lawful Nuetral</option>
            <option value="Lawful Good"  > Lawful Good</option>
            <option value="Lawful Evil"> Lawful Evil</option>
            <option value="Chaotic Good"> Chaotic Good</option>
            <option value="Chaotic Nuetral" > Chaotic Nuetral</option>
            <option value="Chaotic Evil" > Chaotic Evil</option>
          </select>
        </label>
        </div>

        <div className="container d-flex my-2">
        <label>
          Pick a Character Class for them:
          <select
            name="characterClass"
            className="mx-1"
            value={character.characterClass}
            onChange={handleChange}>
            <option value="" ></option>
            <option value="Paladin" >Paladin</option>
            <option value="Bard">Bard</option>
            <option value="Cleric" >Cleric</option>
            <option value="Fighter" >Fighter</option>
            <option value="Ranger" >Ranger</option>
            <option vlaue="Wizard" >Wizard</option>
            <option vlaue="Rogue" >Rogue</option>
            <option vlaue="Druid" >Druid</option>
            <option vlaue="Warlock">Warlock</option>
          </select>
        </label>
        </div>

        <div className="container d-flex my-2">
            <label>Give yourself some weapons (seperate by comma):
                <input type="text" name="weapons" value={character.weapons} className="mx-2" onChange={handleChange}>
                </input>
            </label>
        </div>

        <div className="container d-flex my-2">
            <label>Now roll the dice to get points for your attributes:
             <div className="container" >
                <button style={{borderColor:"red"}} value={character.points} className="btn btn-dark" onClick={handleClick} > ROLL</button>
             </div>
            </label>
        </div>
      
            <div className="container row row-col-lg-1 my-2">
            <label className="container d-flex justify-content-start">STR: {character.points[0]}</label>
            <label  className="container d-flex justify-content-start">INT: {character.points[1]}</label>
            <label  className="container d-flex justify-content-start">WIS: {character.points[2]}</label>
            <label className="container d-flex justify-content-start">DEX: {character.points[3]}</label>
            <label className="container d-flex justify-content-start">CON: {character.points[4]}</label>
            <label className="container d-flex justify-content-start">CHA: {character.points[5]}</label>
            </div>
            <br></br>
    <div className="container d-flex my-2 row">
        
      <label>
        Now add a little visual description to this character and our model will make them come to life
      </label>
      <div className="container row">
      <input type="text" name="description"value={description} onChange={handleChange}></input>
      </div>
      
      </div>

      <button className="btn btn-dark" onClick={handleSubmit}>
        GENERATE
      </button>
       
      </form>
    </div>
  );
}

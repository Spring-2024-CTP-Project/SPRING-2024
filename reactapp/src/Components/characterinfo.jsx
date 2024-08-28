import { useEffect, useState } from "react";
import axios from "axios";
import "./components.css";
import parchment from "../assets/parchment.jpg";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Card from "./charcard";

function Characterinfo() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);



  
  
  //FETCHES information from backend using axios
  const fetchCharacters = async () => {
    try{
      
      const response = await axios.get("http://127.0.0.1:8080/users") // port to python server
      setCharacters(response.data);//stores characters that are fetched
    } catch (error){
      console.error(error)
    } finally {
      console.log("CHARACTERS:", characters)
      setLoading(false)
    }
    
    };

  const handleCharacterClick = (index) => {
    setSelectedCharacterIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedCharacterIndex(null);
  };

  useEffect(() =>
    //useEffect renders functions
    {      
      
      fetchCharacters();
    }, []);
   

  return (
    <div>
      <div className="container-xxl ">
        <div className="container my-3"></div>
        {/* conditional renderning */}
        { loading ? (  <h1 className="background my-4 ">
    <div className="container d-flex justify-content-center">
    <Spinner animation="border" />
    </div>
  </h1> ) : characters.length === 0 ? (
  <div className=" container card bg-dark ">
  <div className="col card-body ">
    <h3 className=" text-white"> NO CHARACTERS</h3>
  </div>
  <p className="text-white">Add some below</p>
</div>
) : (
  <div className="container-fluid row row-cols-md-3 gx-4 ">
    {characters.map((character, index) => (
      <div className="" key={index}>
      
        {/* Added col class to control column width */}
        <Modal
          show={selectedCharacterIndex === index}
          onHide={handleCloseModal}
          dialogClassName="custom-modal " >
          <Modal.Header closeButton className="">
            <Modal.Title id="" className="">
              {character.Name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="background ">
            <div className="row">
              <div className="characterClass">
                Class: {character.Class}
              </div>
              <div className="race">Race: {character.Race}</div>
              <div className="rest">
                Allignment: {character.Allignment}
                <div>Weapons: {character.Weapons}</div>
                <div>Hit-Points: {character.Hitpoints}</div>
                <div>Proficency: {character.Prof}</div>
                <hr></hr>
              </div>

              <div className="col">
                <div className="">
                  Strength: {character.AttributePoints[0]}
                </div>
                <div>Intelligence: {character.AttributePoints[1]}</div>
                <div>Wisdom: {character.AttributePoints[2]}</div>
                <div>Dexterity: {character.AttributePoints[3]}</div>
                <div>Constitution: {character.AttributePoints[4]}</div>
                <div>Charisma: {character.AttributePoints[5]}</div>
              </div>

              <div className="col">
              <div className="">  {character.Modifiers[0]}</div>
              <div className="">  {character.Modifiers[1]}</div>

              <div className="">  {character.Modifiers[2]}</div>
              <div className="">  {character.Modifiers[3]}</div>
              <div className="">  {character.Modifiers[4]}</div>
              <div className="">  {character.Modifiers[5]}</div>
              </div>

              <div className="col-sm-6 hp-box">
                <div>Equipement: {character.Items}</div>
              </div>
              <hr></hr>
              <div className="pt-3 ">
                <div className="container">
                  <h3 className="rest">Background:</h3>
                </div>

                {character.Background}
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Card
          character={character}
          onClick={() => handleCharacterClick(index)}
        ></Card>
      </div>
    ))}
  </div>
)  }
        
      </div> 
    </div>
  );
}

export default Characterinfo;

import { useEffect, useState } from 'react'
import axios from "axios"
import './components.css'
import parchment from "../assets/parchment.jpg"
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Card from './card';

function Characterinfo() {
  const [characters, setCharacters] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);

  const [show, setShow] = useState(false);
  
  //FETCHES information from backend using axios
const fetchCharacters = async () => {
try{
  const response = await axios.get("http://127.0.0.1:8080") // port to python server
  setCharacters(response.data);//stores characters that are fetched
} catch (error){
  console.error(error)
}
};


const handleCharacterClick = (index) => {
  setSelectedCharacterIndex(index);
};

const handleCloseModal = () => {
  setSelectedCharacterIndex(null);
};


useEffect(() => //useEffect renders functions
{
  setTimeout(()=> setLoading(false), 3300)
  fetchCharacters()
}, [] )
if(loading)
  {
    return (
      
    <h1 className='background '>
     <Spinner animation="border" />

      </h1>)
  }

 

  return (
    <div>
   
    <div className='container-xxl '>
      <div className='container my-3 background'>
      <h1>YOUR CAMPAIGN CHARACTERS</h1>
      </div>
      

      <div className='container-fluid row row-cols-lg-3 gx-3'>
  {characters.map((character, index) => (
    <div className='col' key={index}> {/* Added col class to control column width */}
    <Modal
        show={selectedCharacterIndex === index}
        onHide={handleCloseModal}
        dialogClassName="custom-modal"
        >
       
        <Modal.Header closeButton>
          <Modal.Title id="">
            {character.Name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
        >
        
        Class: {character.Class}
        <div>
        Race: {character.Race} 
        </div>
        <div>
        Allignment: {character.Allignment}  
        </div>
        <div>
        Weapons: {character.Weapons} 
        </div>
        <hr></hr>
        
        <div className='pt-3'>
        Strength: {character.AttributePoints[0]} 
        </div>
        <div>
        Intelligence: {character.AttributePoints[1]} 
        </div>
        <div>
        Wisdom: {character.AttributePoints[2]} 
        </div>
        <div>
        Dexter: {character.AttributePoints[3]} 
        </div>
        <div>
        Constitution: {character.AttributePoints[4]} 
        </div>
        <div>
        Charisma: {character.AttributePoints[5]} 
        </div>

        <hr></hr>
          <div className='pt-3'> Background:
            {character.Background}</div>
         
        </Modal.Body>
      </Modal>


     <Card character={character}
     onClick={() =>handleCharacterClick(index)}></Card>
    </div>


  ))}
</div>
      </div>  
   

  </div>
      
  );
}

export default Characterinfo

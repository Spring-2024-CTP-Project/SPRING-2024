import { useEffect, useState } from 'react'
import axios from "axios"
import './components.css'

function Characterinfo() {
  const [characters, setCharacters] = useState([{}])

  //FETCHES information from backend using axios
const fetchCharacters = async () => {
try{
  const response = await axios.get("http://127.0.0.1:8080") // port to python server
  setCharacters(response.data);//stores characters that are fetched
} catch (error){
  console.error(error)
}
};

useEffect(() => //useEffect renders functions
{
  fetchCharacters()
}, [] )


  return (
    <div>
      
    <div className='container-xxl '>
      <div className='container pt-5 background'>
      <h1>YOUR CAMPAIGN CHARACTERS</h1>
      </div>
    
      <div className='container-fluid row row-cols-lg-3 g-2'>
  {characters.map((character, index) => (
    <div className='col' key={index}> {/* Added col class to control column width */}
      <div className='container my-2 background card bg-secondary' style={{ maxWidth: '30rem' }}> {/* Added style to control max width */}
        <img src="" className='card-img-top' alt="Character Image" />
        <div className='container card-body'>
          <div className='card-title container'>Name: {character.Name}</div>
          <p className="card-text">Background: {character.background}</p> {/* Changed class to className */}
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>Weapons: {character.Weapons}</li>
        </ul>
      </div>
    </div>
  ))}
</div>
      </div>  
   

  </div>
      
  );
}

export default Characterinfo

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
      
    <div className='container-xxl row px-'>
    <p>THE CHARACTERS</p>
    <div className=''>
      {characters.map((character, index) => (
        <div className='container my-2 mx-2 pt-2 background col' key={index}>
          <div className='container'>Name:{character.Name}: {character.Background} Weapon: {character.Weapons}</div>
        </div>
      ))}
    </div>
      </div>  
   

  </div>
      
  );
}

export default Characterinfo

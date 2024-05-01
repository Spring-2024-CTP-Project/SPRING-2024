import { useEffect, useState } from 'react'
import axios from "axios"
import './components.css'

function Characterinfo() {
  const [characters, setCharacters] = useState([{}])

const fetchCharacters = async () => {
try{
  const response = await axios.get("http://127.0.0.1:8080")
  setCharacters(response.data);
} catch (error){
  console.error(error)
}
};

useEffect(() =>
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
          <div className='container'>{character.Name}: {character.Background} Weapon: {character.Weapons}</div>
        </div>
      ))}
    </div>
      </div>  
   

  </div>
      
  );
}

export default Characterinfo

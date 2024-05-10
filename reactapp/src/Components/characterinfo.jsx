import { useEffect, useState } from 'react'
import axios from "axios"
import './components.css'

function Characterinfo() {
  const [characters, setCharacters] = useState([{}])
  const [loading, setLoading] = useState(true)

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
  setTimeout(()=> setLoading(false), 3300)
  fetchCharacters()
}, [] )
if(loading)
  {return <h1>LOADING...</h1>
  }


  return (
    <div>
      
    <div className='container-xxl '>
      <div className='container pt-5 background'>
      <h1>YOUR CAMPAIGN CHARACTERS</h1>
      </div>
    
      <div className='container-fluid row row-cols-lg-3 gx-3'>
  {characters.map((character, index) => (
    <div className='col' key={index}> {/* Added col class to control column width */}
      <div className='container my-2 background card bg-secondary' style={{ maxWidth: '30rem' }}> {/* Added style to control max width */}
        <img src={character.Images} className='card-img-top img-fluid img-thumbnail' style={{maxHeight: "30rem"}} ralt="Character Image" />
        <div className='container card-body'>
          <div className='card-title container'>Name: {character.Name}</div>
          <hr></hr>
          <div className=''>Weapons: {character.Weapons}</div>
        </div>
        <ul className='list-group list-group-flush'>
         
          <li className="list-group-item">Race: {character.Race} </li>
          <li className="list-group-item">Hit Points: {character.Hitpoints} </li>
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

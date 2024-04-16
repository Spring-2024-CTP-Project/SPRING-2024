import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [data, setData] = useState([{}])
  const [array, setArray] = useState([])
const fetchApi = async () => {

const response = await axios.get("http://127.0.0.1:8080/api/characters")

setArray(response.data.characters)
};


useEffect(() =>
{
  fetchApi()
}, [] )


  return (
      <div>
        <h1> AI DUNGEON MASTER</h1>
        
          Choose which characters you want to include in the campaign
          <br></br>
          {
          array.map((characters, index)=> (
            <ul>
            <li>{characters.Name}: {characters.Background}</li>   
            <br></br>
            </ul>
         
          ))

          }
       
      </div>
      
  )
}

export default App

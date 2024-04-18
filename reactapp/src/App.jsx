import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

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
      <div>
        <h1> AI DUNGEON MASTER</h1>
      </div>
      
  )
}

export default App

import {React,useEffect, useState} from "react";

function App(){

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
    },[])


    return(
        <div>

        </div>
    )
}

export default App

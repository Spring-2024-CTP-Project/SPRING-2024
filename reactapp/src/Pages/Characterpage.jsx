import {React} from "react"

import Characterinfo from "../Components/characterinfo.jsx"
import Charactersheet from "../Components/charactersheet.jsx"
import Navbar from "../Components/navbar.jsx"
function Characterpage(){
    return(
        <div>
        <Navbar></Navbar>
        <Characterinfo/>
        <Charactersheet/>
        </div>
        
        )
}



export default Characterpage
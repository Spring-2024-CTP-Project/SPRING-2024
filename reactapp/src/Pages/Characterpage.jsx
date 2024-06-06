import {React} from "react"

import Characterinfo from "../Components/characterinfo.jsx"
import Charactersheet from "../Components/charactersheet.jsx"
import Navbar from "../Components/navbar.jsx"
import Footer from "../Components/footer.jsx"
function Characterpage(){


    return(
        <div>
        <Navbar></Navbar>
        <div className="container my-3 background">
            <h1>CAMPAIGN CHARACTERS</h1>
        </div>
        <Characterinfo/>
        <div className="pt-5"></div>
        <Charactersheet/>
        <div className="pt-3"></div>
        <Footer></Footer>       
        </div>
       
        
        )
}



export default Characterpage
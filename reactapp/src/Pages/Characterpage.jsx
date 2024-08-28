import {React} from "react"
import Characterinfo from "../Components/characterinfo.jsx"
import Charactersheet from "../Components/charactersheet.jsx"
import Navbar from "../Components/navbar.jsx"
import Footer from "../Components/footer.jsx"
function Characterpage(){


    return(
        <div className="">
        <Navbar></Navbar>
      
        <div class=" background-image">
        <div className="container my-2 background">
            <h1>CAMPAIGN CHARACTERS</h1>
        </div>
        <Characterinfo/>
        <div className="pt-5"></div>
        <Charactersheet/>
        <div className="pt-3"></div>
        <Footer></Footer>       
        </div>
        </div>
       
       
        
        )
}



export default Characterpage
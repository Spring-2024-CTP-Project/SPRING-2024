import {React} from "react";
import Navbar from "../Components/navbar";
import "./index.css";

function Campaign(){
    return(
        
        <div className="">
            <Navbar></Navbar>
            <br></br>
            <div className=" container p-3 ">
                <div className="rows  background gy-3">

                <h2>
                    YOUR CAMPAIGNS 
                </h2>
                <div className="container card bg-secondary p-3 col ">
                    No Campaigns created...
                </div>

                <button className="btn btn-outline-dark btn-lg">
                    Start New
                </button>

                
                <div class>

                </div>

                </div>
                
            </div>
    

        </div>
        
        
        )
}







export default Campaign
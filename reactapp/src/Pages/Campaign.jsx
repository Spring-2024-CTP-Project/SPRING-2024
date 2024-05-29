import {React} from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import Campaigninfo from "../Components/campaigninfo";


import "./index.css";

function Campaign(){

    return(
       <div>
        <div className="">
            <Navbar></Navbar>
            <div className="p-5 text-center mask rounded-3">
        <div className="container  ">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">WELCOME TO DND.AI</h1>

              <h4 className="mb-3">
                Get into your campaigns!!
              </h4>
            </div>
          </div>
        </div>
      </div>
          <Campaigninfo></Campaigninfo>
          <div className="col my-3 btn btn-dark btn-lg">
                Start new Campaign
               </div>
        <Footer></Footer>
        </div>

        </div> 
        
        )
}







export default Campaign
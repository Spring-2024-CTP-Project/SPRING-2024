import { React } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import Campaigninfo from "../Components/campaigninfo";
import "./index.css";

function Campaign() {

  const handleClick = () => {};
  return (
    <div>
      <div className="">
        <Navbar></Navbar>
        <div className="p-5 text-center mask rounded-3">
          <div className="container  ">
            <div className="d-flex justify-content-center align-items-center h-100 text-white">
              <div className="">
                <h1 className="mb-3">WELCOME TO DND.AI</h1>
                <h4 className="mb-3">Generate story outlines for your campaign using the characters you created!!</h4>
              </div>
            </div>
          </div>
        </div>
        <div className=" container p-3 ">
          <div className="rows background gy-3">
            <h2>YOUR CAMPAIGNS</h2> 
            <Campaigninfo> </Campaigninfo>
          </div>
        </div>

        <div className=" container ">
            <Link to="/CampaignCreate" className="Link" >
          <div className="col my-3 btn btn-dark btn-lg">
            Start new Campaign
            </div>
            </Link>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Campaign;

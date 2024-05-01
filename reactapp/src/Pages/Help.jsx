import { React } from "react";
import Navbar from "../Components/navbar";
import './index.css'

export default function Help() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="background">
      <h1 >ASK OUR HELPFUL AI CHATBOT ANY DND QUESTION YOU MAY HAVE</h1>
      </div>
      <div>
        <textarea title="Enter Prompt Here"></textarea>
      </div>
    </div>
    
  );
}

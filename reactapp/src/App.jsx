import {React, useEffect, useState } from "react";
import {Link} from "react-router-dom";


function App() {

  return (
    <div>
      <h1>WELCOME TO DUNGEONS AND DRAGONS</h1>
      <div>
        <h2>Character Page</h2>
        <p>Create and store the characters for the campaigns you will use</p>
        <Link to="/CharacterPage">
          Character Page
        </Link>
      </div>

      <div>
        <h2>Campaign Page</h2>
        <p>Create a demo campaign to learn the basics of the Game</p>
        <Link to="/Campaign">
          Campaign
        </Link>
      </div>

      <div>
      <h2>Chat-Bot Page</h2>
        <p>Learn the basics of the Game by asking some questions</p>
        <Link to="/Help">
          Help
        </Link>
        </div>
      </div>
    
  );
}

export default App;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./components.css";

export default function Charactersheet() {
  const [characters, setCharacters] = useState([{}]);

  return (
    <div className="container background">
      <h2>Create your character and save them for your campaign!!</h2>
      <form>
        <label>
          Enter your Characters Name:
          <input type="text" name="name"></input>
        </label>
        <label>
          Pick a Race for them:
          <select>
            <option value="Human">Human</option>
            <option value="Kobol">Kobol</option>
            <option value="Elf">
              Elf
            </option>
            <option value="Dwarf">Dwarf</option>
          </select>
        </label>
        <label>
            Pick an alignment
            <select>
            <option value="True Neutral">Nuetral</option>
            <option value="Lawful Neutral"> Lawful Nuetral</option>
            <option value="Chaotic Neutral"> Chaotic Nuetral</option>
            <option value="True Neutral"> Ture Nuetral</option>
            <option value="Good">Good</option>
            <option value="Evil">
              Evil
            </option>
            <option value="Chaotic">Chaotic</option>

          </select>
        </label>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}

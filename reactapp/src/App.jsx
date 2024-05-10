import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}]);
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [weapons, setWeapons] = useState([]);
  const [background, setBackground] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const characterData = {
      Name: name,
      Race: race,
      Class: characterClass,
      Weapons: weapons.split(',').map(weapon => weapon.trim()), 
      Background: background
    };

try {
  const response = await fetch('http://127.0.0.1:5000/process_character', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(characterData)
  });

  if (response.ok) {
    alert('Character added successfully!');
    // Clear form fields after successful submission
    setName('');
    setRace('');
    setCharacterClass('');
    setWeapons([]);
    setBackground('');
  } else {
    alert('Failed to add character. Please try again later.');
  }
} catch (error) {
  console.error('Error:', error);
  alert('An error occurred. Please try again later.');
}
};
useEffect(() => {
  fetch("/characters").then(
    res => res.json()
   ).then(
     data => {
       setData(data)
       console.log(data)
     }
   )
 }, [] )
return (
<div>
  <h1>AI DUNGEON MASTER</h1>
  <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </label>
    <br />
    <label>
      Race:
      <input type="text" value={race} onChange={(e) => setRace(e.target.value)} />
    </label>
    <br />
    <label>
      Class:
      <input type="text" value={characterClass} onChange={(e) => setCharacterClass(e.target.value)} />
    </label>
    <br />
    <label>
      Weapons (comma-separated):
      <input type="text" value={weapons} onChange={(e) => setWeapons(e.target.value)} />
    </label>
    <br />
    <label>
      Background:
      <input type="text" value={background} onChange={(e) => setBackground(e.target.value)} />
    </label>
    <br />
    <button type="submit">Add Character</button>
  </form>
</div>
);
}
export default App;


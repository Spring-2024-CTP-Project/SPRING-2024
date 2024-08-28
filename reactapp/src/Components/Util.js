import React from "react";
import Paladin from "../assets/paladinlogo.png";
import Monk from "../assets/monklogo.png"
import Bard from "../assets/bardlogo.png"
import Cleric from  "../assets/Clericlogo.png"
import Fighter from  "../assets/Fighterlogo.png"
import Ranger from  "../assets/rangerlogo.png"
import Wizard from "../assets/wizardlogo.png"
import Rogue from  "../assets/roguelogo.png"
import Druid from  "../assets/druidlogo.png"
import Warlock from  "../assets/warlocklogo.png"
import Barbarian from "../assets/barbarianlogo.png"

export const INITCHARACTER = {
    name: "",
    race: "",
    characterClass: "",
    traits: '',
    bonds:'',
    weapons: [null],
    items: [null],
    prompt: "",
    background: "",
    allignment: "",
    points: [null, null, null, null, null, null],
    modifiers: [null, null, null, null, null, null],
    images: [null],
    description: "",
    level: 1,
    exp: [null],
    proficiency: 2,
    hitpoints: 0,
  };

  export const INITCAMPAIGN = {
    title: "",
    description: "",
    characters: [],
    date: "",
    log: [""]
  }

export const CHARCHECK = (character) => {
    if (
        character.name.trim() === "" ||
        character.race.trim() === "" ||
        character.characterClass.trim() === "" ||
        character.weapons.includes(null) ||
        character.items.includes(null) ||
        character.prompt.trim() === "" ||
        character.allignment.trim() === "" ||
        character.points.includes(null)
      )
      return true

      return false;
} 
   
export const LOGOCHECK = (Class) => {

let src =Paladin;
switch(Class) 
{
  case 'Paladin': 
 src=Paladin
 break;

 case 'Monk':
 src=Monk
 break;

 case 'Bard':
 src=Bard
 break;
 
 case 'Cleric':
 src=Cleric
 break;

 case 'Fighter' :
 src=Fighter
 break;

 case 'Ranger' :
 src=Ranger
 break;

 case 'Wizard':
  src=Wizard
  break;

  case 'Rogue':
    src=Rogue
    break;

  case 'Druid':
  src=Druid
  break;

  case 'Warlock':
  src=Warlock
  break;

  case 'Barbarian':
  src=Barbarian
  break;

  default:
  src=Paladin
  break;
}

  return src
}


    
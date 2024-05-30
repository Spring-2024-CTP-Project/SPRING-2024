import React from "react";
import { useEffect, useState } from "react";
import "bootstrap"
import { Axios } from "axios";
import './components.css'
import Play from '../assets/play.svg'
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";


export default function Card(props)
{

   
   console.log("PROPS TO SEND", props)
    return(

        <div className='my-2 text-white card1-outline main'>
        <div>
          
        <div className='container card-body '>
          <div className='container name'>{props.title}</div>
          <hr/>
           <div className="description d-flex px-3">
            Description: {props.description}
           </div>
           <hr></hr>
           <div className="container description d-flex" > Current Characters: </div>
           {props.characters.map((character, index)=> (
            <div className=" container round rest btn-dark" key={index}> 
            <div> 
                {character}
            </div>
           
            </div>
           ))}
            <hr></hr>
            <div className="">
               Date Created: {props.date}
            </div>
        
        </div>
        <hr></hr>
        <Link to='/Start' state={{title: {props}}}
        
        >

        <button className="btn btn-dark btn-lg my-3"> 
        <div className="">
           <img src={Play}
           width={'35px'}
           ></img>

        </div>
        </button>

        </Link>
        
      </div>
      <span className="pt-2">
      
      </span>
    
    
     
      </div>
    
    
    )
}

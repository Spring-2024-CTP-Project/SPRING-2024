import React from "react"
import { useEffect, useState } from "react";
import "bootstrap"
import './components.css'
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

export default function Card({character, onClick}) {
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false);
    if (!character) {
        return null;
      }

      const handleCloseModal = () => {
        setShowModal(false);
      };
      
      const handleDeleteClick = () => {
        setShowModal(true);
      };

       const  handleDelete = async () =>{

        try {
            const response = await fetch("http://127.0.0.1:8080/delete_character", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              
              body: JSON.stringify(character),
            });
            
            const data= await response.json();
            if (response.ok) {
              alert("Deleted succesfully!");
              setShowModal(false);}

              else {
                alert("Failed to Delete. Please try again later.");
              }
            } catch (error) {
              console.error("Error:", error);
              alert("An error occurred. Please try again later.");
            }}

 return (
<div className='container my-2 text-white card-outline main'>
    <div
    onClick={onClick}>
    <img
      src={character.Images}
      className='img-fluid img-thumbnail img'
      alt="Character Image"
    />
    <div className='container card-body'>
      <div className='container name'>{character.Name}</div>
      <hr />
      <div className='characterClass'>Class: {character.Class}</div>
      <hr/>
      <div className="rest">Race: {character.Race}</div>
      <div className='rest'>Allignment: {character.Allignment}</div>
      <div className='rest'>Weapons: {character.Weapons}</div>
    </div>
    <ul className='list-group rest'>
      <hr />
      <li className="hitpoints">Hit Points: {character.Hitpoints}</li>
    </ul>
    
  </div>
  <span className="pt-2">
  <button onClick={handleDeleteClick} className="btn btn-close btn-danger btn-sm my-2">
    
    </button>
  </span>

  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this character?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </div>


 )







}
import React from "react";
import { useEffect, useState } from "react";
import "bootstrap"
import './components.css'
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";


export default function Card(props, Button)
{
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
      };

    const handleClick = () => {


    }
    return(

        <div className='my-2 text-white card1-outline main'>
        <div>
          
        <div className='container card-body '>
          <div className='container name'>{props.title}</div>
          <hr/>
           <div className="description d-flex px-3">
            Description: tipgmfmrifmtriogvtepvtnmvkijv rkvjt vrk[vj rkvmntrjlvotrmj kvtrvm grjlvmpgrj vkmgrij gtrlm;vmtnrj lvkkrpvntrmk[fntrmkog=otinjp egtrkem;]]
           </div>
           <hr></hr>
           <div className="container rest" ></div>
           Characters:
        </div>
        <button className="btn btn-dark btn-lg"> ENTER</button>
        
      </div>
      <span className="pt-2">
      
      </span>
    
    
      <Modal show={showModal} onHide={handleCloseModal} >
          <Modal.Header closeButton >
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body className="background" >Are you sure you want to delete this Campaign?</Modal.Body>
          <Modal.Footer>
            <Button className="" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    
    
    )
}

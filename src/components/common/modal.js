import Image from "next/image";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import CloseBtn from "../../../public/assets/popup_cross_icon.png"

function CommonModal({ show, setShow, title, primaryFunction, bodyContent,auth,centered = true }) {
  console.log(show, "showModal");
  return (
    <>
      <Modal
        show={show ? true : false}
        onHide={setShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered = {centered}
       
      >
        {title && (
          <Modal.Header  closeButton>
            <Modal.Title  style={{fontWeight:900,color:"#311960"}} id="contained-modal-title-vcenter">
              {title}
            </Modal.Title>
          </Modal.Header>
        )}
      
      
        <Modal.Body  style={{backgroundColor:auth && "#062263"}} >
  {auth &&  <Image onClick={setShow}  src={CloseBtn} style={{position:"absolute",right:"20px",top:"10px",cursor:"pointer"}} />}
          {bodyContent}
          </Modal.Body>
        {primaryFunction && (
          <Modal.Footer>
            <Button variant="danger" onClick={setShow}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#8348F2" }}
              className="ml-2"
              onClick={primaryFunction}
            >
              Yes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default CommonModal;

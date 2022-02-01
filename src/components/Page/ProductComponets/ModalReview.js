import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../config/firebase-config";
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
const ModalReview = (props) => {
  const { show, onClose, user, product, userAdditionalInfo } = props;
  const ref = useRef(0);
  const [text, setText] = useState("");
  const SaveReview = async (e) => {
    e.preventDefault();
    if (ref.current ==0) {
      alert("Please select a stars")
    }
    else{

      await addDoc(collection(db, "Reviews"), {
        userId: user.uid,
        userFirstName: userAdditionalInfo.FirstName,
        userLastName: userAdditionalInfo.LastName,
        productId: product.key,
        text: text,
        stars:ref.current,
        timestamp: Timestamp.now().toDate(),
      }).then(() => (window.location.reload()));
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review {product.title}</Modal.Title>
        </Modal.Header>
         <Form onSubmit={(e)=>{SaveReview(e)}}>
        <Modal.Body>
         
            <Form.Label htmlFor="inputPassword5">Review</Form.Label><br/>
            <Rate onChange={(rate) => ref.current = rate}  />
            
            <Form.Control
              as="textarea"
              type="text"
              id="inputPassword5"
              placeholder="Please review the product"
              aria-describedby="passwordHelpBlock"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              required
            />
            <Form.Text id="passwordHelpBlock" muted>
              People will see your name and review the password
            </Form.Text>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
         
            
            type="submit"
          >
            Save Changes
          </Button>
        </Modal.Footer>
          </Form>
      </Modal>
    </div>
  );
};
export default ModalReview;

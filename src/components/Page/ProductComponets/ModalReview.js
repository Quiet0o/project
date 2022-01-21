import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../config/firebase-config";
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
const ModalReview = (props) => {
  const { show, onClose, user, product, userAdditionalInfo } = props;

  const [text, setText] = useState("");
  const SaveReview = async () => {
    await addDoc(collection(db, "Reviews"), {
      userId: user.uid,
      userFirstName: userAdditionalInfo.FirstName,
      userLastName: userAdditionalInfo.LastName,
      productId: product.key,
      text: text,
      timestamp: Timestamp.now().toDate(),
    }).then(() => (setText(""), window.location.reload()));
  };

  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review {product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label htmlFor="inputPassword5">Review</Form.Label><br/>
            <Rate />
            <br/>
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
            />
            <Form.Text id="passwordHelpBlock" muted>
              People will see your name and review the password
            </Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              SaveReview();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalReview;

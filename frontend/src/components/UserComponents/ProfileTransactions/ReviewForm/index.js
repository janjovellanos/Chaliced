import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import ReviewForm from "./ReviewForm";
import "./ReviewForm.css";

function CreateReviewButtonModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>LEAVE A REVIEW</button>
      {showModal && (
        <Modal id='review-form-modal' onClose={() => setShowModal(false)}>
          <ReviewForm product={product} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateReviewButtonModal;

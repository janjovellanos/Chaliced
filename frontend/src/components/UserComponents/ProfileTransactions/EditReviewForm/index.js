import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import EditReviewForm from "./EditReviewForm";
// import "./ReviewForm.css";

function EditReviewButtonModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>EDIT REVIEW</button>
      {showModal && (
        <Modal id='review-form-modal' onClose={() => setShowModal(false)}>
          <EditReviewForm product={product} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewButtonModal;

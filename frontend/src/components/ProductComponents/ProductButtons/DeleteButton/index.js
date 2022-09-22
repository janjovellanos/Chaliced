import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import DeleteButton from "./DeleteButton";

function DeleteButtonModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>DELETE LISTING <i className="fa-solid fa-trash-can"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteButton product={product} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteButtonModal;

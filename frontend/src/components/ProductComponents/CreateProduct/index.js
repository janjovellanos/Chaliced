import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateProductForm from "./CreateProduct";
import './CreateProduct.css'

function CreateProductModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Sell</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProductForm />
        </Modal>
      )}
    </>
  );
}

export default CreateProductModal;

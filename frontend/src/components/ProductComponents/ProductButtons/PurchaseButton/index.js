import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import PurchaseButton from "./PurchaseButton";

function PurchaseButtonModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>PURCHASE</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PurchaseButton product={product} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PurchaseButtonModal;

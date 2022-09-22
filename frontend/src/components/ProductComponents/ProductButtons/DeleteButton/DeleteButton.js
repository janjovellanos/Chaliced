import React from 'react'
import './DeleteButton.css'

export default function DeleteButton({product, setShowModal}) {


  return (
    <div className='delete-modal-container'>
        <div className='delete-modal-header'>Delete Item?</div>
        <div className='delete-modal-second'>This will unlist your item</div>
        <div className='delete-modal-options'>
            <div className='yes-delete'>Delete</div>
            <div onClick={() => setShowModal(false)} className='dont-delete'>On second thought..</div>
        </div>
    </div>
  )
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import * as productActions from '../../../../store/product';
import './DeleteButton.css'

export default function DeleteButton({product, setShowModal}) {
    const user = useSelector(state => state.session.user);
    const productName = product?.name
    const dispatch = useDispatch();
    const history = useHistory();

  const handleDeleteBtn = async () => {
    await dispatch(productActions.removeProduct(product?.id))
    setShowModal(false);
    history.push(`/users/${user.id}`)
    alert(`${productName} has been removed`)
  };

  return (
    <div className='delete-modal-container'>
        <div className='delete-modal-header'>Delete Item?</div>
        <div className='delete-modal-second'>This will unlist your item</div>
        <div className='delete-modal-options'>
            <div onClick={() => handleDeleteBtn()} className='yes-delete'>Delete</div>
            <div onClick={() => setShowModal(false)} className='dont-delete'>On second thought..</div>
        </div>
    </div>
  )
}

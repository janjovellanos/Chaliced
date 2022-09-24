import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as myActions from '../../../../store/my';
import './PurchaseButton.css'

export default function PurchaseButton({product, setShowModal}) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

  const handlePurchaseBtn = async () => {
    await dispatch(myActions.addOrder(product?.id))
    setShowModal(false);
    history.push(`/users/${user.id}`)
    alert(`Congratulations on your ${product?.name}!`)
  };

  return (
    <div className='purchase-modal-container'>
        <div className='purchase-modal-header'>{product?.name}</div>
        <div className='purchase-modal-second'>
            <div>
                <div className='purchase-size-label'>size:</div>
                <div className='purchase-size'>{product?.size}</div>
            </div>
            <div>
                <div className='purchase-price-label'>price:</div>
                <div className='purchase-price'>${product?.price}</div>
            </div>
        </div>
        <div className='purchase-modal-options'>
            <div onClick={() => handlePurchaseBtn()} className='yes-purchase'>Buy</div>
            <div onClick={() => setShowModal(false)} className='dont-purchase'>Cancel</div>
        </div>
    </div>
  )
}

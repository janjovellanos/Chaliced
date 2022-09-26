import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as productActions from '../../../store/product';
import * as myActions from '../../../store/my';
import { getCreatedDate } from '../../../utils/helpers';
import CreateReviewButtonModal from './ReviewForm';

export default function ProfilePurchases({seller}) {
    const myOrders = useSelector(state => Object.values(state.my.Orders));
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(myActions.getMyOrders());
    }, [dispatch])

    myOrders?.sort((a, b) => {
        return b.id - a.id;
    })

    return (
        <div className='orders-list'>
            {myOrders && myOrders?.map(order => (
                <div key={order?.id} className='order-container'>
                    <div className='order-image'>
                        <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    </div>
                    <div className='order-details'>
                        <div className='order-details-top'>
                            <div>
                                <div className='top-detail-name'>Purchased</div>
                                <div className='top-detail'>{getCreatedDate(order?.updatedAt)}</div>
                            </div>
                            <div>
                                <div className='top-detail-name'>Seller</div>
                                <div className='top-detail'>{order?.Product?.Seller?.username}</div>
                            </div>
                            <div>
                                <div className='top-detail-name'>Sale Price</div>
                                <div className='top-detail'>${order?.Product?.price}</div>
                            </div>
                        </div>
                        <div className='order-details-bottom'>
                            <div className='order-item-name'>
                                {order?.Product?.name}
                            </div>
                            <div className='order-item-description'>
                                {order?.Product?.description}
                            </div>
                            {order?.Product?.Review && <div className='current-review'>
                                <div>{order?.Product?.Review?.stars}* - {order?.Product?.Review?.body}</div>
                            </div>}
                        </div>
                        <div className='order-leave-review'>
                            {!order?.Product?.Review && <CreateReviewButtonModal product={order?.Product}/>
                                                    || <button>EDIT REVIEW</button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as reviewActions from '../../../store/review';
import * as myActions from '../../../store/my';
import { getCreatedDate } from '../../../utils/helpers';
import CreateReviewButtonModal from './ReviewForm';
import EditReviewButtonModal from './EditReviewForm';

export default function ProfilePurchases({seller}) {
    const myOrders = useSelector(state => Object.values(state.my.Orders));
    const reviews = useSelector(state => state.reviews);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(myActions.getMyOrders());
    }, [dispatch, reviews])

    myOrders?.sort((a, b) => {
        return b.id - a.id;
    })

    const handleDeleteReview = (id) => {
        dispatch(reviewActions.removeReview(id));
    }

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
                                <div className='current-review-stars'>{order?.Product?.Review?.stars}<i className="fa-solid fa-star filled"></i> </div>
                                <div className='current-review-body'>"{order?.Product?.Review?.body.slice(0, 40) + '...'}"</div>
                            </div>}
                        </div>
                        <div className='order-leave-review'>
                            {!order?.Product?.Review && <CreateReviewButtonModal product={order?.Product}/>
                                                    || <div className='review-edit-delete'>
                                                         <EditReviewButtonModal product={order?.Product} />
                                                         <button onClick={e => handleDeleteReview(order?.Product?.Review?.id)} className='delete-review-btn'>REMOVE REVIEW</button>
                                                       </div>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

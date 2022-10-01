import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getCreatedDate } from '../../../utils/helpers';
import * as sellerActions from '../../../store/seller';
import './ProfileReviews.css'

export default function ProfileReviews({sellerReviews, seller}) {
    const { userId } = useParams();
    const history = useHistory();

    let total = 0;
    sellerReviews?.forEach(review => {
        total += review.stars
    })

    let starRating = total / sellerReviews?.length


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sellerActions.getUserDetails(userId))
    }, [dispatch, userId]);

  return (
    <div className='seller-reviews-container'>
        <div className='seller-reviews-header'>
            <div className='seller-score'>Seller Score</div>
            <div className='seller-stars'>{starRating ? starRating : 0}<i className="fa-solid fa-star filled"></i></div>
            <div className='seller-review-ct'>{sellerReviews?.length} Reviews</div>
        </div>
        <div className='seller-reviews-list'>
            {sellerReviews?.map(review => (
                <div key={review?.id} className='review-li'>
                    <div className='review-left'>
                        <div className='review-date'>{getCreatedDate(review?.createdAt)}</div>
                        <div className='review-stars'>{review?.stars} *****</div>
                        <div className='review-body'>
                            <div>{review?.body} -</div>
                            <div className='review-buyer'>{review?.Buyer?.username}</div>
                        </div>
                        <div className='review-product-name'>
                            {seller?.Products?.find(product => product?.id === review?.productId)?.name}
                        </div>
                    </div>
                <div className='review-right'>
                    <img alt='reviewed product' onClick={() => history.push(`/products/${review?.Product?.id}`)} src={review?.Product?.Images[0]?.url}></img>
                </div>
        </div>
            ))}
        </div>
    </div>
  )
}

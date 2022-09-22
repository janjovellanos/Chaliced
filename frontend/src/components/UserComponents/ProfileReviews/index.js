import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCreatedDate } from '../../../utils/helpers';
import * as sellerActions from '../../../store/seller';
import './ProfileReviews.css'

export default function ProfileReviews({sellerReviews, seller}) {
    const { userId } = useParams();

    let total = 0;
    sellerReviews?.forEach(review => {
        total += review.stars
    })

    let starRating = total / sellerReviews?.length


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sellerActions.getUserDetails(userId))
    }, [dispatch]);

  return (
    <div className='seller-reviews-container'>
        <div className='seller-reviews-header'>
            <div className='seller-score'>Seller Score</div>
            <div className='seller-stars'>{starRating} *****</div>
            <div className='seller-review-ct'>{sellerReviews?.length} Reviews</div>
        </div>
        <div className='seller-reviews-list'>
            {sellerReviews?.map(review => (
                <div key={review?.id} className='review-li'>
                    <div className='review-left'>
                        <div className='review-date'>{getCreatedDate(review?.createdAt)}</div>
                        <div className='review-stars'>{review?.stars} *****</div>
                        <div className='review-body'>{review?.body}</div>
                        <div className='review-product-name'>
                            {seller?.Products?.find(product => product?.id === review?.productId)?.name}
                        </div>
                    </div>
                <div className='review-right'>
                    <img src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                </div>
        </div>
            ))}
        </div>
    </div>
  )
}

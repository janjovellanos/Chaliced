import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as sellerActions from '../../../store/seller';
import './ProfileReviews.css'
import ProfileListings from '../ProfileListings';

export default function ProfileReviews({sellerReviews}) {
    const { userId } = useParams();
    const seller = useSelector(state => (state.sellers))[userId];

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
        <div className='seller-reviews-list'></div>
    </div>
  )
}

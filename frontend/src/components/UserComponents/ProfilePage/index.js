import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as sellerActions from '../../../store/seller';
import './ProfilePage.css'
import ProfileListings from '../ProfileListings';
import ProfileReviews from '../ProfileReviews';
import ProfileTransactions from '../ProfileTransactions';

export default function ProfilePage() {
    const { userId } = useParams();
    const seller = useSelector(state => (state.sellers))[userId];
    const [listingsClicked, setListingsClicked] = useState('profile-listings-clicked')
    const [reviewsClicked, setReviewsClicked] = useState('')
    const [transactionsClicked, setTransactionsClicked] = useState('')


    const availProducts = seller?.Products?.filter(product => product.sold === false)
    const sellerReviews = seller?.Reviews
    const sellerTransactions = sellerReviews?.length + seller?.Orders?.length
    const [bottomView, setBottomView] = useState(null);
    const dispatch = useDispatch();

    const handleListingsClicked = () => {
        setListingsClicked('profile-listings-clicked')
        setReviewsClicked('')
        setTransactionsClicked('')
        setBottomView(<ProfileListings availProducts={availProducts} />)
    };

    const handleReviewsClicked = () => {
        setReviewsClicked('profile-reviews-clicked')
        setListingsClicked('')
        setTransactionsClicked('')
        setBottomView(<ProfileReviews sellerReviews={sellerReviews} seller={seller} />)
    };

    const handleTransactionsClicked = () => {
        setTransactionsClicked('profile-orders-clicked')
        setListingsClicked('')
        setReviewsClicked('')
        setBottomView(<ProfileTransactions seller={seller} />)
    };

    useEffect(() => {
        dispatch(sellerActions.getUserDetails(userId))
    }, [dispatch]);

  return (
    <div className='profile-page-container'>
        <div className='profile-page-header'>
            <div className='profile-header-left'>
                <div className='profile-pic'>
                    <img src='https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-11-512.png'></img>
                    {/* <img src={seller?.profileImage}></img> */}
                </div>
                <div className='profile-info'>
                    <div className='profile-username'>{seller?.username}</div>
                    <div className='profile-created-at'>Joined {timeAgo(new Date(seller?.createdAt))}</div>
                </div>
            </div>
            <div className='profile-stats'>
                <div className='profile-reviews'>
                    <div className='seller-review-count'>{sellerReviews?.length}</div>
                    <div>Reviews</div>
                </div>
                <div className='profile-transactions'>
                    <div className='profile-transactions-count'>{sellerTransactions}</div>
                    <div>Transactions</div>
                </div>
            </div>
        </div>
        <div className='profile-listings-reviews-btns'>
            <div onClick={() => handleListingsClicked()} className={listingsClicked}>Listings ({availProducts?.length})</div>
            <div onClick={() => handleReviewsClicked()} className={reviewsClicked}>Reviews ({sellerReviews?.length})</div>
            <div onClick={() => handleTransactionsClicked()} className={transactionsClicked}>Your Orders</div>
        </div>
        <div className='listings-or-reviews'>
            {bottomView || <ProfileListings availProducts={availProducts} />}
            {/* <ProfileListings availProducts={availProducts} /> */}
            {/* <ProfileReviews sellerReviews={sellerReviews} /> */}
        </div>
    </div>
  )
}

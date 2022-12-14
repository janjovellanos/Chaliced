import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as sellerActions from '../../../store/seller';
import './ProfilePage.css'
import ProfileListings from '../ProfileListings';
import ProfileReviews from '../ProfileReviews';
import ProfileTransactions from '../ProfileTransactions';
import ProfileFavorites from '../ProfileFavorites';

export default function ProfilePage() {
    const { userId } = useParams();
    const user = useSelector(state => state.session.user);
    const seller = useSelector(state => (state.sellers))[userId];
    const myOrders = useSelector(state => Object.values(state?.my?.Orders));
    const mySold = useSelector(state => Object.values(state?.my?.Sold));
    const [listingsClicked, setListingsClicked] = useState('profile-listings-clicked')
    const [reviewsClicked, setReviewsClicked] = useState('');
    const [transactionsClicked, setTransactionsClicked] = useState('');
    const [favoritesClicked, setFavoritesClicked] = useState('my-favs');
    const [heart, setHeart] = useState(<i className='fa-regular fa-heart' />)


    const availProducts = seller?.Products?.filter(product => product.sold === false)
    const soldProducts = seller?.Products?.filter(product => product?.sold === true)
    const sellerReviews = seller?.Reviews
    const sellerTransactions = soldProducts?.length + seller?.Orders?.length
    const [bottomView, setBottomView] = useState(null);
    const dispatch = useDispatch();

    const handleListingsClicked = () => {
        setListingsClicked('profile-listings-clicked')
        setReviewsClicked('')
        setHeart(<i className='fa-regular fa-heart' />)
        setFavoritesClicked('my-favs')
        setTransactionsClicked('')
        setBottomView(<ProfileListings availProducts={availProducts} />)
    };

    const handleReviewsClicked = () => {
        setReviewsClicked('profile-reviews-clicked')
        setHeart(<i className='fa-regular fa-heart' />)
        setFavoritesClicked('my-favs')
        setListingsClicked('')
        setTransactionsClicked('')
        setBottomView(<ProfileReviews sellerReviews={sellerReviews} seller={seller} />)
    };

    const handleTransactionsClicked = () => {
        setTransactionsClicked('profile-orders-clicked')
        setListingsClicked('')
        setReviewsClicked('')
        setHeart(<i className='fa-regular fa-heart' />)
        setFavoritesClicked('my-favs')
        setBottomView(<ProfileTransactions myOrders={myOrders} mySold={mySold}/>)
    };

    const handleFavoritesClicked = () => {
        setFavoritesClicked('my-favs profile-favs-clicked')
        setHeart(<i className='fa-solid fa-heart' />)
        setTransactionsClicked('')
        setListingsClicked('')
        setReviewsClicked('')
        setBottomView(<ProfileFavorites />)
    };

    useEffect(() => {
        dispatch(sellerActions.getUserDetails(userId))
        //if url contains curr user's id && transactions
        if (window.location.href.includes('transactions')
        && window.location.href.includes(`${user?.id}`)) {
            //show purchases bottomview
            handleTransactionsClicked();
        }
        if (window.location.href.includes('favorites')
        && window.location.href.includes(`${user?.id}`)) {
            //show favorites bottomview
            handleFavoritesClicked();
        }
    }, [dispatch]);

  if (seller) return (
    <div className='profile-page-container'>
        <div className='profile-page-header'>
            <div className='profile-header-left'>
                <div className='profile-pic'>
                    <img src={seller?.profileImage}></img>
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
                    <div className='profile-transactions-count'>{sellerTransactions > 0 ? sellerTransactions : 0}</div>
                    <div>Transactions</div>
                </div>
            </div>
        </div>
        <div className='profile-listings-reviews-btns'>
            <div onClick={() => handleListingsClicked()} className={listingsClicked}>Listings ({availProducts?.length})</div>
            <div onClick={() => handleReviewsClicked()} className={reviewsClicked}>Reviews ({sellerReviews?.length})</div>
            {user?.id === +userId &&
            <>
                <div onClick={() => handleTransactionsClicked()} className={transactionsClicked}>Your Orders</div>
                <div onClick={() => handleFavoritesClicked()} className={favoritesClicked}>{heart}</div>
            </>}
        </div>
        <div className='listings-or-reviews'>
            {bottomView || <ProfileListings availProducts={availProducts} />}
        </div>
    </div>
  )
}

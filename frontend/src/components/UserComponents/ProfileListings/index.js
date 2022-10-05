import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as sellerActions from '../../../store/seller';
import { timeAgo } from '../../../utils/helpers';
import './ProfileListings.css'

export default function ProfileListings({availProducts}) {
    const {userId} = useParams();
    const dispatch = useDispatch();
    availProducts?.sort((a, b) => {
        return b.id - a.id;
    })

    useEffect(() => {
        dispatch(sellerActions.getUserDetails(userId));
    }, [dispatch]);

  return (
    <>
        <div className='listing-filter-bar'>
            <div className='profile-item-count'>{availProducts?.length} Listings</div>
            <div className='profile-filter-btn'>
            </div>
        </div>
    <div className='seller-explore-page-container'>
        <div className='items-container-scroll profile-listing-scroll'>
            {availProducts?.map(product => (
                <div key={product?.id} className='seller-item-preview'>
                    <NavLink to={`/products/${product?.id}`} className='preview-image-container'>
                        <img
                            className='preview-image' src={product?.Images[0]?.url}>
                        </img>
                    </NavLink>
                    <div className='seller-item-preview-bottom'>
                        <div className='seller-item-post-date'>{timeAgo(new Date(product?.createdAt))}</div>
                        <NavLink to={`/products/${product?.id}`}
                            className='item-name-and-size'>
                                <p>{product?.name}</p>
                                <p>{product?.size}</p>
                        </NavLink>
                        <div className='seller-item-description'>{product?.description.slice(0,28)}...</div>
                        <div className='seller-item-price-and-fav'><p>${product?.price}</p><p><i className="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

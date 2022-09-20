import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as favActions from '../../../store/favorite';
import * as sellerActions from '../../../store/seller';
import * as revActions from '../../../store/review';
import * as productActions from '../../../store/product';
import './ProductButtons.css'

export default function ProductButtons({product}) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            dispatch(favActions.getProdFavs(product?.id));
        }
    }, [dispatch]);

  return (
    <div className='product-buttons'>
        <div className='product-purchase-btn'>
            <button>PURCHASE</button>
        </div>
        <div className='product-favorite-btn'>
            <button>FAVORITE</button>
        </div>
        <div className='product-seller-info'>
            <div className='seller-profile-pic'>
                <NavLink to={`/users/${product?.userId}`}>
                    <img src='https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-11-512.png'></img>
                </NavLink>
                {/* {product?.Seller?.profileImage} */}
            </div>
            <div className='seller-stats'>
                <NavLink to={`/users/${product?.userId}`} className='product-seller-name'>{product?.Seller?.username}</NavLink>
                <NavLink to={`/users/${product?.userId}/reviews`} className='product-seller-rating'>***** {product?.Seller?.reviewCount} Reviews</NavLink>
                <NavLink to={`/users/${product?.userId}`} className='product-seller-listings'>{product?.Seller?.productCount} listing for sale</NavLink>
            </div>
        </div>
    </div>
  )
}

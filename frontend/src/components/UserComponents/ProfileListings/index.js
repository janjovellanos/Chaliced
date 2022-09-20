import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import './ProfileListings.css'

export default function ProfileListings({availProducts}) {

  return (
    <>
        <div className='listing-filter-bar'>
            <div className='profile-item-count'>{availProducts?.length} Listings</div>
            <div className='profile-filter-btn'>
                <button>FILTER</button>
            </div>
        </div>
    <div className='explore-page-container'>
        <div className='items-container-scroll'>
            {availProducts?.map(product => (
                <div key={product?.id} className='seller-item-preview'>
                    <NavLink to={`/products/${product?.id}`} className='preview-image-container'>
                        {/* {product?.Images[0]?.url} */}
                        <img
                            className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'>
                        </img>
                    </NavLink>
                    <div className='seller-item-preview-bottom'>
                        <div className='seller-item-post-date'>{timeAgo(new Date(product?.createdAt))}</div>
                        <NavLink to={`/products/${product?.id}`}
                            className='item-name-and-size'>
                                <p>{product?.name}</p>
                                <p>{product?.size}</p>
                        </NavLink>
                        <div className='seller-item-description'>{product?.description}</div>
                        <div className='seller-item-price-and-fav'><p>${product?.price}</p><p><i className="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

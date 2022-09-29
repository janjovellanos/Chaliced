import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeAgo } from '../../utils/helpers';
import * as productActions from '../../store/product';
import './HomePage.css'
import { NavLink } from 'react-router-dom';

export default function HomePage() {
    const user = useSelector((state) => state.session.user);
    const products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getAvailProducts())
    }, [dispatch]);

  return (
    <div className='home-page-container'>
        <div className='featured-container'>
        <div className='featured'>
            <div className='featured-description-container'>
                <div className='featured-logo-container'>
                    <img className='featured-logo' src='https://media.giphy.com/avatars/salomonsports/tuElID8qd30z.gif'></img>
                </div>
                <div className='featured-description'>
                    Men's hiking shoes designed to go the distance with sturdy construction, exceptional support, weatherproof protection, and versatile grip
                    Men's hiking shoes designed to go the distance with sturdy construction, exceptional support, weatherproof protection, and versatile grip
                </div>
            </div>
            <div className='featured-image-container'>
                <img className='featured-image' src='https://www.highsnobiety.com/static-assets/wp-content/uploads/2022/08/15142054/ezgif.com-gif-maker-69.gif'></img>
            </div>
        </div>
        </div>
        <div className='items-container-scroll'>
            {/* Get 5 Newest Listings */}
            {user && products?.slice(-5).reverse().map(product => (
                <div key={product?.id} className='item-preview'>
                    <div className='preview-image-container'>
                        {/* {product?.Images[0]?.url} */}
                        <NavLink to={`/products/${product?.id}`}>
                            <img className='preview-image' src={product?.Images[0]?.url}></img>
                        </NavLink>
                    </div>
                    <div className='item-preview-bottom'>
                        <div className='item-post-date'>{timeAgo(new Date(product?.createdAt))}</div>
                        <NavLink to={`/products/${product?.id}`}>
                            <div className='item-name-and-size'><p>{product?.name}</p><p>{product?.size}</p></div>
                        </NavLink>
                        <div className='item-description'>{product?.description.slice(0,28)}...</div>
                        <div className='item-price-and-fav'><p>${product?.price}</p><p><i className="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

import React, { useEffect } from 'react'
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
                    <img className='featured-logo' src='https://chaliced-images.s3.us-west-1.amazonaws.com/featured2.gif'></img>
                </div>
                <div className='featured-description'>
                The gorpcore explosion has made us all look at technically-produced hiker gear a bit differently.
                Suddenly wearing a waterproof Arc'teryx jacket isn't only done by outdoorsy folk, but also by
                fashion-conscious Instagram users who show off the waterproof technology while standing in the shower.
                The influence this has had on footwear has been that hiking and trail-running shoes are generating
                hype like Jordans always have, and <strong>Salomon</strong> is at the forefront of it all.
                </div>
            </div>
            <div className='featured-image-container'>
                <img className='featured-image' src='https://chaliced-images.s3.us-west-1.amazonaws.com/featured.gif'></img>
            </div>
        </div>
        </div>
        <div className='items-container-scroll-home'>
            {/* Get 5 Newest Listings */}
            {user && products?.slice(-5).reverse().map(product => (
                <div key={product?.id} className='item-preview'>
                    <div className='preview-image-container'>
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

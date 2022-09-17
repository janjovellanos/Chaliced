import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeSince } from '../../utils/helpers';
import * as productActions from '../../store/product';
import './HomePage.css'

export default function HomePage() {
    const products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getProducts())
    }, [dispatch]);

  return (
    <div className='home-page-container'>
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
        <div className='items-container-scroll'>
            {products.map(product => (
                <div className='item-preview'>
                    <div className='preview-image-container'>
                        {/* {product?.Images[0]?.url} */}
                        <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    </div>
                    <div className='item-preview-bottom'>
                        <div className='item-post-date'>{timeSince(new Date(product?.createdAt))}</div>
                        <div className='item-name-and-size'><p>{product?.name}</p><p>{product?.size}</p></div>
                        <div className='item-description'>{product?.description}</div>
                        <div className='item-price-and-fav'><p>${product?.price}</p><p><i class="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )

}

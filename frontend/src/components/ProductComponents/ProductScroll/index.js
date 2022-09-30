import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { timeAgo } from '../../../utils/helpers'
import * as myActions from '../../../store/my';
import * as favActions from '../../../store/favorite';

export default function ProductScroll({products}) {
    const userFavs = useSelector(state => Object.values(state.my.Favorites));
    const myFavs = useSelector(state => state.my.Favorites);
    const dispatch = useDispatch();

    const currUserLiked = (id) => {
        let favProductIds = userFavs.map(fav => fav?.productId);
        return favProductIds.includes(id);
    }

    const handleFavButton = (id) => {
        if (!currUserLiked(id)) {
            dispatch(favActions.addFav(id))
            // setFaved('fa-solid fa-heart')
        } else {
            dispatch(favActions.removeFav(id))
            // setFaved('fa-regular fa-heart')
        }
    }

    useEffect(() => {
        dispatch(myActions.getMyFavs());
    }, [dispatch, myFavs])

  return (
        <>
            {products?.map(product => (
                <div key={product?.id} className='item-preview'>
                    <NavLink to={`/products/${product?.id}`} className='preview-image-container'>
                        {/* {product?.Images[0]?.url} */}
                        <img key={product?.id}
                            // onClick={() => history.push(`/products/${product?.id}`)}
                            className='preview-image' src={product?.Images[0]?.url}>
                        </img>
                    </NavLink>
                    <div className='item-preview-bottom'>
                        <div className='item-post-date'>{timeAgo(new Date(product?.createdAt))}</div>
                        <NavLink to={`/products/${product?.id}`}
                            // onClick={() => history.push(`/products/${product?.id}`)}
                            className='item-name-and-size'>
                                <p>{product?.name}</p>
                                <p>{product?.size}</p>
                        </NavLink>
                        <div className='item-description'>{product?.description.slice(0,28)}...</div>
                        <div className='item-price-and-fav'><p>${product?.price}</p><p>{currUserLiked(product?.id) ? <i onClick={() => handleFavButton(product?.id)} className="fa-solid fa-heart" /> : <i onClick={() => handleFavButton(product?.id)} className="fa-regular fa-heart" />}</p></div>
                    </div>
                </div>
            ))}
        </>
    )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as myActions from '../../../store/my';
import './ProfileFavorites.css'

export default function ProfileFavorites() {
    const dispatch = useDispatch();
    const myFavs = useSelector(state => Object.values(state.my.Favorites))

    useEffect(() => {
        dispatch(myActions.getMyFavs());
    }, [dispatch])

    let soldItem =  <>
                      <div className='this-item-sold'>
                          SOLD <i className="fa-regular fa-face-frown"></i>
                      </div>
                      <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    </>

    let availableItem = <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>;

  return (
    <>
        <div className='listing-filter-bar favorite-bar'>
            <div className='profile-item-count'>{myFavs?.length} Favorites</div>
            {/* <div className='profile-filter-btn'>
                <button>FILTER</button>
            </div> */}
        </div>
    <div className='seller-explore-page-container'>
        <div className='items-container-scroll fav-item-scroll'>
            {myFavs?.map(fav => (
                <div key={fav?.Product?.id} className='seller-item-preview'>
                    <NavLink to={`/products/${fav?.Product?.id}`} className='preview-image-container'>
                        {/* {product?.Images[0]?.url} */}
                        {fav?.Product?.sold ? soldItem : availableItem}
                    </NavLink>
                    <div className='seller-item-preview-bottom'>
                        <div className='seller-item-post-date'>{timeAgo(new Date(fav?.Product?.createdAt))}</div>
                        <NavLink to={`/products/${fav?.Product?.id}`}
                            className='item-name-and-size'>
                                <p>{fav?.Product?.name}</p>
                                <p>{fav?.Product?.size}</p>
                        </NavLink>
                        <div className='seller-item-description'>{fav?.Product?.description}</div>
                        <div className='seller-item-price-and-fav'><p>${fav?.Product?.price}</p><p><i className="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

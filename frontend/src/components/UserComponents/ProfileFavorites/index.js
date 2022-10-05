import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as myActions from '../../../store/my';
import * as favActions from '../../../store/favorite';
import './ProfileFavorites.css'

export default function ProfileFavorites() {
    const dispatch = useDispatch();
    const history = useHistory();
    const myFavs = useSelector(state => Object.values(state.my.Favorites))

    useEffect(() => {
        dispatch(myActions.getMyFavs());
    }, [dispatch])

    const handleUnFavorite = (id) => {
        dispatch(favActions.removeFav(id));
        history.go();
    }

  return (
    <>
        <div className='listing-filter-bar favorite-bar'>
            <div className='profile-item-count'>{myFavs?.length} Favorites</div>
        </div>
    <div className='seller-explore-page-container'>
        <div className='items-container-scroll fav-item-scroll'>
            {myFavs?.map(fav => (
                <div key={fav?.Product?.id} className='seller-item-preview'>
                    <NavLink to={`/products/${fav?.Product?.id}`} className='preview-image-container'>
                        <img alt='item preview' className='preview-image' src={fav?.Product?.Images[0]?.url}/>
                        {/* {fav?.Product?.sold ? soldItem : availableItem} */}
                    </NavLink>
                    <div className='seller-item-preview-bottom'>
                        <div className='seller-item-post-date'>{timeAgo(new Date(fav?.Product?.createdAt))}</div>
                        <NavLink to={`/products/${fav?.Product?.id}`}
                            className='item-name-and-size'>
                                <p>{fav?.Product?.name}</p>
                                <p>{fav?.Product?.size}</p>
                        </NavLink>
                        <div className='seller-item-description'>{fav?.Product?.description}</div>
                        <div className='seller-item-price-and-fav'><p>${fav?.Product?.price}</p><p><i onClick={() => handleUnFavorite(fav?.Product?.id)} className="fa-solid fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

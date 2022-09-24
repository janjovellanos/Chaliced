import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeAgo } from '../../../utils/helpers';
import * as productActions from '../../../store/product';
import './Explore.css'
import { NavLink, useHistory } from 'react-router-dom';

export default function Explore() {
    const user = useSelector(state => state.session.user);
    const products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(productActions.getAvailProducts())
    }, [dispatch]);

    products?.sort((a, b) => {
        return b.id - a.id;
    })

  return (
    <div className='explore-page-container'>
        <div className='top-explore'>
            <div className='item-count'>{products?.length} Listings</div>
            <div className='filter-btn'>Filter</div>
        </div>
        <div className='available'>
            Available Listings {/* or "SearchWord" Listings */}
        </div>
        <div className='items-container-scroll'>
            {products.map(product => (
                <div key={product?.id} className='item-preview'>
                    <NavLink to={`/products/${product?.id}`} className='preview-image-container'>
                        {/* {product?.Images[0]?.url} */}
                        <img
                            // onClick={() => history.push(`/products/${product?.id}`)}
                            className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'>
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
                        <div className='item-description'>{product?.description}</div>
                        <div className='item-price-and-fav'><p>${product?.price}</p><p><i className="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )

}

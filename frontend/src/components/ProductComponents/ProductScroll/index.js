import React from 'react'
import { NavLink } from 'react-router-dom'
import { timeAgo } from '../../../utils/helpers'

export default function ProductScroll({products}) {
  return (
        <>
            {products?.map(product => (
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
        </>
    )
}

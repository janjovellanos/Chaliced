import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as productActions from '../../../store/product';
import './ProductPage.css'
import ProductDetails from '../ProductDetails';

export default function ProductPage() {
    const { productId } = useParams();
    const user = useSelector(state => state.session.user);
    const product = useSelector(state => (state.products))[productId];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getProduct(productId))
    }, [dispatch]);

  return (
    <div className='product-page-container'>
        <div className='product-container'>
            <div className='product-container-left'>
                <img className='product-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                <div className='product-images-small'>
                    <img className='product-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    <img className='product-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    <img className='product-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                </div>
            </div>
            <ProductDetails product={product}/>
        </div>
        <div className='product-page-bottom'>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
        </div>




        {/* <div className='items-container-scroll'> */}
            {/* {products.map(product => (
                <div key={product.id} className='item-preview'>
                    <div className='preview-image-container'> */}
                        {/* {product?.Images[0]?.url} */}
                        {/* <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    </div>
                    <div className='item-preview-bottom'>
                        <div className='item-post-date'>{timeAgo(new Date(product?.createdAt))}</div>
                        <div className='item-name-and-size'><p>{product?.name}</p><p>{product?.size}</p></div>
                        <div className='item-description'>{product?.description}</div>
                        <div className='item-price-and-fav'><p>${product?.price}</p><p><i className="fa-regular fa-heart"></i></p></div>
                    </div>
                </div>
            ))} */}
        {/* </div> */}
    </div>
  )

}

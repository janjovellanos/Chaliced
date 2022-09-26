import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as productActions from '../../../store/product';
import './ProductPage.css'
import ProductDetails from '../ProductDetails';

export default function ProductPage() {
    const { productId } = useParams();
    const product = useSelector(state => (state.products))[productId];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getProduct(productId))
    }, [dispatch, product?.name, product?.size, product?.price, product?.description]);

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
            {product && <ProductDetails product={product}/>}
        </div>
        <div className='product-page-bottom'>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
            <div>items at the bottom</div>
        </div>
    </div>
  )

}

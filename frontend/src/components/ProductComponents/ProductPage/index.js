import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import * as productActions from '../../../store/product';
import './ProductPage.css'
import ProductDetails from '../ProductDetails';
import ProductScroll from '../ProductScroll';

export default function ProductPage() {
    const { productId } = useParams();
    const product = useSelector(state => (state.products))[productId];
    const products = useSelector(state => Object.values(state.products));
    const productImages = product.Images.map(image => image.url);
    // console.log(productImages);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(productActions.getProduct(productId))
        dispatch(productActions.getCategory(product?.categoryId))
    }, [dispatch, product?.name, product?.size, product?.price, product?.description]);


    if (product?.sold) history.push(`/unavailable`)

    return (
    <div className='product-page-container'>
        <div className='product-container'>
            <div className='product-container-left'>
                <img className='product-image' src={productImages[0]}></img>
                <div className='product-images-small'>
                    {productImages?.map(image => (
                        <img className='product-image' src={image}></img>
                        ))
                    }
                    {/* <img className='product-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    <img className='product-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img> */}
                </div>
            </div>
            {product && <ProductDetails product={product}/>}
        </div>
        <div className='scroll-label'>You may also like</div>
        <div className='product-page-bottom'>
            <ProductScroll products={products}/>
        </div>
    </div>
  )
}

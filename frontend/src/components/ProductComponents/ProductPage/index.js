import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import * as productActions from '../../../store/product';
import './ProductPage.css'
import ProductDetails from '../ProductDetails';
import ProductScroll from '../ProductScroll';

export default function ProductPage() {
    const { productId } = useParams();
    const products = useSelector(state => Object.values(state.products));
    const product = useSelector(state => (state.products))[productId];
    const productImages = product?.Images?.map(image => image?.url);
    const [mainImage, setMainImage] = useState(product?.Images[0]?.url);
    const [smallImageClass, setSmallImageClass] = useState('small-image')
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(productActions.getProduct(productId));
        // dispatch(productActions.getProducts());
        dispatch(productActions.getCategory(product?.categoryId));
    }, [dispatch, product?.name, product?.size, product?.price, product?.description]);

    const handleSmallImgClick = (image) => {
        setMainImage(image);
        // setSmallImageClass('small-clicked')
    }

    return (
    <>
    {product?.sold &&
        <h1 className="item-not-found">
            <div>This listing has sold</div>
            <div><i class="fa-regular fa-face-sad-cry" /></div>
        </h1>
    }
    <div className='product-page-container'>
        <div className='product-container'>
            <div className='product-container-left'>
                <img className='product-image' src={mainImage ? mainImage : product?.Images[0]?.url}></img>
                <div className='product-images-small'>
                    {productImages?.map(image => (
                        <img onClick={(e) => handleSmallImgClick(image)} className={smallImageClass} src={image}></img>
                        ))
                    }
                </div>
            </div>
            {product && <ProductDetails product={product}/>}
        </div>
        <div className='scroll-label'>You may also like</div>
        <div className='product-page-bottom'>
            <ProductScroll products={products}/>
        </div>
    </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
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
    // get similar products, excluding current product
    const similarProducts = products?.filter(prod => prod?.categoryId === product?.categoryId)
    const idx = similarProducts.indexOf(product);
    similarProducts.splice(idx, 1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getProduct(productId))
        // dispatch(productActions.getProducts());
        if (product?.id === +productId) {
            dispatch(productActions.getCategory(product?.categoryId));
        }
    }, [
        dispatch,
        productId,
        product?.name,
        product?.size,
        product?.price,
        product?.description,
        product?.categoryId,
        product?.id
        ]
    );

    const handleSmallImgClick = (image) => {
        setMainImage(image);
        // setSmallImageClass('small-clicked')
    }


    return (
    <>
    {product?.sold &&
        <h1 className="item-not-found">
            <div>This listing has sold</div>
            <div><i className="fa-regular fa-face-sad-cry" /></div>
        </h1>
    }
    <div className='product-page-container'>
        <div className='product-container'>
            <div className='product-container-left'>
                <img alt='current item' className='product-image' src={mainImage ? mainImage : product?.Images[0]?.url}></img>
                <div className='product-images-small'>
                    {productImages?.map((image, idx) => (
                        <img alt='other items' key={idx} onClick={(e) => handleSmallImgClick(image)} className={smallImageClass} src={image}></img>
                        ))
                    }
                </div>
            </div>
            {product && <ProductDetails product={product}/>}
        </div>
        {similarProducts?.length ? <div className='scroll-label'>You may also like</div> : <div></div>}
        <div className='product-page-bottom'>
            <ProductScroll products={similarProducts}/>
        </div>
    </div>
    </>
  )
}

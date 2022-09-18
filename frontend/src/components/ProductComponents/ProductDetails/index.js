import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { timeAgo } from '../../../utils/helpers';
import * as favActions from '../../../store/favorite';
import * as productActions from '../../../store/product';
import './ProductDetails.css'
import ProductButtons from '../ProductButtons';

export default function ProductDetails({product}) {
    const favorites = useSelector(state => Object.values(state.favorites));
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            dispatch(favActions.getProdFavs(product?.id))
        }
    }, [dispatch]);

  return (
    <div className='product-container-right'>
        <div className='product-name-and-favs'>
            <div className='product-name'>
                {product?.name}
            </div>
            <div className='product-favs'>
                <i className="fa-regular fa-heart product-favs"></i>
                <div className='favs-counter'>{favorites?.length}</div>
            </div>
        </div>
        <div className='product-size'>Size: {product?.size}</div>
        <div className='product-price'>${product?.price}</div>
        <ProductButtons product={product}/>
        <div className='product-description-container'>
            <div className='description-header'>Description</div>
            <div className='description-body'>{product?.description} dsffnsd sdjfns nsd fsdjn fsdnf sds njfs nfs jkfsdjkf nsdjfnsdfn sdfn sjk fsd njk</div>
        </div>
    </div>
  )
}

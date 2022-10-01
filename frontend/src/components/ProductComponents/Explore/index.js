import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as productActions from '../../../store/product';
import './Explore.css'
import { useHistory } from 'react-router-dom';
import ProductScroll from '../ProductScroll';

export default function Explore() {
    let products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getAvailProducts())

    }, [dispatch]);

    if (window.location.href.includes('tops')) {
        // filter products by category
        products = products?.filter(product => product?.categoryId === 1)
    } else if (window.location.href.includes('bottoms')) {
        products = products?.filter(product => product?.categoryId === 2)
    } else if (window.location.href.includes('shoes')) {
        products = products?.filter(product => product?.categoryId === 3)
    }

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
            <ProductScroll products={products}/>
        </div>
    </div>
  )

}

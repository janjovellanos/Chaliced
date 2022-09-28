import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeAgo } from '../../../utils/helpers';
import * as productActions from '../../../store/product';
import './Explore.css'
import { NavLink, useHistory } from 'react-router-dom';
import ProductScroll from '../ProductScroll';

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
            <ProductScroll products={products}/>
        </div>
    </div>
  )

}

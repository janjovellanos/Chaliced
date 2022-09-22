import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as favActions from '../../../store/favorite';
import * as productActions from '../../../store/product';
import DeleteButtonModal from './DeleteButton';
import './ProductButtons.css'

export default function ProductButtons({product, editing, setEditing, productEdits}) {
    const user = useSelector(state => state.session.user);
    const [editBtnText, setEditBtnText] = useState('EDIT LISTING')
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            dispatch(favActions.getProdFavs(product?.id));
        }
    }, [dispatch]);

    const handleEditBtn = async () => {
        if (!editing) {
            setEditing(true)
            setEditBtnText('UPDATE')
        }
        else {
            if (productEdits.name !== product.name ||
                productEdits.size !== product.size ||
                productEdits.price !== product.price ||
                productEdits.description !== product.description) {
                    await dispatch(productActions.editProduct(productEdits, product?.id))
                }
            setEditing(false)
            setEditBtnText('EDIT LISTING')
        }
    };


    let sellerBtns = (
        <>
            <div className='product-edit-btn'>
                <button onClick={() => handleEditBtn()}>{editBtnText} <i className="fa-solid fa-pencil"></i></button>
            </div>
            <div className='product-delete-btn'>
                <DeleteButtonModal product={product}/>
            </div>
        </>
    )

    let buyerBtns = (
        <>
            <div className='product-purchase-btn'>
                <button>PURCHASE</button>
            </div>
            <div className='product-favorite-btn'>
                <button>FAVORITE</button>
            </div>
        </>
    )

        return (<div className='product-buttons'>
            {user?.id === product?.userId ? sellerBtns : buyerBtns}
            <div className='product-seller-info'>
                <div className='seller-profile-pic'>
                    <NavLink to={`/users/${product?.userId}`}>
                        <img src='https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-11-512.png'></img>
                    </NavLink>
                </div>
                <div className='seller-stats'>
                    <NavLink to={`/users/${product?.userId}`} className='product-seller-name'>{product?.Seller?.username}</NavLink>
                    <div className='product-seller-rating'>***** {product?.Seller?.reviewCount} Reviews</div>
                    <NavLink to={`/users/${product?.userId}`} className='product-seller-listings'>{product?.Seller?.productCount} listing for sale</NavLink>
                </div>
            </div>
        </div>)
}

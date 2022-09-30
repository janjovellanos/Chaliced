import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import * as favActions from '../../../store/favorite';
import * as productActions from '../../../store/product';
import DeleteButtonModal from './DeleteButton';
import './ProductButtons.css'
import PurchaseButtonModal from './PurchaseButton';

export default function ProductButtons({product, editing, setEditing, productEdits, currUserLiked, faved, setFaved}) {
    const user = useSelector(state => state.session.user);
    const [editBtnText, setEditBtnText] = useState('EDIT LISTING')
    const dispatch = useDispatch();
    const history = useHistory();

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

    const handleFavButton = () => {
        if (!currUserLiked) {
            dispatch(favActions.addFav(product?.id))
            setFaved('fa-solid fa-heart product-favs')
        } else {
            dispatch(favActions.removeFav(product?.id))
            setFaved('fa-regular fa-heart product-favs')
        }
    }


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
               <PurchaseButtonModal product={product}/>
            </div>
            <div className='product-favorite-btn'>
                <button onClick={() => handleFavButton()} >FAVORITE</button>
            </div>
        </>
    )

    let soldBtns =
        <>
            <div className='product-sold-div'>
                <div onClick={() => history.push('/shop')}>FIND SIMILAR PRODUCTS</div>
            </div>
        </>

        return (<div className='product-buttons'>
            {product?.sold ? (soldBtns) : user?.id === product?.userId ? sellerBtns : buyerBtns}
            <div className='product-seller-info'>
                <div className='seller-profile-pic'>
                    <NavLink to={`/users/${product?.userId}`}>
                        <img src={product?.Seller?.profileImage}></img>
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

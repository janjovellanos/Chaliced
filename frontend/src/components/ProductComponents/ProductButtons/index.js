import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as favActions from '../../../store/favorite';
import * as productActions from '../../../store/product';
import './ProductButtons.css'

export default function ProductButtons({product}) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (product) {
            dispatch(favActions.getProdFavs(product?.id));
        }
    }, [dispatch]);

    const handleEditBtn = () => {
        setEditing(!editing)
    };


    let sellerBtns = (
        <>
            <div className='product-edit-btn'>
                <button onClick={() => handleEditBtn()}>EDIT LISTING <i className="fa-solid fa-pencil"></i></button>
            </div>
            <div className='product-delete-btn'>
                <button>DELETE LISTING <i className="fa-solid fa-trash-can"></i></button>
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

//    {editing ?
        return (<div className='product-buttons'>
            {user?.id === product?.userId ? sellerBtns : buyerBtns}
            <div className='product-seller-info'>
                <div className='seller-profile-pic'>
                    <NavLink to={`/users/${product?.userId}`}>
                        <img src='https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-11-512.png'></img>
                    </NavLink>
                    {/* {product?.Seller?.profileImage} */}
                </div>
                <div className='seller-stats'>
                    <NavLink to={`/users/${product?.userId}`} className='product-seller-name'>{product?.Seller?.username}</NavLink>
                    <div className='product-seller-rating'>***** {product?.Seller?.reviewCount} Reviews</div>
                    <NavLink to={`/users/${product?.userId}`} className='product-seller-listings'>{product?.Seller?.productCount} listing for sale</NavLink>
                </div>
            </div>
        </div>)
//    :
//         (<div className='product-buttons'>
//             {user?.id === product?.userId ? sellerBtns : buyerBtns}
//             <div className='product-seller-info'>
//                 <div className='seller-profile-pic'>
//                     <NavLink to={`/users/${product?.userId}`}>
//                         <img src='https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-11-512.png'></img>
//                     </NavLink>
//                     {/* {product?.Seller?.profileImage} */}
//                 </div>
//                 <div className='seller-stats'>
//                     <NavLink to={`/users/${product?.userId}`} className='product-seller-name'>{product?.Seller?.username}</NavLink>
//                     <div className='product-seller-rating'>***** {product?.Seller?.reviewCount} Reviews</div>
//                     <NavLink to={`/users/${product?.userId}`} className='product-seller-listings'>{product?.Seller?.productCount} listing for sale</NavLink>
//                 </div>
//             </div>
//         </div>)
//    }
}

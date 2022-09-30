import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as favActions from '../../../store/favorite';
import './ProductDetails.css'
import ProductButtons from '../ProductButtons';

export default function ProductDetails({product}) {
    const user = useSelector(state => state.session.user);
    const favorites = useSelector(state => Object.values(state.favorites));
    const favUserIds = favorites.map(fav => fav?.userId)
    const currUserLiked = favUserIds?.includes(user?.id);
    const [faved, setFaved] = useState(currUserLiked);
    const [name, setName] = useState(product?.name);
    const [size, setSize] = useState(product?.size);
    const [price, setPrice] = useState(product?.price);
    const [description, setDescription] = useState(product?.description);
    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch();

    const handleFavButton = () => {
        if (!currUserLiked) {
            dispatch(favActions.addFav(product?.id))
            setFaved(true)
        } else {
            dispatch(favActions.removeFav(product?.id))
            setFaved(false)
        }
    }

    useEffect(() => {
        if (product) {
            dispatch(favActions.getProdFavs(product?.id))
        }
    }, [dispatch, product, currUserLiked]);

    const productEdits = {name, size, price, description};

    let prodDetails = (
        <div className='product-container-right'>
        <div className='product-name-and-favs'>
            <div className='product-name'>
                {product?.name}
            </div>
            <div className='product-favs'>
                <i
                onClick={async () => await handleFavButton()}
                className={faved ? 'fa-solid fa-heart product-favs' : 'fa-regular fa-heart product-favs'}
                />
                <div className='favs-counter'>{favorites?.length}</div>
            </div>
        </div>
        <div className='product-size'>Size: {product?.size}</div>
        <div className='product-price'>${product?.price}</div>
        <ProductButtons product={product} editing={editing} setEditing={setEditing} productEdits={productEdits} currUserLiked={currUserLiked} faved={faved} setFaved={setFaved}/>
        <div className='product-description-container'>
            <div className='description-header'>Description</div>
            <div className='description-body'>{product?.description}</div>
        </div>
    </div>
    )


    let editDetails = (
        <div className='product-container-right'>
        <div className='product-name-and-favs'>
            <div className='product-name'>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            </div>
            <div className='product-favs'>
                <i className="fa-regular fa-heart product-favs"></i>
                <div className='favs-counter'>{favorites?.length}</div>
            </div>
        </div>
        <div className='product-size'>
            <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                />
        </div>
        <div className='product-price'>
            <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
        </div>
        <ProductButtons product={product} editing={editing} setEditing={setEditing} productEdits={productEdits}/>
        <div className='product-description-container'>
            <div className='description-header'>Description</div>
            <div className='description-body'>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
            </div>
        </div>
    </div>
    )

   return editing ? editDetails : prodDetails;
}

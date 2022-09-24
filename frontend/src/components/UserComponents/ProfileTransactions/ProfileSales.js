import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as sellerActions from '../../../store/seller';
import { getCreatedDate } from '../../../utils/helpers';

export default function ProfileSales({seller}) {
    const mySold = useSelector(state => Object.values(state.my.Sold));
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(sellerActions.getAllSellers());
    // }, [dispatch])

    // const soldProducts = seller?.Products?.filter(product => product?.sold === true);

    return (
        <div className='solds-list'>
            {mySold && mySold?.map(product => (
                <div key={product?.id} className='sold-container'>
                    <div className='sold-details'>
                        <div className='sold-details-top'>
                            <div>
                                <div className='top-detail-name'>Sold on</div>
                                <div className='top-detail'>{getCreatedDate(product?.updatedAt)}</div>
                            </div>
                            <div>
                                <div className='top-detail-name'>Buyer</div>
                                <div className='top-detail'>{product?.Order?.User?.username}</div>
                            </div>
                            <div>
                                <div className='top-detail-name'>Sale Price</div>
                                <div className='top-detail'>${product?.price}</div>
                            </div>
                        </div>
                        <div className='sold-details-bottom'>
                            <div className='sold-item-name'>
                                {product?.name}
                            </div>
                            <div className='sold-item-description'>
                                {product?.description}
                            </div>
                        </div>
                    </div>
                    <div className='sold-image'>
                        <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    </div>
                </div>
            ))}
        </div>
    )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as myActions from '../../../store/my';
import { getCreatedDate } from '../../../utils/helpers';

export default function ProfileSales() {
    const mySold = useSelector(state => Object.values(state.my.Sold));
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(myActions.getMyOrders());
        dispatch(myActions.getMySold());
    }, [dispatch])

    mySold?.sort((a, b) => {
        return b.id - a.id;
    })

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
                        <img className='preview-image' src={product?.Images[0]?.url}></img>
                    </div>
                </div>
            ))}
        </div>
    )
}

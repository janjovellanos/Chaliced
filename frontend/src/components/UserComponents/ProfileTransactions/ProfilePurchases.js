import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../../store/product';
import { getCreatedDate } from '../../../utils/helpers';

export default function ProfilePurchases({seller}) {
    const products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getProducts());
    }, [dispatch])

    const orderIds = seller.Orders.map(order => order.productId)
    const orderProducts = products.filter(product => orderIds.includes(product.id) )
    console.log(orderProducts);

    return (
        <div className='orders-list'>
            {orderProducts && orderProducts?.map(product => (
                <div key={product?.id} className='order-container'>
                    <div className='order-image'>
                        <img className='preview-image' src='https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533'></img>
                    </div>
                    <div className='order-details'>
                        <div className='order-details-top'>
                            <div>
                                <div className='top-detail-name'>Purchased</div>
                                <div className='top-detail'>{getCreatedDate(product?.updatedAt)}</div>
                            </div>
                            <div>
                                <div className='top-detail-name'>Sale Price</div>
                                <div className='top-detail'>${product?.price}</div>
                            </div>
                        </div>
                        <div className='order-details-bottom'>
                            <div className='order-item-name'>
                                {product?.name}
                            </div>
                            <div className='order-item-description'>
                                {product?.description}
                            </div>
                        </div>
                    </div>
                    <div className='order-leave-review'>
                        <button>LEAVE A REVIEW</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

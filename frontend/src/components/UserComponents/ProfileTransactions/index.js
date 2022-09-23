import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as sellerActions from '../../../store/seller';
import ProfilePurchases from './ProfilePurchases';
import ProfileSales from './ProfileSales';
import './ProfileTransactions.css'

export default function ProfileTransactions({sellerorders, seller}) {
    const { userId } = useParams();
    const [purchasesClicked, setPurchasesClicked] = useState('profile-purchases-clicked')
    const [salesClicked, setSalesClicked] = useState('')
    const [bottomView, setBottomView] = useState(<ProfilePurchases seller={seller}/>);
    const dispatch = useDispatch();

    const handlePurchasesClicked = () => {
        setPurchasesClicked('profile-purchases-clicked')
        setSalesClicked('')
        setBottomView(<ProfilePurchases seller={seller}/>)
        // setBottomView(<ProfileListings availProducts={availProducts} />)
    };

    const handleSalesClicked = () => {
        setSalesClicked('profile-sales-clicked')
        setPurchasesClicked('')
        setBottomView(<ProfileSales seller={seller} />)
    };

    useEffect(() => {
        dispatch(sellerActions.getUserDetails(userId))
    }, [dispatch]);

  return (
    <>
        <div className='transactions-options-container'>
                <div onClick={() => handlePurchasesClicked()} className={purchasesClicked}>PURCHASES</div>
                <div onClick={() => handleSalesClicked()} className={salesClicked}>SALES</div>
        </div>
        {bottomView}
    </>
  )
}

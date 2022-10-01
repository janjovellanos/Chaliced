import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as reviewActions from '../../../../store/review';
// import './ReviewForm.css'

export default function EditReviewForm({product, setShowModal}) {
    const user = useSelector(state => state.session.user);
    let filledStar = `fa-solid fa-star filled`
    let hollowStar = `fa-regular fa-star hollow`
    const [star2, setStar2] = useState("fa-regular fa-star hollow");
    const [star3, setStar3] = useState("fa-regular fa-star hollow");
    const [star4, setStar4] = useState("fa-regular fa-star hollow");
    const [star5, setStar5] = useState("fa-regular fa-star hollow");
    const [stars, setStars] = useState(1);
    const [body, setBody] = useState(product?.Review?.body);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleStarClick = (id) => {

      if (id === 'star1') {
        setStars(1)
        setStar2(hollowStar)
        setStar3(hollowStar)
        setStar4(hollowStar)
        setStar5(hollowStar)
      }
      else if (id === 'star2') {
        setStars(2)
        setStar2(filledStar)
        setStar3(hollowStar)
        setStar4(hollowStar)
        setStar5(hollowStar)
      }
      else if (id === 'star3') {
        setStars(3)
        setStar2(filledStar)
        setStar3(filledStar)
        setStar4(hollowStar)
        setStar5(hollowStar)
      }
      else if (id === 'star4') {
        setStars(4)
        setStar2(filledStar)
        setStar3(filledStar)
        setStar4(filledStar)
        setStar5(hollowStar)
      }
      else if (id === 'star5') {
        setStars(5)
        setStar2(filledStar)
        setStar3(filledStar)
        setStar4(filledStar)
        setStar5(filledStar)
      }
    }

  const handleEditReview = async () => {
    const review = {body, stars, id: product?.Review?.id}
    await dispatch(reviewActions.updateReview(review))
    setShowModal(false);
    // history.push(`/users/${user?.id}/transactions`)
    // alert(`Congratulations on your ${product?.name}!`)
  };

  {/* style={{ backgroundImage: `url(${product?.Image?.url})` }}> */}
  return (
    <div className='review-modal-container'>
        <div className='review-modal-header'
          style={{ backgroundImage: `url(https://cdn.shopify.com/s/files/1/0013/1111/3328/products/HTGWEATHEREDT-SHIRT_CREAM_BACK.jpg?v=1639536822&width=533)`}}>
          <div className='review-product-item'>{product?.name}</div>
          <div className='review-product-details'>{product?.size} / ${product?.price}</div>
          <div className='review-product-description'>{product?.description}</div>
        </div>
        <div className='review-modal-second'>
          <form className='rating-form'>
                <strong>How was your experience?</strong>
                <div className='star-container'>
                  <div
                    onClick={e => handleStarClick(e.target.id)}
                  ><i id='star1' className="fa-solid fa-star filled"></i></div>
                  <div
                    onClick={e => handleStarClick(e.target.id)}
                  ><i id='star2' className={star2}></i></div>
                  <div
                    onClick={e => handleStarClick(e.target.id)}
                  ><i id='star3' className={star3}></i></div>
                  <div
                    onClick={e => handleStarClick(e.target.id)}
                  ><i id='star4' className={star4}></i></div>
                  <div
                    onClick={e => handleStarClick(e.target.id)}
                  ><i id='star5' className={star5}></i></div>
                </div>
                <textarea
                  onChange={e => setBody(e.target.value)}
                  value={body}
                  className='review-body-textarea' required type='text'>
                </textarea>
          </form>
        </div>
        <div className='review-modal-options'>
            <div onClick={() => handleEditReview()} className='yes-review'>Submit</div>
            {/* <div onClick={() => setShowModal(false)} className='dont-purchase'>Cancel</div> */}
        </div>
    </div>
  )
}

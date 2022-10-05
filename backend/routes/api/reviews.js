const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Product, Review, Order } = require('../../db/models');

const router = express.Router();

//edit a review by a specified id
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { body, stars }  = req.body;
    // 469
    const { user } = req;

    const review = await Review.findByPk(reviewId)

    if (review) {
        if (review.buyerId === user.id) {
            review.update({ body, stars });
            res.json(review)
        } else {
            const err = new Error('Not Authorized');
            err.status = 403;
            err.title = 'Not Authorized';
            return next(err);
        }
    } else {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.title = "Review couldn't be found";
        return next(err);
    }
})

//delete specified review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { user } = req;

    const review = await Review.findByPk(reviewId);

    if (review) {
        if (review.buyerId === user.id) {
            await review.destroy();
            res.json({
                message: 'Successfully deleted',
                statusCode: 200
            })
        } else {
            const err = new Error('Not Authorized');
            err.status = 403;
            err.title = 'Not Authorized';
            return next(err);
        }
    } else {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.title = "Review couldn't be found";
        return next(err);
    }
})


//get details of a review from review id
router.get('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId, {
        include: [
            {
                model: Product, attributes: ['id', 'name', 'size', 'price']
            }
        ]
    })
    if (review) {
        res.json(review)
    } else {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        err.title = "Review couldn't be found";
        return next(err);
    }
})

//create a review for a product you've bought
router.post('/', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { body, stars, productId } = req.body;

    const product = await Product.findByPk(productId, {
        include: [
            { model: Order, attributes: ['id', 'userId', 'productId'] },
            { model: Review }
        ]
    });
    //check if product was sold to the current user
    if (product.sold && product.Order.userId === user.id) {
        //check if you've already reviewed the product
        if (!product.Review) {
            const newReview = await Review.create({
                buyerId: user.id,
                sellerId: product.userId,
                productId: +productId,
                body,
                stars
            })
            res.status(201);
            res.json(newReview);
        } else {
            const err = new Error("You've already reviewed this item");
            err.status = 409;
            err.title = "You've already reviewed this item";
            return next(err);
        }
    } else {
        const err = new Error("Reviews can only be left on products you've purchased");
        err.status = 400;
        err.title = "Reviews can only be left on products you've purchased";
        return next(err);
    }
})


//get all reviews
router.get('/', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [
            {
                model: Product, attributes: ['id', 'name', 'size', 'price']
                // include: [{ model: Image, attributes: ['id', 'url'] }]
            }
        ]
    });
        res.json({reviews})
});


module.exports = router;

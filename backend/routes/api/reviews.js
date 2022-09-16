const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Product, Image, Favorite, Review, Order } = require('../../db/models');

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

//get all favorites of specified product
// router.get('/:productId/favorites', async (req, res, next) => {
//     const { productId } = req.params;

//     const product = await Product.findByPk(productId, {
//         include: [
//             {
//                 model: Favorite,
//                 include: [{ model: User, attributes: ['id', 'username', 'profileImage'] }]
//             }
//         ]
//     });
//     if (product) {
//         const favorites = product.Favorites;
//         res.json({ Favorites: favorites })
//     } else {
        // const err = new Error("Product couldn't be found");
        // err.status = 404;
        // err.title = "Product couldn't be found";
        // return next(err);
//     }
// });

//create a favorite on specified product
// router.post('/:productId/favorites', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const { user } = req;

//     const product = await Product.findByPk(productId, {
//         include: [
//             {
//                 model: Favorite, attributes: ['userId']
//             }
//         ]
//     });

//     if (product) {
//         const favorites = product.dataValues.Favorites
//         // check to see if the current user has already favorited
//         const userFavorited = favorites.some(fav => fav.dataValues.userId === user.id)
//         if (userFavorited) {
//             const err = new Error("Cannot favorite again");
//             err.status = 409;
//             err.title = "Cannot favorite again";
//             return next(err)
//         } else {
//             const newFavorite = await Favorite.create({
//                 userId: user.id,
//                 productId: +productId
//             });
//                 res.json(newFavorite);
//         }
//     } else {
//         const err = new Error("Product couldn't be found");
//         err.status = 404;
//         err.title = "Product couldn't be found";
//         return next(err);
//     }
// });

//delete a favorite on specified product
// router.delete('/:productId/favorites', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const { user } = req;

//     const favorite = await Favorite.findOne({
//         where: {
//             productId: productId,
//             userId: user.id
//         }
//     });

//     if (favorite) {
//         await favorite.destroy();
//             res.json({
//                 message: 'Successfully deleted',
//                 statusCode: 200
//             })
//     } else {
//         const err = new Error("Favorite couldn't be found");
//         err.status = 404;
//         err.title = "Favorite couldn't be found";
//         return next(err);
//     }
// });

//get specified product's images
// router.get('/:productId/images', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const product = await Product.findByPk(productId, {
//         include: Image
//     });

//     if (product) {
//         const images = product.Images
//         res.json(images);
//     } else {
//         const err = new Error("Product couldn't be found");
//         err.status = 404;
//         err.title = "Product couldn't be found";
//         return next(err);
//     }
// });

//create/upload an image to a product
// router.post('/:productId/images', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const { user } = req;
//     let { url } = req.body;

//     const product = await Product.findByPk(productId)

//     if (product) {
//         if (product.userId === user.id) {
            // const newImage = await Image.create({
            //     url,
            //     userId: user.id,
            //     productId: +productId
            // })
            // res.status(201);
            // res.json(newImage);
//         } else {
//             const err = new Error('Not Authorized');
//             err.status = 403;
//             err.title = 'Not Authorized';
//             return next(err);
//         }
//     } else {
//         const err = new Error("Product couldn't be found");
//         err.status = 404;
//         err.title = "Product couldn't be found";
//         return next(err);
//     }
// });

//delete an image of a product by image id
// router.delete('/images/:imageId', requireAuth, async (req, res, next) => {
//     const { imageId } = req.params;
//     const { user } = req;

//     const image = await Image.findByPk(imageId);

//     if (image) {
//         if (image.userId === user.id) {
//             await image.destroy();
//             res.json({
//                 message: 'Successfully deleted',
//                 statusCode: 200
//             })
//         } else {
//             const err = new Error('Not Authorized');
//             err.status = 403;
//             err.title = 'Not Authorized';
//             return next(err);
//         }
//     } else {
//         const err = new Error("Image couldn't be found");
//         err.status = 404;
//         err.title = "Image couldn't be found";
//         return next(err);
//     }
// });

//get specified product
// router.get('/:productId', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const product = await Product.findByPk(productId, {
//         include: [
//             { model: Image, attributes: ['id', 'url'] },
//             { model: User, as: 'Seller', attributes: ['id', 'username', 'profileImage'] }
//         ]
//     });

//     if (product) {
//         res.json(product);
//     } else {
//         const err = new Error("Product couldn't be found");
//         err.status = 404;
//         err.title = "Product couldn't be found";
//         return next(err);
//     }
// });

//edit product
// router.put('/:productId', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const { user } = req;
//     let { name, description, size, price, categoryId } = req.body;

//     const product = await Product.findByPk(productId);

//     if (product) {
//         if (product.userId === user.id) {
//             product.update({ name, description, size, price, categoryId });
//             res.json(product)
//         } else {
//             const err = new Error('Not Authorized');
//             err.status = 403;
//             err.title = 'Not Authorized';
//             return next(err);
//         }
//     } else {
//         const err = new Error("Product couldn't be found");
//         err.status = 404;
//         err.title = "Product couldn't be found";
//         return next(err);
//     }
// });

//delete specified product
// router.delete('/:productId', requireAuth, async (req, res, next) => {
//     const { productId } = req.params;
//     const { user } = req;

//     const product = await Product.findByPk(productId);

//     if (product) {
//         if (product.userId === user.id) {
//             await product.destroy();
//             res.json({
//                 message: 'Successfully deleted',
//                 statusCode: 200
//             })
//         } else {
//             const err = new Error('Not Authorized');
//             err.status = 403;
//             err.title = 'Not Authorized';
//             return next(err);
//         }
//     } else {
//         const err = new Error("Product couldn't be found");
//         err.status = 404;
//         err.title = "Product couldn't be found";
//         return next(err);
//     }
// })

//create/list a product
// router.post('/', requireAuth, async (req, res, next) => {
//     const { user } = req;
//     let { name, description, size, price, categoryId } = req.body;

//     const newProduct = await Product.create({
//         userId: user.id,
//         name,
//         description,
//         size,
//         price,
//         categoryId
//     })
//     res.status(201);
//     res.json(newProduct);
// });

module.exports = router;

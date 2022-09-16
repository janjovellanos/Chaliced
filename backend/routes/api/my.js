const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Product, Image, Favorite, Review, Order, User } = require('../../db/models');
const product = require('../../db/models/product');

const router = express.Router();

//edit current user profile
router.put('/profile', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { username, firstName, lastName, email, address, bio, profileImage } = req.body;

    await user.update({
            username,
            firstName,
            lastName,
            email,
            address,
            bio,
            profileImage
    })
    res.json(user)
})

//get current user profile
router.get('/profile', requireAuth, async (req, res, next) => {
    const { user } = req;
    res.json(user);
});

//get products being sold by the current user
router.get('/products', requireAuth, async (req, res, next) => {
    const { user } = req;

    const products = await Product.findAll({
        where : { userId: user.id },
        include : [
            {
                model: Image, attributes: ['id', 'url', 'userId', 'productId']
            }
        ]
    })
    // SHOULD ADD CONDITION IF NO PRODUCTS??????? < -----------------------------
    res.json(products);
})

//get all review of the current user
router.get('/reviews', requireAuth, async (req, res, next) => {
    const { user } = req;

    const reviews = await Review.findAll({
        where: { sellerId: user.id },
        include: [
            {
                model: Product, attributes: ['id', 'name', 'size', 'price']
            }
        ]
    });
    res.json(reviews)
});

//get all products the current user has favorited
router.get('/favorites', requireAuth, async (req, res, next) => {
    const { user } = req;

    const favorites = await Favorite.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Product, attributes: ['id', 'name', 'size', 'price']
            }
        ]
    });
    res.json(favorites)
});

//create an order for a product logged in as current user
router.post('/orders/:productId', requireAuth, async (req, res, next) => {
    const { productId } = req.params;
    const { user } = req;

    const product = await Product.findByPk(productId);

    if (product && !product.sold) {
        if (product.userId !== user.id) {
            // create order
            const newOrder = await Order.create({ userId: user.id, productId: +productId })
            // update product to sold
            product.update({sold: true})
            res.json(newOrder)
        } else {
            const err = new Error("This is your own product");
            err.status = 409;
            err.title = "This is your own product";
            return next(err)
        }
    } else {
        const err = new Error("Product is sold or couldn't be found");
        err.status = 404;
        err.title = "Product is sold or couldn't be found";
        return next(err)
    }
});

//get all products the current user has ordered
router.get('/orders', requireAuth, async (req, res, next) => {
    const { user } = req;

    const orders = await Order.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Product, attributes: ['id', 'name', 'size', 'price']
            }
        ]
    });
    res.json(orders)
});

//get all products the current user has sold
router.get('/sold', requireAuth, async (req, res, next) => {
    const { user } = req;

    const sold = await Product.findAll({
        where: { userId: user.id, sold: true },
        include: [
            {
                model: Order, attributes: ['id', 'userId', 'productId'],
                include: {model: User}
            }
        ]
    });

    res.json(sold)
});

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
            // const err = new Error("Cannot favorite again");
            // err.status = 409;
            // err.title = "Cannot favorite again";
            // return next(err)
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
//             const newImage = await Image.create({
//                 url,
//                 userId: user.id,
//                 productId: +productId
//             })
//             res.status(201);
//             res.json(newImage);
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

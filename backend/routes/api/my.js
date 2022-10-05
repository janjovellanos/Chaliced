const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Product, Image, Favorite, Review, Order, User } = require('../../db/models');

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
router.get('/profile', restoreUser, async (req, res, next) => {
    const { user } = req;

    if (user) res.json(user);
    else res.json({})
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
    res.json(products);
})

//get all review of the current user
router.get('/reviews', requireAuth, async (req, res, next) => {
    const { user } = req;

    const reviews = await Review.findAll({
        where: { sellerId: user.id },
        include: [
            {
                model: Product, attributes: ['id', 'name', 'size', 'price'],
                include: [
                    {
                        model: User, as: 'Seller',
                        attributes: ['id', 'username', 'profileImage']
                    }
                ]
            },
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
                model: Product, attributes: ['id', 'name', 'size', 'price', 'sold', 'createdAt'],
                include: [
                    {
                        model: Image,
                        attributes: ['id', 'url']
                    }
                ]
            }
        ]
    });
    res.json(favorites)
});

//create an order for a product logged in as current user
router.post('/orders', requireAuth, async (req, res, next) => {
    const { productId } = req.body;
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
                model: Product, attributes: ['id', 'name', 'size', 'price', 'description'],
                include: [
                    {model: User, as: 'Seller'},
                    {model: Image, attributes: ['id', 'url']},
                    {model: Review, attributes: ['id', 'stars', 'body']}
                ]
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
            },
            {
                model: Image, attributes: ['url']
            }
        ]
    });

    res.json(sold)
});

module.exports = router;
